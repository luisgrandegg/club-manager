import { NextRequest, NextResponse } from "next/server";
import { getBaseUrl } from "@/lib/app-url";
import { commitSession, SessionPayload } from "@/lib/session";

type TokenResponse = {
  id_token?: string;
  expires_in?: number;
};

type GoogleProfile = {
  email: string;
  name?: string;
  picture?: string;
  exp?: string;
  sub: string;
};

async function exchangeCodeForTokens(
  code: string,
  redirectUri: string,
): Promise<TokenResponse> {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Google OAuth environment variables are missing");
  }

  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }),
  });

  if (!tokenResponse.ok) {
    const error = await tokenResponse.text();
    throw new Error(`Failed to exchange code for tokens: ${error}`);
  }

  return tokenResponse.json();
}

async function fetchGoogleProfile(idToken: string): Promise<GoogleProfile> {
  const profileResponse = await fetch(
    `https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`,
  );

  if (!profileResponse.ok) {
    const error = await profileResponse.text();
    throw new Error(`Unable to verify id_token: ${error}`);
  }

  return profileResponse.json();
}

function buildSession(profile: GoogleProfile): SessionPayload {
  const expiresAt = profile.exp ? Number(profile.exp) * 1000 : Date.now();

  return {
    name: profile.name ?? "Google User",
    email: profile.email,
    picture: profile.picture,
    expiresAt,
  };
}

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const baseUrl = getBaseUrl(request.nextUrl.origin);
  const redirectUri = `${baseUrl}/api/auth/google/callback`;

  if (!code) {
    return NextResponse.redirect(new URL("/?error=missing_code", request.url));
  }

  try {
    const tokens = await exchangeCodeForTokens(code, redirectUri);
    if (!tokens.id_token) {
      throw new Error("Google did not return an id_token");
    }

    const profile = await fetchGoogleProfile(tokens.id_token);
    const session = buildSession(profile);

    const response = NextResponse.redirect(new URL("/", request.url));
    commitSession(response, session);
    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(new URL("/?error=auth_failed", request.url));
  }
}

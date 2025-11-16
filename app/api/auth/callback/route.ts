import { NextRequest, NextResponse } from "next/server";
import { defaultLocale } from "@/app/i18n";
import {
  clearSessionCookie,
  clearStateCookie,
  createSessionToken,
  getBaseUrl,
  readStateCookie,
  setSessionCookie,
} from "@/lib/auth/session";

async function exchangeCodeForTokens(code: string, redirectUri: string) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Google OAuth credentials are not set");
  }

  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }),
  });

  if (!tokenResponse.ok) {
    throw new Error(`Failed to exchange code: ${tokenResponse.statusText}`);
  }

  return tokenResponse.json() as Promise<{ access_token: string }>;
}

async function fetchProfile(accessToken: string) {
  const profileResponse = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!profileResponse.ok) {
    throw new Error(`Failed to fetch profile: ${profileResponse.statusText}`);
  }

  return profileResponse.json() as Promise<{
    sub: string;
    name?: string;
    email?: string;
    picture?: string;
  }>;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const storedState = readStateCookie();
  const baseUrl = getBaseUrl();
  const redirectPath = storedState?.redirectTo ?? `/${defaultLocale}`;
  const redirectTarget = `${baseUrl}${redirectPath}`;

  if (!code || !state || !storedState || storedState.state !== state) {
    return NextResponse.redirect(`${redirectTarget}?authError=state`);
  }

  try {
    const { access_token: accessToken } = await exchangeCodeForTokens(code, `${baseUrl}/api/auth/callback`);
    const profile = await fetchProfile(accessToken);
    const sessionToken = createSessionToken({
      id: profile.sub,
      name: profile.name,
      email: profile.email,
      picture: profile.picture,
    });

    const response = NextResponse.redirect(redirectTarget);
    setSessionCookie(response, sessionToken);
    clearStateCookie(response);
    return response;
  } catch (error) {
    console.error("Authentication callback error", error);
    const response = NextResponse.redirect(`${redirectTarget}?authError=callback`);
    clearSessionCookie(response);
    clearStateCookie(response);
    return response;
  }
}

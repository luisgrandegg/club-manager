import { NextRequest, NextResponse } from "next/server";
import {
  clearSessionCookie,
  clearStateCookie,
  createSessionToken,
  getBaseUrl,
  readStateCookie,
  setSessionCookie,
} from "@/lib/auth/session";
import { DEFAULT_SIGN_UP_ROLE } from "@/lib/auth/roles";
import { upsertSupabaseUser } from "@/lib/supabase/admin";
import { SessionUser } from "@/lib/auth/SessionUser";

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
  const storedState = await readStateCookie();
  const baseUrl = getBaseUrl();
  const redirectPath = storedState?.redirectTo ?? `/`;
  const redirectTarget = `${baseUrl}${redirectPath}`;

  if (!code || !state || !storedState || storedState.state !== state) {
    return NextResponse.redirect(`${redirectTarget}?authError=state`);
  }

  try {
    const { access_token: accessToken } = await exchangeCodeForTokens(code, `${baseUrl}/api/auth/callback`);
    const profile = await fetchProfile(accessToken);
    const sessionUser: SessionUser = {
      id: profile.sub,
      role: DEFAULT_SIGN_UP_ROLE,
      name: profile.name ?? null,
      email: profile.email ?? null,
      picture: profile.picture ?? null,
    };

    await upsertSupabaseUser(sessionUser);

    const sessionToken = createSessionToken(sessionUser);

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

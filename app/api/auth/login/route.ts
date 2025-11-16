import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { defaultLocale } from "@/app/i18n";
import { getBaseUrl, setStateCookie } from "@/lib/auth/session";

function sanitizeRedirectPath(path: string | null) {
  if (!path || !path.startsWith("/")) return `/`;
  return path;
}

export async function GET(request: Request) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const authSecret = process.env.AUTH_SECRET;

  if (!clientId || !clientSecret || !authSecret) {
    return NextResponse.json(
      { message: "Authentication is not configured. Please add Google credentials and AUTH_SECRET." },
      { status: 500 },
    );
  }

  const randomState = crypto.randomUUID();
  const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  const baseUrl = getBaseUrl();
  const returnTo = sanitizeRedirectPath(new URL(request.url).searchParams.get("from"));

  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", `${baseUrl}/api/auth/callback`);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "openid email profile");
  url.searchParams.set("access_type", "offline");
  url.searchParams.set("prompt", "consent");
  url.searchParams.set("state", randomState);

  const response = NextResponse.redirect(url.toString());
  setStateCookie(response, { state: randomState, redirectTo: returnTo });

  return response;
}

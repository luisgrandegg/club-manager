import type { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "node:crypto";

export type SessionUser = {
  id: string;
  name?: string | null;
  email?: string | null;
  picture?: string | null;
};

const SESSION_COOKIE_NAME = "cm_session";
const STATE_COOKIE_NAME = "cm_oauth_state";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days

const encoder = new TextEncoder();

function getAuthSecret() {
  return process.env.AUTH_SECRET;
}

function isProduction() {
  return process.env.NODE_ENV === "production";
}

function base64urlEncode(data: string | Buffer) {
  return Buffer.from(data).toString("base64url");
}

function base64urlDecode(encoded: string) {
  return Buffer.from(encoded, "base64url").toString();
}

function signPayload(payload: string) {
  const secret = getAuthSecret();
  if (!secret) return null;

  return crypto.createHmac("sha256", encoder.encode(secret)).update(payload).digest("base64url");
}

export function createSessionToken(user: SessionUser) {
  const signatureSeed = base64urlEncode(
    JSON.stringify({
      sub: user.id,
      name: user.name,
      email: user.email,
      picture: user.picture,
      exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SECONDS,
    }),
  );

  const signature = signPayload(signatureSeed);
  if (!signature) {
    throw new Error("Missing AUTH_SECRET for signing session tokens.");
  }

  return `${signatureSeed}.${signature}`;
}

export function readSessionFromCookies(): SessionUser | null {
  const token = cookies().get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;

  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) return null;

  const expectedSignature = signPayload(encodedPayload);
  if (!expectedSignature || signature.length !== expectedSignature.length) {
    return null;
  }

  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
    return null;
  }

  try {
    const payload = JSON.parse(base64urlDecode(encodedPayload)) as {
      sub?: string;
      name?: string | null;
      email?: string | null;
      picture?: string | null;
      exp?: number;
    };

    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    if (!payload.sub) return null;

    return {
      id: payload.sub,
      name: payload.name,
      email: payload.email,
      picture: payload.picture,
    };
  } catch (error) {
    console.error("Failed to read session", error);
    return null;
  }
}

export function setSessionCookie(response: NextResponse, token: string) {
  response.cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: isProduction(),
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export function clearSessionCookie(response: NextResponse) {
  response.cookies.delete(SESSION_COOKIE_NAME, { path: "/" });
}

export function setStateCookie(response: NextResponse, value: { state: string; redirectTo: string }) {
  response.cookies.set(
    STATE_COOKIE_NAME,
    base64urlEncode(JSON.stringify(value)),
    {
      httpOnly: true,
      sameSite: "lax",
      secure: isProduction(),
      path: "/",
      maxAge: 600,
    },
  );
}

export function readStateCookie() {
  const cookie = cookies().get(STATE_COOKIE_NAME)?.value;
  if (!cookie) return null;

  try {
    return JSON.parse(base64urlDecode(cookie)) as { state: string; redirectTo: string };
  } catch (error) {
    console.error("Failed to parse OAuth state cookie", error);
    return null;
  }
}

export function clearStateCookie(response: NextResponse) {
  response.cookies.delete(STATE_COOKIE_NAME, { path: "/" });
}

export function getBaseUrl() {
  if (process.env.AUTH_BASE_URL) return process.env.AUTH_BASE_URL;
  if (process.env.NEXTAUTH_URL) return process.env.NEXTAUTH_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

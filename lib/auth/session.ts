import type { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "node:crypto";
import { SessionUser } from "./SessionUser";
import {
  SESSION_COOKIE_NAME,
  STATE_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
} from "./constants";
import { isValidRole } from "./roles";

const encoder = new TextEncoder();

function getAuthSecret() {
  return process.env.AUTH_SECRET;
}

function isProduction() {
  return process.env.NODE_ENV === "production";
}

export function base64urlEncode(data: string | Buffer) {
  return Buffer.from(data).toString("base64url");
}

export function base64urlDecode(encoded: string) {
  return Buffer.from(encoded, "base64url").toString();
}

export function signPayload(payload: string) {
  const secret = getAuthSecret();
  if (!secret) return null;

  return crypto.createHmac("sha256", encoder.encode(secret)).update(payload).digest("base64url");
}

export function createSessionToken(user: SessionUser) {
  const signatureSeed = base64urlEncode(
    JSON.stringify({
      sub: user.id,
      role: user.role,
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

export function parseSessionToken(token: string) {
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
      role?: string;
      name?: string | null;
      email?: string | null;
      picture?: string | null;
      exp?: number;
    };

    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    if (!payload.sub || !payload.role || !isValidRole(payload.role)) return null;

    return {
      user: {
        id: payload.sub,
        role: payload.role,
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
      } satisfies SessionUser,
      encodedPayload,
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
  response.cookies.delete(SESSION_COOKIE_NAME);
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

export async function readStateCookie() {
  const cookieHandler = await cookies();
  const cookie = cookieHandler.get(STATE_COOKIE_NAME)?.value;
  if (!cookie) return null;

  try {
    return JSON.parse(base64urlDecode(cookie)) as { state: string; redirectTo: string };
  } catch (error) {
    console.error("Failed to parse OAuth state cookie", error);
    return null;
  }
}

export function clearStateCookie(response: NextResponse) {
  response.cookies.delete(STATE_COOKIE_NAME);
}

export function getBaseUrl() {
  if (process.env.AUTH_BASE_URL) return process.env.AUTH_BASE_URL;
  if (process.env.NEXTAUTH_URL) return process.env.NEXTAUTH_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "node:crypto";

export type SessionPayload = {
  name: string;
  email: string;
  picture?: string;
  expiresAt: number;
};

const COOKIE_NAME = "session";

function getSecret(): string | null {
  return process.env.AUTH_COOKIE_SECRET ?? null;
}

function sign(data: string, secret: string): string {
  const hmac = createHmac("sha256", secret);
  hmac.update(data);
  return hmac.digest("hex");
}

function serializeSession(payload: SessionPayload, secret: string): string {
  const data = JSON.stringify(payload);
  const signature = sign(data, secret);
  const encodedPayload = Buffer.from(data).toString("base64url");
  return `${encodedPayload}.${signature}`;
}

function parseSession(value: string, secret: string): SessionPayload | null {
  const [encodedPayload, signature] = value.split(".");
  if (!encodedPayload || !signature) {
    return null;
  }

  const payloadBuffer = Buffer.from(encodedPayload, "base64url");
  const payload = payloadBuffer.toString("utf8");
  const expectedSignature = sign(payload, secret);

  const safeSignature = Buffer.from(signature);
  const safeExpectedSignature = Buffer.from(expectedSignature);

  if (safeSignature.length !== safeExpectedSignature.length) {
    return null;
  }

  if (!timingSafeEqual(safeSignature, safeExpectedSignature)) {
    return null;
  }

  const session = JSON.parse(payload) as SessionPayload;
  if (session.expiresAt && session.expiresAt <= Date.now()) {
    return null;
  }

  return session;
}

export function getSessionFromCookies(): SessionPayload | null {
  const secret = getSecret();
  if (!secret) {
    return null;
  }

  const sessionCookie = cookies().get(COOKIE_NAME);
  if (!sessionCookie) {
    return null;
  }

  try {
    return parseSession(sessionCookie.value, secret);
  } catch (error) {
    console.error("Unable to parse session cookie", error);
    return null;
  }
}

export function commitSession(
  response: NextResponse,
  session: SessionPayload,
): void {
  const secret = getSecret();
  if (!secret) {
    throw new Error("AUTH_COOKIE_SECRET is not configured");
  }

  const encoded = serializeSession(session, secret);
  response.cookies.set(COOKIE_NAME, encoded, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(session.expiresAt),
  });
}

export function clearSession(response: NextResponse): void {
  response.cookies.set(COOKIE_NAME, "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
  });
}

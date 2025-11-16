import { use } from "react";
import { cookies } from "next/headers";
import crypto from "node:crypto";
import { SessionUser } from "../SessionUser";
import { SESSION_COOKIE_NAME } from '../constants';
import { base64urlDecode, signPayload } from "../session";

async function readSessionFromCookies(): Promise<SessionUser | null> {
  const cookieHandler = await cookies();
  const token = cookieHandler.get(SESSION_COOKIE_NAME)?.value;
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

export function useSession() {
    return use(readSessionFromCookies())
}
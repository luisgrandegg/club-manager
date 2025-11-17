import { use } from "react";
import { cookies } from "next/headers";
import { SessionUser } from "../SessionUser";
import { SESSION_COOKIE_NAME } from "../constants";
import { parseSessionToken } from "../session";

async function readSessionFromCookies(): Promise<SessionUser | null> {
  const cookieHandler = await cookies();
  const token = cookieHandler.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;

  const parsedSession = parseSessionToken(token);
  if (!parsedSession) return null;

  return parsedSession.user;
}

export function useSession() {
  return use(readSessionFromCookies());
}

import { NextResponse } from "next/server";
import { defaultLocale } from "@/app/i18n";
import { clearSessionCookie } from "@/lib/auth/session";

export async function POST() {
  const response = NextResponse.redirect(`/${defaultLocale}`);
  clearSessionCookie(response);
  return response;
}

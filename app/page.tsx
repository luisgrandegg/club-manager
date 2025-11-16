import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";

import { getHomeMessages } from "@/lib/i18n/home";
import { resolveRequestLocale } from "@/lib/i18n/request";
import { getSessionFromCookies } from "@/lib/session";

export default function Home() {
  const session = getSessionFromCookies();
  const locale = resolveRequestLocale(headers());
  const t = getHomeMessages(locale);

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 via-white to-zinc-100 text-zinc-900 dark:from-black dark:via-zinc-950 dark:to-black">
      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-24 pt-14 sm:px-10 lg:px-14">
        <header className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-zinc-200/80 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-zinc-800/80 dark:bg-zinc-950/70">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 text-lg font-semibold text-white dark:bg-white dark:text-black">
              {t.brand.name.slice(0, 2)}
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400">
                {t.brand.title}
              </p>
              <h1 className="text-xl font-semibold text-zinc-950 dark:text-white">
                {t.brand.subtitle}
              </h1>
            </div>
          </div>
          {session ? (
            <form action="/api/auth/signout" method="post">
              <button className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-800 transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-700 dark:hover:bg-zinc-800">
                {t.hero.secondaryCta}
              </button>
            </form>
          ) : (
            <Link
              href="/api/auth/google"
              className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              {t.hero.primaryCta}
            </Link>
          )}
        </header>

        <section className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          <div className="flex flex-col gap-6 rounded-3xl border border-zinc-200/80 bg-white/80 p-8 shadow-sm backdrop-blur dark:border-zinc-800/80 dark:bg-zinc-950/70">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-300">
                {t.brand.name}
              </p>
              <h2 className="text-3xl font-semibold leading-tight text-zinc-950 dark:text-white">
                {t.hero.headline}
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-300">
                {t.hero.description}
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{t.hero.note}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {t.callouts.map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col gap-2 rounded-2xl border border-zinc-200/70 bg-zinc-50/80 p-4 dark:border-zinc-800/60 dark:bg-zinc-900/50"
                >
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{item.title}</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/70 p-4 text-sm text-emerald-800 dark:border-emerald-900/70 dark:bg-emerald-950/50 dark:text-emerald-100">
              <p className="font-semibold">
                {session ? t.session.signedInLabel : t.session.signedOutLabel}
              </p>
              <p className="mt-1 text-emerald-700 dark:text-emerald-200">
                {session?.email ?? t.session.missingSession}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-3xl border border-zinc-200/80 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-zinc-800/80 dark:bg-zinc-950/70">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">{t.session.title}</p>

            <div className="flex flex-col items-center gap-4 rounded-2xl border border-zinc-200/70 bg-zinc-50/80 p-6 text-center dark:border-zinc-800/60 dark:bg-zinc-900/40">
              <div className="relative h-20 w-20 overflow-hidden rounded-full bg-white shadow-inner dark:bg-zinc-800">
                {session?.picture ? (
                  <Image
                    src={session.picture}
                    alt={session.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-zinc-200 to-zinc-100 text-2xl font-semibold text-zinc-600 dark:from-zinc-700 dark:to-zinc-800 dark:text-zinc-100">
                    {session?.name ? session.name.charAt(0).toUpperCase() : "?"}
                    <span className="sr-only">{t.session.profileFallback}</span>
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <p className="text-lg font-semibold text-zinc-950 dark:text-white">
                  {session?.name ?? t.session.signedOutLabel}
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-300">
                  {session?.email ?? t.session.missingSession}
                </p>
              </div>

              <p className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-200">
                {session ? t.session.signedInLabel : t.session.signedOutLabel}
              </p>
            </div>

            <div className="grid gap-3">
              {t.tips.map((tip) => (
                <div
                  key={tip.title}
                  className="rounded-xl border border-zinc-200/60 bg-white/70 p-4 text-left dark:border-zinc-800/60 dark:bg-zinc-900/40"
                >
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{tip.title}</p>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">{tip.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

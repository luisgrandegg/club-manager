import Image from "next/image";
import { defaultLocale } from "./i18n";
import { use } from "react";
import { translations } from "./translations";
import { useSession } from "@/lib/auth/hooks/useSession";

export const metadata = {
  title: translations[defaultLocale].metaTitle,
  description: translations[defaultLocale].metaDescription,
};

export default function Home({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const locale = defaultLocale;
  const t = translations[locale];
  const session = useSession();
  const searchParamsHandler = use((async () => searchParams)())
  const errorKey = typeof searchParamsHandler?.authError === "string" ? searchParamsHandler.authError : undefined;
  const authErrorMessage =
    errorKey === "state"
      ? t.auth.errors.state
      : errorKey === "callback"
        ? t.auth.errors.callback
        : errorKey
          ? t.auth.errors.generic
          : null;
  const signedInName = session?.name ?? session?.email ?? t.auth.unknownUser;

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-purple-50 text-slate-900">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 text-lg font-bold text-white shadow-lg shadow-indigo-200">
            CM
          </div>
          <div>
            <p className="text-xl font-semibold">Club Manager Kids</p>
            <p className="text-sm text-slate-600">Built for football & basketball academies</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-3 text-sm font-medium sm:flex-row sm:items-center sm:gap-4">
          <nav className="hidden gap-3 sm:flex">
            <a className="rounded-full bg-white px-4 py-2 text-slate-700 shadow-sm shadow-slate-200 transition hover:-translate-y-0.5 hover:shadow-lg" href="#pricing">
              {t.nav.pricing}
            </a>
            <a className="rounded-full bg-slate-900 px-4 py-2 text-white shadow-sm shadow-indigo-200 transition hover:-translate-y-0.5 hover:shadow-lg" href="#start">
              {t.nav.start}
            </a>
          </nav>
          <div className="flex flex-col items-end gap-2 sm:flex-row sm:items-center sm:gap-3">
            {session ? (
              <div className="flex items-center gap-3 rounded-full bg-white px-3 py-2 text-xs text-slate-700 shadow-sm shadow-slate-200 ring-1 ring-slate-100">
                {session.picture ? (
                  <Image
                    alt={signedInName}
                    className="h-8 w-8 rounded-full object-cover"
                    height={32}
                    src={session.picture}
                    width={32}
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white">{signedInName.charAt(0)}</div>
                )}
                <div className="text-left">
                  <p className="text-[11px] text-slate-500">{t.auth.signedInAs}</p>
                  <p className="text-sm font-semibold text-slate-800">{signedInName}</p>
                </div>
                <form action="/api/auth/logout" method="post">
                  <button className="rounded-full bg-slate-900 px-3 py-2 text-xs font-semibold text-white shadow-sm shadow-indigo-200 transition hover:-translate-y-0.5 hover:shadow-lg" type="submit">
                    {t.auth.signOut}
                  </button>
                </form>
              </div>
            ) : (
              <a
                className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-800 shadow-sm shadow-slate-200 ring-1 ring-slate-100 transition hover:-translate-y-0.5 hover:shadow-lg"
                href={`/api/auth/login?from=/${locale}`}
              >
                {t.auth.signIn}
              </a>
            )}
          </div>
        </div>
      </header>

      {authErrorMessage ? (
        <div className="mx-auto mt-2 max-w-6xl rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-800 ring-1 ring-red-100">
          <p className="font-semibold">{authErrorMessage}</p>
          <p className="text-red-700/80">{t.auth.retry}</p>
        </div>
      ) : null}

      <main className="mx-auto flex max-w-6xl flex-col gap-20 px-6 pb-20">
        <section className="grid gap-10 overflow-hidden rounded-3xl bg-white/80 p-10 shadow-xl shadow-indigo-100 ring-1 ring-indigo-50 backdrop-blur">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700 ring-1 ring-indigo-100">
                {t.hero.badge}
              </span>
              <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">{t.hero.title}</h1>
              <p className="max-w-2xl text-lg leading-relaxed text-slate-600">{t.hero.description}</p>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  id="start"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-base font-semibold text-white shadow-md shadow-indigo-200 transition hover:-translate-y-0.5 hover:shadow-lg"
                  href="#pricing"
                >
                  {t.hero.ctaPrimary}
                  <span className="text-xs font-normal text-indigo-100">No card needed</span>
                </a>
                <a className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-base font-semibold text-slate-800 ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-lg" href="#details">
                  {t.hero.ctaSecondary}
                </a>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                {t.hero.notes.map((note) => (
                  <div key={note} className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1">
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    {note}
                  </div>
                ))}
              </div>
            </div>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-500 via-indigo-500 to-purple-600 p-8 text-white shadow-lg">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -left-12 bottom-0 h-40 w-40 rounded-full bg-white/5 blur-3xl" />
              <div className="relative space-y-6">
                <h2 className="text-xl font-semibold">Saturday Matchday at a glance</h2>
                <ul className="space-y-4 text-sm leading-relaxed">
                  {t.hero.sampleSchedule.map((item) => (
                    <li key={item.title} className="flex items-start gap-3 rounded-2xl bg-white/10 p-3">
                      <span className="mt-1 flex h-8 w-8 items-center justify-center rounded-xl bg-white/20 text-base">{item.time}</span>
                      <div>
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-white/80">{item.detail}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="details" className="grid gap-6 rounded-3xl bg-white/80 p-10 shadow-lg shadow-indigo-100 ring-1 ring-indigo-50">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold text-slate-900">{t.features.title}</h2>
            <p className="text-lg text-slate-600">{t.features.description}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {t.features.list.map((feature) => (
              <div
                key={feature.title}
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-white to-indigo-50 p-6 shadow-sm shadow-indigo-100 ring-1 ring-slate-100"
              >
                <div className="absolute right-4 top-4 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-indigo-100">
                  {feature.badge}
                </div>
                <h3 className="mb-3 text-xl font-semibold text-slate-900">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="pricing" className="grid gap-8 rounded-3xl bg-white/80 p-10 shadow-lg shadow-indigo-100 ring-1 ring-indigo-50">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold text-slate-900">{t.pricing.title}</h2>
            <p className="text-lg text-slate-600">{t.pricing.description}</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600 p-8 text-white shadow-xl">
              <div className="absolute right-4 top-4 rounded-full bg-white/15 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-white/90">
                {t.pricing.starter.tag}
              </div>
              <h3 className="text-2xl font-semibold">{t.pricing.starter.label}</h3>
              <p className="mt-2 text-white/85">{t.pricing.starter.description}</p>
              <ul className="mt-6 space-y-3 text-sm text-white/90">
                {t.pricing.starter.items.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="text-lg">✓</span> {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex items-baseline gap-2 text-4xl font-bold">{t.pricing.starter.price}</div>
              <p className="text-sm text-white/80">{t.pricing.starter.note}</p>
            </div>
            <div className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-lg shadow-indigo-100 ring-1 ring-indigo-100">
              <div className="absolute right-4 top-4 rounded-full bg-indigo-50 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700">
                {t.pricing.pro.tag}
              </div>
              <h3 className="text-2xl font-semibold text-slate-900">{t.pricing.pro.label}</h3>
              <p className="mt-2 text-slate-600">{t.pricing.pro.description}</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-700">
                {t.pricing.pro.items.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="text-lg text-indigo-600">✓</span> {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex items-baseline gap-2 text-4xl font-bold text-slate-900">
                {t.pricing.pro.price}
                <span className="text-base font-semibold text-slate-600">/month</span>
              </div>
              <p className="text-sm text-slate-500">{t.pricing.pro.note}</p>
              <div className="mt-8">
                <a className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-md shadow-indigo-200 transition hover:-translate-y-0.5 hover:shadow-lg" href="#start">
                  {t.pricing.pro.button}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-8 rounded-3xl bg-white/80 p-10 shadow-lg shadow-indigo-100 ring-1 ring-indigo-50">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold text-slate-900">{t.testimonials.title}</h2>
            <p className="text-lg text-slate-600">{t.testimonials.description}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {t.testimonials.quotes.map((quote) => (
              <div
                key={quote.title}
                className={`${quote.variant === "dark" ? "bg-slate-900 text-white shadow-lg shadow-indigo-200" : "bg-white text-slate-900 shadow-sm shadow-indigo-100 ring-1 ring-slate-100"} rounded-2xl p-6`}
              >
                <p className="text-lg font-semibold">{quote.title}</p>
                <p className={`mt-3 text-sm ${quote.variant === "dark" ? "text-white/80" : "text-slate-600"}`}>
                  {quote.body}
                </p>
                <p className="mt-4 text-xs uppercase tracking-wide text-indigo-200 sm:text-indigo-600">
                  {quote.name}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 rounded-3xl bg-slate-900 p-10 text-white shadow-xl shadow-indigo-200">
          <div className="flex flex-col gap-4 text-center">
            <h2 className="text-3xl font-bold">{t.cta.title}</h2>
            <p className="text-lg text-white/80">{t.cta.description}</p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-base font-semibold text-slate-900 shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5" href="#pricing">
                {t.cta.primary}
              </a>
              <a className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:border-white" href="#details">
                {t.cta.secondary}
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

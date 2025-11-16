import { locales, Locale, isLocale, defaultLocale } from "../i18n";

const translations: Record<Locale, {
  metaTitle: string;
  metaDescription: string;
  nav: { pricing: string; start: string };
  hero: {
    badge: string;
    title: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
    notes: string[];
    sampleSchedule: { time: string; title: string; detail: string }[];
  };
  features: { title: string; description: string; list: { title: string; description: string; badge: string }[] };
  pricing: {
    title: string;
    description: string;
    starter: { label: string; description: string; items: string[]; price: string; note: string; tag: string };
    pro: { label: string; description: string; items: string[]; price: string; note: string; tag: string; button: string };
  };
  testimonials: { title: string; description: string; quotes: { title: string; body: string; name: string; variant?: "dark" }[] };
  cta: { title: string; description: string; primary: string; secondary: string };
  localeSwitcher: { label: string };
}> = {
  en: {
    metaTitle: "Club Manager Kids | Youth sports club hub",
    metaDescription:
      "Manage football and basketball teams for kids under 16 with scheduling, messaging, and transparent pricing.",
    nav: {
      pricing: "Pricing",
      start: "Start for free",
    },
    hero: {
      badge: "⚽🏀 The platform for under-16 clubs",
      title: "Organize football and basketball teams without losing the fun of the game.",
      description:
        "Club Manager Kids keeps coaches, volunteers, and parents aligned. Schedule sessions, track attendance, share updates, and keep every young athlete supported—all in one simple dashboard.",
      ctaPrimary: "Start free (10 teams)",
      ctaSecondary: "See how it works",
      notes: ["GDPR-friendly roster sharing with parents", "Designed for ages 6-16"],
      sampleSchedule: [
        {
          time: "09:00",
          title: "U11 Football - Training",
          detail: "12 players confirmed • Field B • Gear reminder sent",
        },
        {
          time: "12:30",
          title: "U14 Basketball - Home game",
          detail: "9 players confirmed • Parents notified • Scorebook ready",
        },
        {
          time: "15:00",
          title: "Club-wide announcements",
          detail: "Post match recap and photos shared securely",
        },
      ],
    },
    features: {
      title: "Everything a youth club needs",
      description: "Purpose-built for volunteers, coaches, and parents running football and basketball squads.",
      list: [
        {
          title: "Training & game schedule",
          description: "Create clear calendars, repeat weekly blocks, and avoid time clashes between teams or age groups.",
          badge: "Planning",
        },
        {
          title: "Player availability",
          description: "Collect RSVPs from parents in seconds, track attendance, and highlight who needs extra follow-up.",
          badge: "Engagement",
        },
        {
          title: "Secure sharing",
          description: "Send directions, kit lists, photos, and score updates to guardians without juggling chat apps.",
          badge: "Communication",
        },
        {
          title: "Volunteer-friendly",
          description: "Assign assistants to multiple teams, add roles for first-aiders, and keep everyone aligned.",
          badge: "Collaboration",
        },
        {
          title: "Club insights",
          description: "See which teams are thriving, which sessions are busy, and where to add extra support.",
          badge: "Analytics",
        },
        {
          title: "Fair pricing",
          description: "Free for up to 10 teams. Grow beyond that for just €9/month—no hidden surprises.",
          badge: "Pricing",
        },
      ],
    },
    pricing: {
      title: "Transparent pricing",
      description: "Stay free while you build momentum. Only pay when you grow beyond 10 teams.",
      starter: {
        label: "Community (Free)",
        description: "Manage up to 10 teams with all the essentials, forever.",
        items: [
          "Training & game scheduling",
          "Unlimited volunteers and guardians",
          "Attendance and RSVPs",
          "Club announcements and media",
        ],
        price: "€0",
        note: "Stay on this plan for as long as you want.",
        tag: "Best for clubs starting out",
      },
      pro: {
        label: "Club Pro",
        description: "Unlimited teams plus priority support once you grow beyond 10 squads.",
        items: [
          "Unlimited teams and schedules",
          "Advanced availability reminders",
          "Club-wide performance snapshots",
          "Email & chat support for coordinators",
        ],
        price: "€9",
        note: "Cancel anytime. Perfect for growing academies.",
        tag: "Scale when ready",
        button: "Upgrade when you are ready",
      },
    },
    testimonials: {
      title: "Why coaches love it",
      description: "Built around the rhythm of weekly practices, weekend matches, and busy families.",
      quotes: [
        {
          title: "“No more juggling chats.”",
          body: "We moved our U12 football squad here and parents finally get updates in one place.",
          name: "Marta, volunteer coach",
          variant: "dark",
        },
        {
          title: "“Matchday checklist ready.”",
          body: "From jerseys to first-aid roles, every game has a checklist the helpers can see.",
          name: "Sam, basketball coordinator",
        },
        {
          title: "“Keeps kids focused on fun.”",
          body: "Parents stay informed, coaches stay organized, and the players just play.",
          name: "Hannah, academy lead",
        },
      ],
    },
    cta: {
      title: "Ready to kick off?",
      description:
        "Start for free, invite your coaches, and set up your first football or basketball team in minutes.",
      primary: "Create your club workspace",
      secondary: "Talk to a coach advisor",
    },
    localeSwitcher: {
      label: "Language",
    },
  },
  es: {
    metaTitle: "Club Manager Kids | Gestión de clubes juveniles",
    metaDescription:
      "Gestiona equipos de fútbol y baloncesto para menores de 16 años con agenda, avisos y precios claros.",
    nav: {
      pricing: "Precios",
      start: "Empieza gratis",
    },
    hero: {
      badge: "⚽🏀 La plataforma para clubes sub-16",
      title: "Organiza equipos de fútbol y baloncesto sin perder la diversión del juego.",
      description:
        "Club Manager Kids mantiene alineados a entrenadores, voluntarios y familias. Programa sesiones, registra asistencia, comparte avisos y cuida de cada deportista joven desde un panel sencillo.",
      ctaPrimary: "Empieza gratis (10 equipos)",
      ctaSecondary: "Ver cómo funciona",
      notes: ["Compartir plantillas con las familias de forma segura", "Diseñado para edades de 6 a 16"],
      sampleSchedule: [
        {
          time: "09:00",
          title: "Fútbol U11 - Entrenamiento",
          detail: "12 jugadores confirmados • Campo B • Recordatorio de equipo enviado",
        },
        {
          time: "12:30",
          title: "Baloncesto U14 - Partido en casa",
          detail: "9 jugadores confirmados • Familias avisadas • Acta lista",
        },
        {
          time: "15:00",
          title: "Avisos para todo el club",
          detail: "Crónica y fotos compartidas de forma segura",
        },
      ],
    },
    features: {
      title: "Todo lo que necesita un club juvenil",
      description:
        "Pensado para voluntarios, entrenadores y familias que gestionan equipos de fútbol y baloncesto.",
      list: [
        {
          title: "Agenda de entrenos y partidos",
          description: "Crea calendarios claros, repite sesiones semanales y evita choques entre equipos o categorías.",
          badge: "Planificación",
        },
        {
          title: "Disponibilidad de jugadores",
          description: "Recoge confirmaciones de las familias en segundos, controla la asistencia y detecta quién necesita seguimiento.",
          badge: "Participación",
        },
        {
          title: "Compartir de forma segura",
          description: "Envía ubicaciones, listas de material, fotos y marcadores sin depender de varios chats.",
          badge: "Comunicación",
        },
        {
          title: "Amigable para voluntarios",
          description: "Asigna ayudantes a varios equipos, añade roles de primeros auxilios y mantened la coordinación.",
          badge: "Colaboración",
        },
        {
          title: "Visión del club",
          description: "Ve qué equipos van mejor, qué sesiones están llenas y dónde reforzar el apoyo.",
          badge: "Analítica",
        },
        {
          title: "Precio justo",
          description: "Gratis hasta 10 equipos. Crece a solo 9 €/mes, sin letras pequeñas.",
          badge: "Precios",
        },
      ],
    },
    pricing: {
      title: "Precios transparentes",
      description: "Sigue gratis mientras ganáis ritmo. Solo pagas al superar los 10 equipos.",
      starter: {
        label: "Comunidad (Gratis)",
        description: "Gestiona hasta 10 equipos con lo esencial, para siempre.",
        items: [
          "Agenda de entrenos y partidos",
          "Voluntarios y familias ilimitados",
          "Asistencia y confirmaciones",
          "Avisos y material del club",
        ],
        price: "0 €",
        note: "Puedes quedarte en este plan todo el tiempo que quieras.",
        tag: "Ideal para empezar",
      },
      pro: {
        label: "Club Pro",
        description: "Equipos ilimitados y soporte prioritario cuando crezcáis más allá de 10 escuadras.",
        items: [
          "Equipos y calendarios ilimitados",
          "Recordatorios avanzados de disponibilidad",
          "Visión global del rendimiento del club",
          "Soporte por email y chat para coordinadores",
        ],
        price: "9 €",
        note: "Cancela cuando quieras. Perfecto para academias en crecimiento.",
        tag: "Escala cuando estés listo",
        button: "Mejorar cuando haga falta",
      },
    },
    testimonials: {
      title: "Por qué les gusta a los entrenadores",
      description: "Adaptado al ritmo de entrenos, partidos de fin de semana y familias ocupadas.",
      quotes: [
        {
          title: "“Nada de mil grupos de chat.”",
          body: "Mudamos a nuestro equipo U12 aquí y las familias por fin reciben avisos en un solo lugar.",
          name: "Marta, entrenadora voluntaria",
          variant: "dark",
        },
        {
          title: "“Checklist listo para el partido.”",
          body: "Desde camisetas hasta primeros auxilios, cada partido tiene una lista visible para el equipo de apoyo.",
          name: "Sam, coordinador de baloncesto",
        },
        {
          title: "“Los peques solo se enfocan en jugar.”",
          body: "Las familias están informadas, los entrenadores organizados y los jugadores disfrutan.",
          name: "Hannah, directora de academia",
        },
      ],
    },
    cta: {
      title: "¿Listos para empezar?",
      description:
        "Comienza gratis, invita a tus entrenadores y configura tu primer equipo de fútbol o baloncesto en minutos.",
      primary: "Crea el espacio de tu club",
      secondary: "Hablar con un asesor",
    },
    localeSwitcher: {
      label: "Idioma",
    },
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: string } }) {
  const locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const t = translations[locale];

  return {
    title: t.metaTitle,
    description: t.metaDescription,
  };
}

export default function Home({ params }: { params: { locale: string } }) {
  const locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const t = translations[locale];

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
        <div className="flex items-center gap-3 text-sm font-medium sm:gap-4">
          <nav className="hidden gap-3 sm:flex">
            <a className="rounded-full bg-white px-4 py-2 text-slate-700 shadow-sm shadow-slate-200 transition hover:-translate-y-0.5 hover:shadow-lg" href="#pricing">
              {t.nav.pricing}
            </a>
            <a className="rounded-full bg-slate-900 px-4 py-2 text-white shadow-sm shadow-indigo-200 transition hover:-translate-y-0.5 hover:shadow-lg" href="#start">
              {t.nav.start}
            </a>
          </nav>
          <div className="flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs text-slate-600 shadow-sm shadow-slate-200 ring-1 ring-slate-100">
            <span className="hidden font-semibold text-slate-800 sm:inline">{t.localeSwitcher.label}:</span>
            {locales.map((loc) => (
              <a
                key={loc}
                href={`/${loc}`}
                className={`rounded-full px-3 py-1 font-semibold transition hover:-translate-y-0.5 hover:shadow-sm hover:shadow-indigo-200 ${
                  loc === locale ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"
                }`}
              >
                {loc.toUpperCase()}
              </a>
            ))}
          </div>
        </div>
      </header>

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

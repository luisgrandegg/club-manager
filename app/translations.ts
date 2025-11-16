import { Translations } from "./i18n";

export type HomeTranslations = Translations<{
  metaTitle: string;
  metaDescription: string;
  nav: { pricing: string; start: string };
  auth: {
    signIn: string;
    signOut: string;
    signedInAs: string;
    unknownUser: string;
    retry: string;
    errors: { state: string; callback: string; generic: string };
  };
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
}>

export const translations: HomeTranslations = {
  en: {
    metaTitle: "Club Manager Kids | Youth sports club hub",
    metaDescription:
      "Manage football and basketball teams for kids under 16 with scheduling, messaging, and transparent pricing.",
    nav: {
      pricing: "Pricing",
      start: "Start for free",
    },
    auth: {
      signIn: "Sign in with Google",
      signOut: "Sign out",
      signedInAs: "Signed in",
      unknownUser: "Google user",
      retry: "Please try again.",
      errors: {
        state: "We could not verify the sign-in request.",
        callback: "We could not complete the Google sign-in flow.",
        generic: "We could not sign you in with Google right now.",
      },
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
    auth: {
      signIn: "Accede con Google",
      signOut: "Cerrar sesión",
      signedInAs: "Sesión iniciada",
      unknownUser: "Usuario de Google",
      retry: "Inténtalo de nuevo.",
      errors: {
        state: "No pudimos verificar la petición de inicio de sesión.",
        callback: "No pudimos completar el acceso con Google.",
        generic: "No podemos iniciar sesión con Google ahora mismo.",
      },
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
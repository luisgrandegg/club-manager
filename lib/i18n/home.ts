import { DEFAULT_LOCALE } from "./config";

export type Feature = {
  title: string;
  description: string;
};

export type HomeMessages = {
  brand: {
    name: string;
    title: string;
    subtitle: string;
  };
  hero: {
    headline: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    note: string;
  };
  session: {
    title: string;
    signedInLabel: string;
    signedOutLabel: string;
    missingSession: string;
    profileFallback: string;
  };
  callouts: Feature[];
  tips: Feature[];
};

const homeMessages: Record<string, HomeMessages> = {
  [DEFAULT_LOCALE]: {
    brand: {
      name: "Club Manager",
      title: "Accounts",
      subtitle: "Google sign-in demo",
    },
    hero: {
      headline: "Sign in with Google to personalize your club workspace",
      description:
        "Connect your Google account to sync profile details, preserve sessions securely, and explore how we store authentication state server-side.",
      primaryCta: "Continue with Google",
      secondaryCta: "Sign out",
      note: "Your credentials never touch the browser—tokens stay on the server.",
    },
    session: {
      title: "Current session",
      signedInLabel: "Signed in with Google",
      signedOutLabel: "Not signed in",
      missingSession:
        "Start the Google sign-in flow to see your active session details appear here.",
      profileFallback: "User avatar placeholder",
    },
    callouts: [
      {
        title: "Secure cookies",
        description:
          "HTTP-only, signed cookies keep tokens out of client-side JavaScript and verify integrity on every request.",
      },
      {
        title: "Server exchanges",
        description:
          "OAuth codes are redeemed server-side so secrets and access tokens stay off the client.",
      },
      {
        title: "Flexible redirects",
        description:
          "Configure callback URLs with APP_URL to match local and deployed environments effortlessly.",
      },
    ],
    tips: [
      {
        title: "Use your trusted account",
        description:
          "Only Google accounts allowed by your OAuth client can complete the login flow.",
      },
      {
        title: "Match redirect URIs",
        description:
          "Ensure your Google OAuth app lists /api/auth/google/callback for every environment you use.",
      },
    ],
  },
  es: {
    brand: {
      name: "Club Manager",
      title: "Cuentas",
      subtitle: "Demo de inicio de sesión con Google",
    },
    hero: {
      headline: "Inicia sesión con Google para personalizar tu espacio del club",
      description:
        "Conecta tu cuenta de Google para sincronizar tu perfil, mantener la sesión de forma segura y ver cómo guardamos el estado de autenticación en el servidor.",
      primaryCta: "Continuar con Google",
      secondaryCta: "Cerrar sesión",
      note: "Tus credenciales nunca tocan el navegador: los tokens se quedan en el servidor.",
    },
    session: {
      title: "Sesión actual",
      signedInLabel: "Sesión iniciada con Google",
      signedOutLabel: "Sesión no iniciada",
      missingSession:
        "Empieza el flujo de acceso con Google para ver los detalles de tu sesión activa aquí.",
      profileFallback: "Avatar del usuario",
    },
    callouts: [
      {
        title: "Cookies seguras",
        description:
          "Las cookies firmadas y solo accesibles por HTTP mantienen los tokens fuera de JavaScript en el cliente y validan la integridad en cada petición.",
      },
      {
        title: "Intercambios en el servidor",
        description:
          "Los códigos OAuth se canjean en el servidor para que los secretos y tokens de acceso no aparezcan en el cliente.",
      },
      {
        title: "Redirecciones flexibles",
        description:
          "Configura las URLs de callback con APP_URL para que coincidan fácilmente con tus entornos locales y desplegados.",
      },
    ],
    tips: [
      {
        title: "Usa tu cuenta de confianza",
        description:
          "Solo las cuentas de Google permitidas por tu cliente OAuth pueden completar el inicio de sesión.",
      },
      {
        title: "Coincide las URIs de redirección",
        description:
          "Asegúrate de que tu app de OAuth de Google incluya /api/auth/google/callback para cada entorno que uses.",
      },
    ],
  },
};

export function getHomeMessages(locale: string): HomeMessages {
  return homeMessages[locale] ?? homeMessages[DEFAULT_LOCALE];
}

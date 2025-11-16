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
};

export function getHomeMessages(locale: string): HomeMessages {
  return homeMessages[locale] ?? homeMessages[DEFAULT_LOCALE];
}

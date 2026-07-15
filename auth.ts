import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { getUserByEmail, upsertOAuthUser } from "@/lib/user-store";

function getFirstNonEmptyEnv(keys: string[]) {
  for (const key of keys) {
    const value = process.env[key]?.trim();

    if (value) {
      return { key, value };
    }
  }

  return { key: null, value: "" };
}

const googleClientIdEnv = getFirstNonEmptyEnv([
  "AUTH_GOOGLE_ID",
  "GOOGLE_CLIENT_ID"
]);
const googleClientSecretEnv = getFirstNonEmptyEnv([
  "AUTH_GOOGLE_SECRET",
  "GOOGLE_CLIENT_SECRET"
]);
const authSecretEnv = getFirstNonEmptyEnv(["AUTH_SECRET", "NEXTAUTH_SECRET"]);
const googleClientId = googleClientIdEnv.value;
const googleClientSecret = googleClientSecretEnv.value;
const authSecret = authSecretEnv.value;

const googleClientIdLooksValid = googleClientId.endsWith(".apps.googleusercontent.com");

console.info("[auth][config] Google OAuth environment", {
  authUrl: process.env.AUTH_URL ?? null,
  clientIdLength: googleClientId.length,
  clientIdLooksValid: googleClientIdLooksValid,
  clientIdSource: googleClientIdEnv.key,
  clientIdSuffix: googleClientId ? googleClientId.slice(-28) : null,
  hasAuthSecret: Boolean(process.env.AUTH_SECRET?.trim()),
  hasClientSecret: Boolean(googleClientSecret),
  hasNextAuthSecret: Boolean(process.env.NEXTAUTH_SECRET?.trim()),
  nextAuthUrl: process.env.NEXTAUTH_URL ?? null,
  oauthSecretSource: googleClientSecretEnv.key,
  sessionSecretSource: authSecretEnv.key
});

if (!googleClientIdLooksValid) {
  console.error("[auth][config] Invalid Google OAuth client id", {
    clientIdLength: googleClientId.length,
    clientIdSource: googleClientIdEnv.key,
    expectedSuffix: ".apps.googleusercontent.com"
  });
}

export const { handlers, auth } = NextAuth({
  pages: {
    signIn: "/en?login=1"
  },
  secret: authSecret,
  providers: [
    Google({
      clientId: googleClientId,
      clientSecret: googleClientSecret
    })
  ],
  session: {
    strategy: "jwt"
  },
  trustHost: true,
  logger: {
    error(error) {
      console.error("[auth][error]", error);
    },
    warn(code) {
      console.warn("[auth][warn]", code);
    },
    debug(code, metadata) {
      if (process.env.AUTH_DEBUG === "true") {
        console.debug("[auth][debug]", code, metadata);
      }
    }
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      const target = new URL(url, baseUrl);

      if (target.origin !== baseUrl) {
        return `${baseUrl}/en`;
      }

      if (target.searchParams.get("login") === "1") {
        const callbackUrl = target.searchParams.get("callbackUrl");

        if (callbackUrl?.startsWith("/") && !callbackUrl.startsWith("//")) {
          return `${baseUrl}${callbackUrl}`;
        }
      }

      return target.toString();
    },
    async signIn({ account, profile, user }) {
      if (account?.provider !== "google" || !user.email) {
        console.error("[auth][signIn] Missing Google account or user email", {
          provider: account?.provider,
          hasEmail: Boolean(user.email)
        });
        return false;
      }

      try {
        await upsertOAuthUser({
          avatar: user.image ?? null,
          email: user.email,
          name: user.name ?? profile?.name ?? user.email,
          provider: "google"
        });
      } catch (error) {
        console.error("[auth][signIn] Failed to upsert Google user", error);
      }

      return true;
    },
    async jwt({ token }) {
      if (token.email) {
        const dbUser = await getUserByEmail(token.email);

        if (dbUser) {
          token.id = dbUser.id;
          token.name = dbUser.name;
          token.picture = dbUser.avatar;
          token.provider = dbUser.provider;
          token.role = dbUser.role;
          token.plan = dbUser.plan;
        } else {
          token.id = token.sub ?? token.email;
          token.provider = "google";
          token.role = "user";
          token.plan = "free";
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = String(token.id ?? "");
        session.user.provider = String(token.provider ?? "google");
        session.user.role = String(token.role ?? "user");
        session.user.plan = String(token.plan ?? "free");
      }

      return session;
    }
  }
});

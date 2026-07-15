import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { getUserByEmail, upsertOAuthUser } from "@/lib/user-store";

const googleClientId = process.env.AUTH_GOOGLE_ID ?? process.env.GOOGLE_CLIENT_ID ?? "";
const googleClientSecret =
  process.env.AUTH_GOOGLE_SECRET ?? process.env.GOOGLE_CLIENT_SECRET ?? "";

export const { handlers, auth } = NextAuth({
  pages: {
    signIn: "/en?login=1"
  },
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

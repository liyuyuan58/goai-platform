import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { getUserByEmail, upsertOAuthUser } from "@/lib/user-store";

export const { handlers, auth } = NextAuth({
  pages: {
    signIn: "/en?login=1"
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
    })
  ],
  session: {
    strategy: "jwt"
  },
  trustHost: true,
  callbacks: {
    async signIn({ account, profile, user }) {
      if (account?.provider !== "google" || !user.email) {
        return false;
      }

      await upsertOAuthUser({
        avatar: user.image ?? null,
        email: user.email,
        name: user.name ?? profile?.name ?? user.email,
        provider: "google"
      });

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

import NextAuth, { type NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { prisma } from "@/lib/prisma";
import { devLoginEnabled } from "@/lib/auth/dev-login";

const providers: NextAuthConfig["providers"] = [Google];

if (devLoginEnabled) {
  providers.push(
    Credentials({
      id: "dev-login",
      name: "Dev login",
      credentials: { email: { label: "Email", type: "email" } },
      async authorize(credentials) {
        const email = typeof credentials?.email === "string" ? credentials.email.trim().toLowerCase() : "";
        if (!email.includes("@")) return null;

        return prisma.user.upsert({
          where: { email },
          update: {},
          create: { email, name: email.split("@")[0] },
        });
      },
    }),
  );
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers,
  // Credentials sign-in requires JWT sessions (the database strategy only
  // supports OAuth/adapter-linked providers).
  session: { strategy: "jwt" },
  // Self-hosted deploys (this isn't auto-detected the way Vercel is) need to
  // explicitly trust their own Host header, or Auth.js rejects every request.
  trustHost: true,
  callbacks: {
    // The JWT strategy doesn't populate session.user.id by default.
    session({ session, token }) {
      if (session.user && token.sub) session.user.id = token.sub;
      return session;
    },
  },
});

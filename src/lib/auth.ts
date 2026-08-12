import NextAuth, { type NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { prisma } from "@/lib/prisma";
import { devLoginEnabled } from "@/lib/auth/dev-login";
import { loginSchema } from "@/lib/auth/credentials-schema";
import { verifyPassword } from "@/lib/auth/password";

const providers: NextAuthConfig["providers"] = [
  Google,
  Credentials({
    id: "credentials",
    name: "Credentials",
    credentials: { email: { label: "Email", type: "email" }, password: { label: "Password", type: "password" } },
    async authorize(credentials) {
      const parsed = loginSchema.safeParse(credentials);
      if (!parsed.success) return null;

      const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
      if (!user?.password) return null;

      const valid = await verifyPassword(parsed.data.password, user.password);
      if (!valid) return null;

      return { id: user.id, name: user.name, email: user.email, image: user.image };
    },
  }),
];

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

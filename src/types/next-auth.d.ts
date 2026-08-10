import type { DefaultSession } from "next-auth";

// The session callback in src/lib/auth.ts always copies token.sub into
// session.user.id, so treat it as always present rather than optional.
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

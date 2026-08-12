import Link from "next/link";

import { googleLogin, devLogin, credentialsLogin } from "@/lib/auth/actions";
import { devLoginEnabled } from "@/lib/auth/dev-login";
import { authErrorMessage } from "@/lib/auth/error-messages";
import { AuthShell } from "@/components/auth/auth-shell";

const inputClass =
  "w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none";

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const { error } = await searchParams;
  const errorMessage = authErrorMessage(typeof error === "string" ? error : undefined);

  return (
    <AuthShell title="Sign in" subtitle="Build and publish your landing page.">
      <div className="flex flex-col gap-6">
        {errorMessage && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
            {errorMessage}
          </p>
        )}

        <form action={googleLogin}>
          <button
            type="submit"
            className="w-full rounded-full border border-zinc-300 px-4 py-2.5 text-sm font-medium transition hover:bg-zinc-50"
          >
            Continue with Google
          </button>
        </form>

        <div className="flex items-center gap-3 text-xs text-zinc-400">
          <div className="h-px flex-1 bg-zinc-200" />
          or
          <div className="h-px flex-1 bg-zinc-200" />
        </div>

        <form action={credentialsLogin} className="flex flex-col gap-3">
          <input type="email" name="email" required placeholder="you@example.com" className={inputClass} />
          <input type="password" name="password" required minLength={8} placeholder="Password" className={inputClass} />
          <button
            type="submit"
            className="w-full rounded-full bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800"
          >
            Sign in
          </button>
        </form>

        <p className="text-center text-sm text-zinc-500">
          No account?{" "}
          <Link href="/signup" className="font-medium text-zinc-900 hover:underline">
            Sign up
          </Link>
        </p>

        {devLoginEnabled && (
          <form action={devLogin} className="flex flex-col gap-3 border-t border-zinc-200 pt-6">
            <p className="text-xs text-zinc-400">Dev only, no password</p>
            <input type="email" name="email" required placeholder="you@example.com" className={inputClass} />
            <button
              type="submit"
              className="w-full rounded-full border border-zinc-300 px-4 py-2.5 text-sm font-medium transition hover:bg-zinc-50"
            >
              Continue with email
            </button>
          </form>
        )}
      </div>
    </AuthShell>
  );
}

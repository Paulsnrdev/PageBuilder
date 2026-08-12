import Link from "next/link";

import { googleLogin, signUp } from "@/lib/auth/actions";
import { authErrorMessage } from "@/lib/auth/error-messages";

const inputClass =
  "w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none";

export default async function SignUpPage({ searchParams }: PageProps<"/signup">) {
  const { error } = await searchParams;
  const errorMessage = authErrorMessage(typeof error === "string" ? error : undefined);

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center gap-8 px-6">
      <div>
        <h1 className="text-2xl font-semibold">Create your account</h1>
        <p className="mt-1 text-sm text-zinc-500">Build and publish your landing page.</p>
      </div>

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

      <form action={signUp} className="flex flex-col gap-3">
        <input type="text" name="name" required placeholder="Your name" className={inputClass} />
        <input type="email" name="email" required placeholder="you@example.com" className={inputClass} />
        <input
          type="password"
          name="password"
          required
          minLength={8}
          placeholder="Password (min. 8 characters)"
          className={inputClass}
        />
        <button
          type="submit"
          className="w-full rounded-full bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800"
        >
          Sign up
        </button>
      </form>

      <p className="text-center text-sm text-zinc-500">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-zinc-900 hover:underline">
          Sign in
        </Link>
      </p>
    </main>
  );
}

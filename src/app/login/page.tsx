import { signIn } from "@/lib/auth";
import { devLoginEnabled } from "@/lib/auth/dev-login";

async function googleLogin() {
  "use server";
  await signIn("google", { redirectTo: "/dashboard/sites" });
}

async function devLogin(formData: FormData) {
  "use server";
  await signIn("dev-login", { email: formData.get("email"), redirectTo: "/dashboard/sites" });
}

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center gap-8 px-6">
      <div>
        <h1 className="text-2xl font-semibold">Sign in</h1>
        <p className="mt-1 text-sm text-zinc-500">Build and publish your landing page.</p>
      </div>

      <form action={googleLogin}>
        <button
          type="submit"
          className="w-full rounded-full border border-zinc-300 px-4 py-2.5 text-sm font-medium transition hover:bg-zinc-50"
        >
          Continue with Google
        </button>
      </form>

      {devLoginEnabled && (
        <form action={devLogin} className="flex flex-col gap-3 border-t border-zinc-200 pt-6">
          <p className="text-xs text-zinc-400">Dev only, no password</p>
          <input
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            className="rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full rounded-full bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800"
          >
            Continue with email
          </button>
        </form>
      )}
    </main>
  );
}

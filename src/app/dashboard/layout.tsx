import { redirect } from "next/navigation";
import Link from "next/link";

import { auth, signOut } from "@/lib/auth";

async function logout() {
  "use server";
  await signOut({ redirectTo: "/login" });
}

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between border-b border-zinc-200 px-6 py-4">
        <Link href="/dashboard/sites" className="font-semibold">
          Page Builder
        </Link>
        <div className="flex items-center gap-4 text-sm text-zinc-500">
          <span>{session.user.email}</span>
          <form action={logout}>
            <button type="submit" className="hover:text-zinc-900">
              Sign out
            </button>
          </form>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}

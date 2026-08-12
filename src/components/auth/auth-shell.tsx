import Image from "next/image";
import Link from "next/link";

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50">
      <header className="px-6 py-5 sm:px-10">
        <Link href="/" className="inline-flex items-center gap-2 text-lg font-semibold">
          <Image src="/icon.svg" alt="" width={28} height={28} className="rounded-md" />
          Page Builder
        </Link>
      </header>

      <main className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm rounded-xl border border-zinc-200 bg-white p-8 shadow-sm">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold">{title}</h1>
            <p className="mt-1 text-sm text-zinc-500">{subtitle}</p>
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}

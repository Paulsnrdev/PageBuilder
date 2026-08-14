import Image from "next/image";
import Link from "next/link";

import { AuthShowcase } from "@/components/auth/auth-showcase";

export function AuthShell({
  greeting,
  subtitle,
  children,
}: {
  greeting: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100 p-4 sm:p-8">
      <div className="flex w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl md:min-h-[640px]">
        <div className="flex w-full flex-col px-8 py-10 sm:px-14 md:w-[54%] md:justify-center">
          <Link href="/" className="mb-10 inline-flex items-center gap-2 text-base font-semibold">
            <Image src="/icon.svg" alt="" width={26} height={26} className="rounded-md" />
            Page Builder
          </Link>

          <div className="mx-auto w-full max-w-sm">
            <div className="mb-8 text-center">
              <p className="text-2xl font-semibold">{greeting}</p>
              <p className="mt-1 text-sm text-zinc-500">{subtitle}</p>
            </div>
            {children}
          </div>
        </div>

        <AuthShowcase />
      </div>
    </div>
  );
}

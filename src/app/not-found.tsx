import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-sm font-medium text-zinc-400">404</p>
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="max-w-sm text-sm text-zinc-500">
        The page you&apos;re looking for doesn&apos;t exist, or the site it belonged to isn&apos;t published.
      </p>
      <Link href="/" className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white hover:bg-zinc-800">
        Go home
      </Link>
    </div>
  );
}

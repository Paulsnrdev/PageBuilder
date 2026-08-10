import { NextResponse, type NextRequest } from "next/server";

const OWN_HOST_PATTERNS = [/^localhost(:\d+)?$/, /^127\.0\.0\.1(:\d+)?$/, /\.vercel\.app$/];

/** Requests arriving on a customer's custom domain get rendered by /domain/[host] instead of the app's own routes. */
export function proxy(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const isOwnHost = OWN_HOST_PATTERNS.some((pattern) => pattern.test(host)) || host === process.env.VERCEL_URL;
  if (isOwnHost) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/domain/${host}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};

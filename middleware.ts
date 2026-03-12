import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// SEO SAFETY LOCK: Force non-indexing globally at HTTP-header level.
// Do not remove or relax this unless the project owner explicitly asks for it.
export function middleware(_request: NextRequest) {
  const response = NextResponse.next();
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

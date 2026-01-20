// Next.js 16 convention
export const config = {
  matcher: ["/dashboard/:path*", "/services/:path*"],
};

export default function proxy(request: any) {
  // Authentication check logic for the advisor's requirement
  const token = request.cookies.get("token");
  if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
    // Redirect logic
  }
}

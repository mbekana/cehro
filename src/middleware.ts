import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  console.log("Middleware is running...");

  
  if (req.nextUrl.pathname === '/') {
    const url = req.nextUrl.clone();
    url.pathname = '/public/dashboard'; 
    return NextResponse.redirect(url);
  }

  const isAdminRoute = req.nextUrl.pathname.startsWith('/admin');
  const token = req.cookies.get("accessToken");
  console.log("TOKEN: ", token)
  console.log("Request: ", req.cookies)
  console.log("token ", )
  if (isAdminRoute && !token) {
    const loginUrl = req.nextUrl.clone();
    console.log("loginUrl --> ", loginUrl);
    loginUrl.pathname = '/auth/login';
    loginUrl.searchParams.set('callbackUrl', req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/'], 
};

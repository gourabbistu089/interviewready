import { NextRequest, NextResponse } from 'next/server';

const PROTECTED = [
  '/dashboard',
  '/learning',
  '/practice',
  '/mock-interview',
  '/blog',
  '/create-blog',
  '/update-blog',
  '/create-article',
  '/articles',
  '/cheatsheet',
  '/ai-quiz',
  '/admin',
];

const OPEN_ROUTES = ['/login', '/register'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Token lives in localStorage (client-side only).
  // We use a custom header set by the client to check auth in middleware,
  // OR fall back to a cookie named "token" if set on login.
  const token =
    request.cookies.get('token')?.value ||
    request.headers.get('x-auth-token');

  const isProtected = PROTECTED.some(
    (p) => pathname === p || pathname.startsWith(p + '/'),
  );
  const isOpen = OPEN_ROUTES.some((p) => pathname === p);

  if (isProtected && !token) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  if (isOpen && token) {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/).*)',
  ],
};

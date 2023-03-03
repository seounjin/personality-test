import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/login')) {
    const cookies = req.cookies.get('accessToken');
    if (cookies) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  if (req.nextUrl.pathname.startsWith('/signup')) {
    const cookies = req.cookies.get('accessToken');
    if (cookies) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }
}

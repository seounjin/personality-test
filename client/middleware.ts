import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/login')) {
    const accessToken = req.cookies.get('accessToken');
    const refreshToken = req.cookies.get('refreshToken');
    if (accessToken && refreshToken) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  if (req.nextUrl.pathname.startsWith('/signup')) {
    const accessToken = req.cookies.get('accessToken');
    const refreshToken = req.cookies.get('refreshToken');
    if (accessToken && refreshToken) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }
}

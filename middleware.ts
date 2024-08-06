import { NextResponse, NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('auth_token')?.value; // Adjust based on your cookie handling method

  if (!token) {
    // No token present, redirect to login
    const url = new URL('/login', req.url);
    return NextResponse.redirect(url);
  }

  try {
    // Verify the token using jose
    await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET as string));
  } catch (error) {
    console.error('Token verification failed:', error);
    // Token is invalid or expired, redirect to login
    const url = new URL('/login', req.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'], // Protect routes under /dashboard
};

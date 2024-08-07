import { NextResponse } from 'next/server';

export async function POST() {
  // Clear the auth_token cookie
  const response = NextResponse.json({ message: 'Logged out successfully' });
  response.cookies.set('auth_token', '', { httpOnly: true, maxAge: 0 });

  return response;
}

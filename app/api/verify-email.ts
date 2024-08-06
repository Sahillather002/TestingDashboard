// pages/api/verify-email.ts
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  await connectToDatabase();
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  try {
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
    }

    user.verificationToken = null;
    user.isVerified = true;
    await user.save();

    return NextResponse.json({ message: 'Email verified successfully. You can now log in.' });
  } catch (error) {
    console.error('Error verifying email:', error);
    return NextResponse.error();
  }
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const response = await GET(req);
    res.status(response.status).json(await response.json());
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

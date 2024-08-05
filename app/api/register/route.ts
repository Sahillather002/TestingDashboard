import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  await connectToDatabase();
  const { email, password } = await request.json();

  try {
    const user = new User({ email, password });
    await user.save();
    return NextResponse.json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.error();
  }
}

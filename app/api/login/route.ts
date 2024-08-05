import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  await connectToDatabase();
  const { email, password } = await request.json();

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: '1h'
    });

    return NextResponse.json({ token });
  } catch (error) {
    return NextResponse.error();
  }
}

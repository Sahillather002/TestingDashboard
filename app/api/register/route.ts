import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendVerificationEmail = async (email: string, token: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Email Verification',
    text: `Please verify your email by clicking the following link: ${process.env.BASE_URL}/api/verify-email?token=${token}`,
    html: `<p>Please verify your email by clicking the following link: <a href="${process.env.BASE_URL}/api/verify-email?token=${token}">Verify Email</a></p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Verification email sent');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

export async function POST(request: Request) {
  await connectToDatabase();
  const { email, password } = await request.json();

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Generate a verification token
    const token = crypto.randomBytes(32).toString('hex');

    // Save the email, password, and token temporarily
    const user = new User({ email, password, verificationToken: token });
    // await user.save();

    // Send verification email
    // await sendVerificationEmail(email, token);

    return NextResponse.json({ message: 'Please check your email to verify your account.' });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.error();
  }
}

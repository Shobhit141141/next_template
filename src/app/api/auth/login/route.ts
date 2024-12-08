import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/models/User';
import { connectDB } from '@/lib/db';
import { comparePassword } from '@/utils/hash';
import { signToken } from '@/lib/jwt';

// Login route
// POST /api/auth/login
// req : email, password
// res : message
// Public
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = await signToken({ id: user._id, email: user.email });

    const response = NextResponse.json({ message: 'Login successful' });

    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, 
    });

    return response;
  } catch (error) {
    console.error((error as Error).message);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

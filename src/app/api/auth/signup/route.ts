import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/User";
import { connectDB } from "@/lib/db";
import { hashPassword } from "@/utils/hash";
import { signToken } from "@/lib/jwt";

// Signup route
// POST /api/auth/signup
// req : name, email, password
// res : message
// Public
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = await signToken({ id: newUser._id, email: newUser.email });

    const response = NextResponse.json({
      message: "User created successfully",
    });

    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error((error as Error).message);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

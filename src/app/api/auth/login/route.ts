import { connect } from "@/lib/mongodb";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { generateToken } from "@/lib/auth";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User doesn't exist!!" },
        { status: 400 }
      );
    }

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return NextResponse.json(
        { error: "Invalid password!!" },
        { status: 400 }
      );
    }

    const token = generateToken(user);
    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });
    response.cookies.set({
      name: "auth_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

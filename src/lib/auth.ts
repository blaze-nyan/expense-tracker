import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { connect } from "./mongodb";
import User from "@/models/userModel";

interface payLoad {
  id: string;
  username: string;
  email: string;
}
const JWT_SECRET =
  process.env.JWT_SECRET ||
  "170a0ab2ff05ce0f6c4222d70589aaccf3d1312fa9aede85b12bf41a4f902ded";

export function generateToken(user: any) {
  const tokenData = {
    id: user._id,
    username: user.username,
    email: user.email,
  };
  return jwt.sign(tokenData, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: any): payLoad | null {
  try {
    return jwt.verify(token, JWT_SECRET) as payLoad;
  } catch (error: any) {
    console.error("Token verification error", error.message);
    return null;
  }
}

export async function getCurrentUser() {
  const cookie = await cookies();
  const token = cookie.get("auth_token")?.value;
  if (!token) {
    return null;
  }
  const decode = verifyToken(token);
  if (!decode) {
    return null;
  }
  await connect();
  const currentUser = await User.findById(decode.id).select("-password");
  if (!currentUser) {
    return null;
  }
  return currentUser;
}

import { connectMongoDB } from "@/libs/Models/MongoContect";
import User from "@/libs/Models/Users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
export const POST = async (request) => {
  try {
    await connectMongoDB();
    const { email, password } = await request.json();
    if (!email || !password) {
      return new NextResponse(
        JSON.stringify({
          message: "Email and password is required",
        }),
        { status: 400 }
      );
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return new NextResponse(
        JSON.stringify({
          message: "The user not found",
        }),
        { status: 404 }
      );
    }
    const secret = process.env.SECRET_KEY;
    const matchedPassword = await bcrypt.compare(password, user.password);

    if (user && matchedPassword) {
      const token = jwt.sign(
        {
          userId: user.id,
          userName: user.userName,
          email: user.email
        },
        secret,
        { expiresIn: "1d" }
      );
      return new NextResponse(
        JSON.stringify({
          message: "Login successfully",
          user: user.email,
          token: token,
        })
      );
    } else {
      return new NextResponse(
        JSON.stringify({
          message: "Email or Password is not correct",
        }),
        { status: 400 }
      );
    }
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: "Failed to login",
        error: error.message,
      }),
      { status: error.status }
    );
  }
};

import { connectMongoDB } from "@/libs/Models/MongoContect";
import User from "@/libs/Models/Users";
import { NextResponse } from "next/server";
const bcrypt = require("bcrypt");

export const POST = async (requset) => {
  try {
    await connectMongoDB();

    const { userName, email, password, phone } = await requset.json();

    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return new NextResponse(
        JSON.stringify({
          message: "user already exists",
        }),
        { status: 400 }
      );
    }
    const hashedPassword = bcrypt.hashSync(password, 10);

    let newUser = new User({
      userName: userName,
      email: email,
      password: hashedPassword,
      phone: phone,
    });

    

    await newUser.save();

    return new NextResponse(
      JSON.stringify({
        message: "Register successfully! Now you can login",
        user: newUser,
      }),
      { status: 201 }
    );
  } catch (error) {

    return new NextResponse(
      JSON.stringify({
        message: "Failed to Register",
        error: error.message,
      }),

      { status: 400 }
    );
  }
};

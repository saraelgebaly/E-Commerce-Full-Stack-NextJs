import { connectMongoDB } from "@/libs/Models/MongoContect";
import User from "@/libs/Models/Users";
import { NextResponse } from "next/server";
const bcrypt = require("bcrypt");
const saltRounds = 10;
const myPlaintextPassword = "s0//P4$$w0rD";
const someOtherPlaintextPassword = "not_bacon";
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

    // bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
    //   // Store hash in your password DB.
    // });

    console.log(newUser);

    await newUser.save();

    return new NextResponse(
      JSON.stringify({
        message: "Register successfully! Now you can login",
        user: newUser,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.log(error);

    return new NextResponse(
      JSON.stringify({
        message: "Failed to Register",
        error: error.message,
      }),

      { status: 400 }
    );
  }
};

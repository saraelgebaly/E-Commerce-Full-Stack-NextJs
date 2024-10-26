import Cart from "@/libs/Models/Cart";
import { connectMongoDB } from "@/libs/Models/MongoContect";
import Product from "@/libs/Models/Products";
import User from "@/libs/Models/Users";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    await connectMongoDB();

    const data = await Cart.find().populate("product");
    const { searchParams } = new URL(request.url);
    const filterByEmail = searchParams.get("email");

    const getByEmail = filterByEmail
      ? data.filter((cart) => cart.email === filterByEmail)
      : data;
    if (filterByEmail && getByEmail.length === 0) {
      return new NextResponse(
        JSON.stringify({
          message: "Email not found",
        }),
        { status: 404 }
      );
    }
    return new NextResponse(
      JSON.stringify({
        message: "Get Products Cart successfully",
        data: getByEmail,
      }),
      { status: 200 }
    );
  } catch (error) {

    return new NextResponse(
      JSON.stringify({
        error,
        message: "Something went wrong",
      }),
      { status: 400 }
    );
  }
};

export const POST = async (request) => {
  try {
    await connectMongoDB();

    const { userName, email, productId } = await request.json();

    if (!productId || !Types.ObjectId.isValid(productId)) {
      return new NextResponse(
        JSON.stringify({
          message: "Invalid or missing product ID",
        }),
        { status: 400 }
      );
    }
    const product = await Product.findById({ _id: productId });

    if (!product) {
      return new NextResponse(
        JSON.stringify({
          message: "Product not found",
        }),
        { status: 404 }
      );
    }
    const addToCart = await new Cart({
      userName: userName,
      email: email,
      product: product,
    });
    await addToCart.save();
    return new NextResponse(
      JSON.stringify({
        message: "Successfully added product to cart",
        data: addToCart,
      }),
      { status: 200 }
    );
  } catch (error) {

    return new NextResponse(
      JSON.stringify({
        message: "Failed to add product to cart",
        error,
      }),
      { status: 400 }
    );
  }
};



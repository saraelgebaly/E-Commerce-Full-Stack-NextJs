import Cart from "@/libs/Models/Cart";
import { connectMongoDB } from "@/libs/Models/MongoContect";
import { NextResponse } from "next/server";

export const DELETE = async (request,context) => {
  try {
    await connectMongoDB();
    const cartId = context.params.cartId;
    console.log(cartId);

    const cart = await Cart.findByIdAndDelete(cartId);
    if (!cart) {
      return new NextResponse(
        JSON.stringify({ message: "Cart not found" }),
        { status: 404 }
      );
    }
    return new NextResponse(
      JSON.stringify({
        message: "Cart deleted successfully",
        data:[]
      }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return new NextResponse(
      JSON.stringify({
        message: "Invalid or missing product ID",
      }),
      { status: 400 }
    );
  }
};

import { connectMongoDB } from "@/libs/Models/MongoContect";
import Product from "@/libs/Models/Products";
import { NextResponse } from "next/server";

export const GET = async (request, context) => {
  try {
   
    await connectMongoDB();

    const productId = context.params.productId;
    

    const product = await Product.findById(productId);
    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        { status: 404 }
      );
    }
    return new NextResponse(
      JSON.stringify({
        message: "Get Product successfully",
        data: product,
      }),
      { status: 200 }
    );
  } catch (error) {

    return new NextResponse(
      JSON.stringify({
        message: "Invalid or missing product ID",
      }),
      { status: 400 }
    );
  }
};

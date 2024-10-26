import { connectMongoDB } from "@/libs/Models/MongoContect";
import Product from "@/libs/Models/Products";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";

export const GET = async () => {
  try {
    await connectMongoDB();

    const data = await Product.find();

    return new NextResponse(
      JSON.stringify({
        message: "Get Products successfully",
        data: data,
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

    const formData = await request.formData();

    const timestamp = Date.now();

    const image = formData.get("image");

    const imageByteData = await image.arrayBuffer();

    const buffer = Buffer.from(imageByteData);

    const path = `./public/uploads/${timestamp}_${image.name}`;

    await writeFile(path, buffer);

    const imgUrl = `/${timestamp}_${image.name}`;

    let newProduct = new Product({
      name: `${formData.get("name")}`,
      description: `${formData.get("description")}`,
      image: `/uploads${imgUrl}`,
      price: `${formData.get("price")}`,
      brand: `${formData.get("brand")}`,
      category: `${formData.get("category")}`,
    });

    await newProduct.save();

    return new NextResponse(
      JSON.stringify({
        message: "Product created successfully",
        product: newProduct,
        status: 201,
      })
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: "Error in creating product",
        error: error.message,
      })
    );
  }
};

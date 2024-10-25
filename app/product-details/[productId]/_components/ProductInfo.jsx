
"use client"
import React, { useEffect, useState } from "react";
import addToCart from "../../../_Utils/carts";
import { useCart } from "@/app/_Context/CartContext";
import getUsers from "@/app/_Utils/users";
import { useAuth } from "@/app/_Context/AuthContext";
import { useToast } from "@/app/_Context/ToastContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
function ProductInfo({ product }) {
  const { cart, setCart } = useCart();
  const { loginData } = useAuth();
  const { getToast } = useToast();
  const router = useRouter();
  const token = localStorage.getItem("token");

  const handleCart = () => {
    router.push("/login");
    getToast("warning", "Sorry!You must be logged in to add to cart");
  };
  const handleAddToCart = async (id) => {
    const data = {
      userName: loginData?.userName,
      email: loginData?.email,
      productId: id,
    };

    try {
      const res = await addToCart.addToCart(data);
      setCart((oldCart) => [
        ...oldCart,
        {
          id: res.data?.data?._id,
          product: res.data?.data?.product,
        },
      ]);
      getToast("success", res?.data?.message);
    } catch (error) {
      getToast("error", error.response?.data?.message);
    }
  };

  return (
    <div className=" ">
      {product._id ? (
        <>
          <h1 className="font-bold  text-[25px]">{product.name}</h1>

          <h1 className="font-bold  text-lg text-gray-400">
            {product.category}
          </h1>
          <h1 className="font-bold  text-[25px]">{product.brand} Brand</h1>

          <p className="font-bold  text-[15px]">{product.description}</p>
          <h1 className="font-bold  text-[50px] text-blue-500">
            ${product.price}
          </h1>
          <button
            onClick={
              token ? () => handleAddToCart(product._id) : () => handleCart()
            }
            className="bg-primary hover:bg-red-600 rounded-md p-3 w-28 text-white mt-4"
          >
            Add to Cart
          </button>
          <Link
            className="rounded-md shadow-md px-5 py-3 w-28 text-lg mx-7 font-medium text-primary hover:text-red-600"
            href="/explore"
          >
            Back
          </Link>
        </>
      ) : (
        <>
          <div className="bg-slate-400 w-[200px] h-3 rounded-lg my-3"></div>
          <div className="bg-slate-400 w-[100px] h-3 rounded-lg my-3"></div>
          <div className="bg-slate-400 w-[500px] h-5 rounded-lg my-3"></div>
          <div className="bg-slate-400 w-[150px] h-3 rounded-lg my-3"></div>
          <div className="bg-slate-400 w-[100px] h-4 rounded-lg my-3"></div>
          <div className="bg-slate-400 w-[200px] h-3 rounded-lg my-5 p-3"></div>
        </>
      )}
    </div>
  );
}

export default ProductInfo;

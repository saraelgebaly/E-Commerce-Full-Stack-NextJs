"use client";
import React, { useEffect, useState } from "react";
import ProductsDetails from "./_components/ProductsDetails";
import axios from "axios";
import { usePathname } from "next/navigation";
import productApi from "@/app/_Utils/products";

function ProductsInfo({ params }) {
  const [product, setProduct] = useState([]);

  const productId = params?.productId;
  const getProduct = async () => {
    try {
      const res = await productApi.getProductById(productId);
      setProduct(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <ProductsDetails product={product} />
    </>
  );
}

export default ProductsInfo;

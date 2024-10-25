"use client";
import React, { useEffect, useState } from "react";
import ProductBanner from "./ProductBanner";
import ProductInfo from "./ProductInfo";


function ProductsDetails({ product }) {
  
  return (
    <>
      <div className="grid md:grid-cols-2 sm:grid-rows-1 p-3 gap-5 my-10">
        <ProductBanner product={product} />
        <ProductInfo product={product} />
      </div>
      
    </>
  );
}

export default ProductsDetails;

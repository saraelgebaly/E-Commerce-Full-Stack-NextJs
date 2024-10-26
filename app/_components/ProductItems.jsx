import React from "react";
import ProductsCard from "./ProductsCard";
import Link from "next/link";
import productsApi from "../_Utils/products";

async function ProductItems() {
  const getProducts = await productsApi.getProdutsList("/products");
  const data = await getProducts.data.data;

  return (
    <div className="grid md:grid-cols-4 sm:grid-rows-2   gap-5 p-5 ">
      {data?.map((product) => (
        <Link  key={product._id} href={`/product-details/${product._id}`}>
          <ProductsCard key={product._id} product={product} />
        </Link>
      ))}
    </div>
  );
}

export default ProductItems;

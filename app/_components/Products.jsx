import ProductsCard from "./ProductsCard";
import Link from "next/link";
import productsApi from "../_Utils/products"
 async function Products() {
 
  const getProducts = await productsApi.getProdutsList("/products");
  const data= await getProducts.data.data
  return (
    <>
          <h1 className="font-bold px-5 text-lg mt-5">Trending Products</h1>

      <div className=" grid md:grid-cols-4 sm:grid-rows-2 gap-5 p-5 ">
        {data?.map((product) => (
          <Link key={product._id} href={`/product-details/${product._id}`} >
          <ProductsCard product={product}/>
          
          </Link>
            
          
        )).slice(4,12)}
        
      </div>

    </>
  );
}

export default Products;

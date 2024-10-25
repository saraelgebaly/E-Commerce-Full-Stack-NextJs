import React from 'react'

function ProductsCard({product}) {
  return (
    <>
    <div className="group relative block overflow-hidden border  border-gray-100  rounded-lg ">
          <img
            src={product.image}
            alt="product-image"
            className=" h-56 mx-auto  transition duration-500 group-hover:scale-105 "
          />

          <div className="relative border border-gray-100 bg-white p-6">
            <h4 className="mt-4 text-gray-500">{product.category}</h4>
            <h3 className=" text-lg font-medium text-gray-900">
              {product.name}
            </h3>
            <h3 className="mt-1.5 font-bold text-blue-500">${product.price}</h3>
            <div className="mt-4">
              <button className="block w-full rounded bg-primary text-white p-4 text-sm font-medium transition hover:scale-105">
                See Details
              </button>
            </div>
          </div>
        </div>
    </>
  )
}

export default ProductsCard

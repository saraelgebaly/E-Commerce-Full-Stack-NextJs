import React from "react";

function ProductBanner({ product }) {
  return (
    <div>
      {product.image ? (
        <img
          src={product?.image}
          alt="product-image"
          className="mx-auto w-72   "
        />
      ) : (
        <div className="bg-slate-400 w-96 h-64 rounded-lg mx-auto skeleton-banner "></div>
      )}
    </div>
  );
}

export default ProductBanner;

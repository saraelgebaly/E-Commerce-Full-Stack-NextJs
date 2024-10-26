"use client";

import React from "react";
import { useCart } from "../_Context/CartContext";
import cartApi from "../_Utils/carts";
import { Trash } from "lucide-react";
import { useToast } from "../_Context/ToastContext";

function ProductsCart() {
  const { cart } = useCart();
  const { getToast } = useToast();

  const getTotalAmount = () => {
    let totalAmount = 0;
    cart.forEach((item) => {
      totalAmount = totalAmount + Number(item?.product?.price);
    });
    return totalAmount;
  };
  const deleteCart = async (id) => {
    try {
      const res = await cartApi.deleteCart(id);
      getToast("success", res?.data?.message);

      window.location.reload();
    } catch (error) {
      getToast("error", error.response?.data?.message);
    }
  };

  return (
    <>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <header className="text-center">
              <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
                Your Cart
              </h1>
            </header>

            <div className="mt-8">
              {cart?.length > 0 ? (
                cart?.map((item) => (
                  <ul  key={item?.id}>
                    <li className="md:flex items-center  m-10 md:gap-5 ">
                      <img
                        src={item?.product?.image}
                        alt="product-image"
                        className="size-32 rounded"
                      />

                      <div>
                        <h3 className="text-md text-gray-500">
                          {item?.product?.name}
                        </h3>
                        <h3 className="text-md text-gray-500">
                          Price: ${item?.product?.price}
                        </h3>
                      </div>

                      <div className="flex flex-1  items-center justify-center md:justify-end gap-2">
                        <button onClick={() => deleteCart(item?.id)}>
                          <Trash className=" text-primary transition hover:text-red-600" />
                        </button>
                      </div>
                    </li>
                  </ul>
                ))
              ) : (
                <h1 className="text-center text-[30px] text-gray-600 font-bold">
                  Empty Cart!
                </h1>
              )}

           
              <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                <div className="w-screen max-w-lg space-y-4">
                  <dl className="space-y-0.5 text-sm text-gray-700">
                    <div className="flex justify-between !text-base font-medium">
                      <dt>Total</dt>
                      <dd>${getTotalAmount()}</dd>
                    </div>
                  </dl>

                  <div className="flex justify-end">
                    <button className="block rounded bg-primary px-5 py-3 text-sm text-white transition hover:bg-red-600">
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductsCart;

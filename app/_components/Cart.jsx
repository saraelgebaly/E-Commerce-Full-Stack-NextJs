import { X } from "lucide-react";
import Link from "next/link";
import { useCart } from "../_Context/CartContext";

function Cart({ handleCart }) {
  const { cart } = useCart();
  return (
    <>
      <div
        className="h-[300px] w-[250px]
    bg-gray-100 z-10 rounded-md border shadow-sm
    absolute  md:right-1 -right-44 top-12 p-5 overflow-auto"
        aria-modal="true"
        role="dialog"
        tabIndex="-1"
      >
        <button
          onClick={handleCart}
          className="absolute end-4 top-4 text-gray-600 transition hover:scale-110"
        >
          <X />
        </button>
        <div className="mt-4 space-y-6">
          {cart?.length > 0 ? (
            cart?.map((item) => (
              <ul className="space-y-4" key={item?._id}>
                <li className="flex items-center gap-4">
                  <img
                    src={item?.product?.image}
                    alt=""
                    className="size-16 rounded object-cover"
                  />

                  <div>
                    <h3 className="text-sm text-gray-900">
                      {item?.product?.name}
                    </h3>

                    <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                      <div>
                        <dt className="inline">Price: </dt>
                        <dd className="inline">${item?.product?.price}</dd>
                      </div>

                      <div>
                        <dt className="inline">Category: </dt>
                        <dd className="inline">{item?.product?.category}</dd>
                      </div>
                    </dl>
                  </div>
                </li>
              </ul>
            ))
          ) : (
            <h1 className="text-center text-[20px] text-gray-300 font-bold">
              Empty Cart!
            </h1>
          )}

          <div className="space-y-4 text-center">
            <Link
              onClick={handleCart}
              href="/products-cart"
              className="block rounded border bg-primary px-5 py-3 text-sm text-white transition  hover:bg-red-600"
            >
              View My Cart
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;

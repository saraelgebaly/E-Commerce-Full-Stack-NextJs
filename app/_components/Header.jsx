import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import logo from "../../Assets/logo.svg";
import { Menu, ShoppingCart } from "lucide-react";
import { useCart } from "../_Context/CartContext";
import Cart from "./Cart";
import cartApi from "../_Utils/carts";
import { useRouter } from "next/navigation";
import { useAuth } from "../_Context/AuthContext";
import { useToast } from "../_Context/ToastContext";

function Header() {
  const { cart, setCart } = useCart();
  const { loginData } = useAuth();
  

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isRegister, setIsRegister] = useState(false);
  const { getToast } = useToast();

  // const { data, status } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleCart = () => {
    setOpen(!open);
  };
  const email = loginData?.email;

  const getCartByCuurentUser = async () => {
    try {
      const res = await cartApi.getCartByUser(email);
      res?.data?.data?.forEach((item) => {
        setCart((oldCart) => [
          ...oldCart,
          {
            id: item?._id,
            product: item?.product,
          },
        ]);
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loginData && getCartByCuurentUser();
  }, [email]);

  useEffect(() => {
    setIsLoggedIn(window?.location?.pathname === "/login");
    setIsRegister(window?.location?.pathname === "/register");
  }, []);
  const logout = () => {
    // signOut();
    localStorage.removeItem("token");
    getToast("success", "Logout successfully");
    router.push("/");

    window.location.reload();

  };

 


  return (
    !isLoggedIn &&
    !isRegister && (
      <>
        <nav className="bg-white  shadow-md">
          <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 ">
            <div className="flex h-16 items-center justify-between">
              <div className="md:flex md:items-center md:gap-12">
                <Image src={logo} alt="logo" width={50} height={50} />
              </div>

              <div className="hidden md:block">
                <nav aria-label="Global">
                  <ul className="flex items-center gap-6 text-sm">
                    <li>
                      <Link
                        className="text-black transition hover:text-primary font-bold"
                        href="/"
                      >
                        {" "}
                        Home{" "}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="text-black transition hover:text-primary font-bold"
                        href="/explore"
                      >
                        {" "}
                        Explore{" "}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="text-black transition hover:text-primary font-bold"
                        href="#"
                      >
                        {" "}
                        About US{" "}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="text-black transition hover:text-primary font-bold"
                        href="#"
                      >
                        {" "}
                        Contact US{" "}
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>

              <div className="flex items-center gap-6">
                {loginData && (
                  <>
                    <div className=" flex gap-1 relative cursor-pointer transition hover:text-green-700 ">
                      <ShoppingCart onClick={handleCart} />
                      <h1 className="text-green-400 ">{cart?.length}</h1>
                      {open && <Cart handleCart={handleCart} />}
                    </div>

                    <div className="sm:flex sm:gap-4">
                      <button
                        onClick={logout}
                        className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white shadow"
                      >
                        Logout
                      </button>
                    </div>
                  </>
                )}
                {!loginData && (
                  <div className="sm:flex sm:gap-4">
                    <a
                      className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white shadow"
                      href="/login"
                    >
                      Login
                    </a>

                    <div className="hidden sm:flex">
                      <a
                        className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-primary"
                        href="/register"
                      >
                        Register
                      </a>
                    </div>
                  </div>
                )}

                <div className="block md:hidden">
                  <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                    <Menu />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </>
    )
  );
}

export default Header;

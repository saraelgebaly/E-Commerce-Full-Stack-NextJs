"use client";
import { useAuth } from "@/app/_Context/AuthContext";
import React, { useEffect, useState } from "react";
import authImage from "../../../Assets/shopping-3253839_1280.jpg";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../Assets/logo.svg";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import userApi from "../../_Utils/users";
import { useToast } from "@/app/_Context/ToastContext";
function Login() {
  const { getUserData, loginData } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { getToast } = useToast(); 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
          setLoading(true);

    try {
      const res = await userApi.login(data);
      
      getToast("success", res?.data?.message);
      router.push("/");
      setLoading(false);

      localStorage.setItem("token", res.data?.token);
      getUserData();

    } catch (error) {
      setLoading(false);

      console.log(error);
      getToast("error", error.response?.data?.message);
    }
  
  };
  

  return (
    <>
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <div className=" vh-100  hidden md:flex   lg:col-span-6">
          <Image
            alt="auth-Image"
            src={authImage}
            className="  w-full h-full  opacity-80"
            width={0}
            height={0}
          />
        </div>

        <div className="  bg-gray-200 flex justify-center items-center px-8 py-8 sm:px-12 lg:col-span-6">
          <div className=" w-full ">
            <div className=" text-center w-full">
              <Image
                src={logo}
                alt="logo"
                width={0}
                height={0}
                className="mx-auto"
              />
              <h1 className="md:text-[35px] text-[25px] font-bold  text-teal-600 font-mono">
                Welcome To E-Store
              </h1>
              <h3 className="md:text-[20px] text-[17px]  text-teal-600 font-mono">
                {" "}
                Login And Enjoy Shopping!
              </h3>
            </div>
            <form
              className="mt-8 grid grid-cols-6 gap-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="col-span-6">
                <label
                  htmlFor="Email"
                  className="block text-sm font-medium text-gray-700"
                >
                  {" "}
                  Email{" "}
                </label>

                <input
                  type="email"
                  id="Email"
                  name="email"
                  className="mt-1 w-full rounded-md p-2 bg-transparent text-sm text-gray-700 shadow-sm shadow-gray-700"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email",
                    },
                  })}
                />

                {errors.email && (
                  <p className="text-red-700 font-semibold">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="col-span-6">
                <label
                  htmlFor="Password"
                  className="block text-sm font-medium text-gray-700"
                >
                  {" "}
                  Password{" "}
                </label>

                <input
                  type="password"
                  id="Password"
                  name="password"
                  className="mt-1 w-full rounded-md p-2  bg-transparent text-sm text-gray-700 shadow-sm shadow-gray-700"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {errors.password && (
                  <p className="text-red-700 font-semibold">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="col-span-6 justify-center sm:flex sm:items-center sm:gap-4">
                <button
                  type="submit"
                  disabled={loading ? true : false}
                  className="inline-block  shrink-0 rounded-md border  bg-teal-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-teal-700"
                >
                  {loading ? "logging in..." : "Login"}
                </button>

                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  Create an account?
                  <Link   href="/register" className="text-teal-600 underline">
                    Register
                  </Link>
                  .
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;

import Image from "next/image";
import React from "react";
import BannerImg from "../../Assets/71lnjn3Kn-L._AC_SX679_.jpg";
import Link from "next/link";
function Banner() {
  return (
    <>
      <section className="relative bg-image  bg-no-repeat">
        <div className="absolute inset-0  bg-gray-500/25 sm:from-gray-900/95 sm:to-gray-900/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

        <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
          <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
            <h1 className="text-3xl font-normal">Sale 20% off all store</h1>

            <strong className="mt-4 text-3xl font-extrabold  sm:text-5xl">
              Smartphone BLU G91 Pro 2023
            </strong>
            <Link
              href="/explore"
              className=" block w-[150px] p-2 mx-auto rounded-md mt-3 bg-primary hover:bg-red-600 text-white text-xl font-extrabold"
            >
              {" "}
              Shop Now{" "}
            </Link>
          </div>
        </div>
      </section>
      {/* <div className="flex justify-aroundy bg-gray-500 bg border-2 p-5 ">
        <div className="h-96 w-[50%]">
          <Image className="w-full" src={BannerImg} alt="banner-img" width={500} height={300} />
        </div>

        <div className=" h-96 w-[50%]" >
          <h4>Sale 20% off all store</h4>
          <h1>Samsung Galaxy Z Fold6</h1>
          <Link href="/explore">Shop Now</Link>
        </div>
      </div> */}
    </>
  );
}

export default Banner;

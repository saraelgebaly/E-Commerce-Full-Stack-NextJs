import React from 'react'

function Hero() {
  return (
    <section >
  <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex ">
    <div className="mx-auto max-w-xl text-center">
      <h1 className="text-3xl font-extrabold sm:text-5xl">
        New Online Store.
        <strong className="font-extrabold text-primary sm:block"> Shop Now! </strong>
      </h1>

      <p className="mt-4 sm:text-xl/relaxed">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo tenetur fuga ducimus
        numquam ea!
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <a
          className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
          href="#"
        >
          Get Started
        </a>

        <a
          className="block w-full rounded px-12 py-3 text-sm font-medium text-primary shadow hover:text-red-700 focus:outline-none focus:ring active:text-red-500 sm:w-auto"
          href="#"
        >
          Learn More
        </a>
      </div>
    </div>
  </div>
</section>
  )
}

export default Hero
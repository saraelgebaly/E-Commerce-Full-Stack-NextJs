"use client";

import localFont from "next/font/local";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for toastify

import Header from "./_components/Header";
import Footer from "./_components/Footer";
import CartContextProvider from "./_Context/CartContext";
import AuthContextProvider from "./_Context/AuthContext";
import { SessionProvider } from "next-auth/react";
import ToastContextProvider from "./_Context/ToastContext";
import { ToastContainer } from "react-toastify";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
            <ToastContextProvider>
              <AuthContextProvider>
                <CartContextProvider>
                  <Header />
                  {children}
                  <Footer />
                  <ToastContainer />
                </CartContextProvider>
              </AuthContextProvider>
            </ToastContextProvider>
        </body>
      </html>
    </>
  );
}

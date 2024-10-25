import React, { createContext, useContext } from "react";
import { Bounce, toast } from "react-toastify";





const ToastContext = createContext("");



export const useToast = () => {
  return useContext(ToastContext);
};

export default function ToastContextProvider({
  children,
}) {
  const getToast =(type, message) => {
    return toast[type](message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };
  return (
    <ToastContext.Provider value={{ getToast }}>
      {children}
    </ToastContext.Provider>
  );
}

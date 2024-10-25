"use client"

import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};
export default function AuthContextProvider(props) {
  const [loginData, setLoginData] = useState(null);
  // const {data} = useSession()

  const getUserData = () => {
    const encodedToken= localStorage.getItem("token");
    const decodedToken = jwtDecode(encodedToken);
    setLoginData(decodedToken);

  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUserData();
    }
  }, []);
   


 

  return (
    <AuthContext.Provider value={{ getUserData, loginData,setLoginData}}>
      {props.children}
    </AuthContext.Provider>
  );
}

import { createContext, useContext, } from "react";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";


export const AuthContext = createContext(null);



export default function AuthContextProvider({ children }) {
  const [loginData, setLoginData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const savaLoginData = () => {
    const token = localStorage.getItem("token");
      if (!token) {
      setLoginData(null);
      setIsAuthenticated(false);
      return;
    }

    try {
      const decoded= jwtDecode(token); 
      setLoginData(decoded);
      setIsAuthenticated(true);
     console.log("decoded token => ", decoded);

    } catch (error) {
      console.error("Invalid token!", error);
      setLoginData(null);
      setIsAuthenticated(false);
    }

  
  };

  useEffect(() => {
    savaLoginData();
  }, []);

  return (
    <AuthContext.Provider
      value={{ loginData, savaLoginData, isAuthenticated, setIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
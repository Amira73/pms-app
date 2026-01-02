import { createContext, useContext, type PropsWithChildren } from "react";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext<any>(null);



export default function AuthContextProvider({ children }: PropsWithChildren) {
  const [loginData, setLoginData] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const savaLoginData = () => {
    const token = localStorage.getItem("accessToken");
      if (!token) {
      setLoginData(null);
      setIsAuthenticated(false);
      return;
    }

    try {
      const decoded: any = jwtDecode(token); 
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
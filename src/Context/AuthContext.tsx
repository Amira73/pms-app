import { createContext, useContext, type PropsWithChildren } from "react";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import type { AuthContextType, DecodedTokenPayload } from "../Services/AuthContextType";

export const AuthContext = createContext<AuthContextType | null>(null);



export default function AuthContextProvider({ children }: PropsWithChildren) {
  const [loginData, setLoginData] = useState<DecodedTokenPayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const saveLoginData = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setLoginData(null);
      setIsLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode<DecodedTokenPayload>(token);
      setLoginData(decoded);
    } catch {
      setLoginData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const logOutUser = () => {
    localStorage.removeItem("token");
    setLoginData(null);
  };

  useEffect(() => {
    saveLoginData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loginData,
        setLoginData,
        saveLoginData,
        isLoading,
        fullUserData: null,
        setFullUserData: () => {},
        getCurrentUser: async () => {},
        logOutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  return useContext(AuthContext);
}
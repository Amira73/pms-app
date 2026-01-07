import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import { jwtDecode } from "jwt-decode";
import type {
  AuthContextType,
  DecodedTokenPayload,
} from "../Services/AuthContextType";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthContextProvider({
  children,
}: PropsWithChildren) {
  const [loginData, setLoginData] =
    useState<DecodedTokenPayload | null>(null);
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
    localStorage.removeItem("accessToken");
    setLoginData(null);
  };

  useEffect(() => {
    saveLoginData();
  }, []);

  const value: AuthContextType = {
    loginData,
    isAuthenticated: Boolean(loginData),
    isLoading,
    saveLoginData,
    setLoginData,
    logOutUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthContextProvider");
  }
  return context;
}

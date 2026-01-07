export interface DecodedTokenPayload {
  id: string;
  email: string;
  exp: number;
  iat: number;
}

export interface AuthContextType {
  loginData: DecodedTokenPayload | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  saveLoginData: () => Promise<void>;
  setLoginData: React.Dispatch<
    React.SetStateAction<DecodedTokenPayload | null>
  >;
  logOutUser: () => void;
}

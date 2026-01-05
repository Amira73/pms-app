import type { Dispatch, SetStateAction } from "react";

export interface AuthContextType {
  loginData: DecodedTokenPayload | null;
  setLoginData: React.Dispatch<
    React.SetStateAction<DecodedTokenPayload | null>
  >;
  saveLoginData: () => Promise<void>;
  isLoading: boolean;
  fullUserData: FullUserDataType | null;
  setFullUserData: React.Dispatch<
    React.SetStateAction<FullUserDataType | null>
  >;
  getCurrentUser: () => Promise<void>;
  logOutUser: () => void;
}

export interface ModeContextType {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
}

export interface DecodedTokenPayload {
  exp: number; // Expiration time (Unix timestamp)
  iat: number; // Issued at time (Unix timestamp)
  roles: string[]; // Array of user roles/permissions
  userEmail: string; // User's email
  userGroup: string; // User group (e.g., "Employee")
  userId: number; // Unique user ID
  userName: string; // Username
}

// Auth Context interfaces

export type FullUserDataType = {
  id: number;
  userName: string;
  email: string;
  phoneNumber: string;
  country: string;
  imagePath: string | null;
  isActivated: boolean;
  isVerified: boolean;
  creationDate: string;
  modificationDate: string;
  group: {
    name: string;
    id: number;
  };
};

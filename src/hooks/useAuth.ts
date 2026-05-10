import { useContext } from "react";
import { AuthContext, type AuthContextType } from "../context/AuthContext";

export const useAuth = () => {
  const context = useContext<AuthContextType>(AuthContext);
  return context;
};

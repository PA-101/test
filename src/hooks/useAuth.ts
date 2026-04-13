import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export const useAuth = () => {
  const token = localStorage.getItem("token");

  return {
    isAuthenticated: !!token,
    logout: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  };
};
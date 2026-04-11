import React, { createContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: { name: string; email: string; password: string }) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isAuthenticated: false,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("lr_token");
    const savedUser = localStorage.getItem("lr_user");
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    if (!email || !password) throw new Error("All fields required");
    const mockUser = { id: "1", name: "Demo User", email };
    const mockToken = "mock-jwt-token-" + Date.now();
    setUser(mockUser);
    setToken(mockToken);
    localStorage.setItem("lr_token", mockToken);
    localStorage.setItem("lr_user", JSON.stringify(mockUser));
    setLoading(false);
  };

  const signup = async (data: { name: string; email: string; password: string }) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    if (!data.name || !data.email || !data.password) throw new Error("All fields required");
    const mockUser = { id: "1", name: data.name, email: data.email };
    const mockToken = "mock-jwt-token-" + Date.now();
    setUser(mockUser);
    setToken(mockToken);
    localStorage.setItem("lr_token", mockToken);
    localStorage.setItem("lr_user", JSON.stringify(mockUser));
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("lr_token");
    localStorage.removeItem("lr_user");
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

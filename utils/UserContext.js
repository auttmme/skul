import React, { createContext, useEffect, useMemo, useState } from "react";

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(() => {
    if (typeof window !== "undefined") {
      const userData = JSON.parse(localStorage.getItem("user"));
      return userData || null;
    }
    return null;
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser(userData);
    }
  }, [setUser]);

  const handleLogin = (username) => {
    setUser(username);
    localStorage.setItem("user", JSON.stringify(username));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const value = useMemo(
    () => ({
      user,
      login: handleLogin,
      logout: handleLogout,
    }),
    [user, handleLogin, handleLogout]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

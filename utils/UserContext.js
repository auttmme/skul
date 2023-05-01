import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser(userData);
    }
  }, []);

  const handleLogin = (username) => {
    setUser(username);
    localStorage.setItem("user", username);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = {
    user,
    login: handleLogin,
    logout: handleLogout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

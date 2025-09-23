"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
const LoginContext = createContext();

export function LoginProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(null);
  const router = useRouter();
  
  // Loading initial login state from localStorage
  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("loginSession"));
    setLoggedIn(session);
  }, []);

  // Login function
  function login(session) {
    localStorage.setItem("loginSession", JSON.stringify(session));
    setLoggedIn(session);
  }

  // Logout function
  function logout() {
    localStorage.removeItem("loginSession");
    setLoggedIn(null);
    router.push("/");
  }

  return (
    <LoginContext.Provider value={{ loggedIn, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
}

// Custom hook for easy access
export function useLogin() {
  return useContext(LoginContext);
}

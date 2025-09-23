"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// checking localStorage for session
export default function ProtectedClient({ children }) {
  const router = useRouter();

  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem("loginSession"));
      if (!s || !s.token) {
        router.replace("/");
      }
    } catch {
      router.replace("/");
    }
  }, [router]);

  return children;
}

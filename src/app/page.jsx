"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useLogin } from "../app/context/LoginContext.jsx";

export default function LoginPage() {
  const router = useRouter();
  const { loggedIn, login } = useLogin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // redirect if already logged in
    if (loggedIn && loggedIn.token) {
      router.replace("/dashboard");
    }
  }, [loggedIn, router]);

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Please enter username and password.");
      return;
    }

    // Creating session object
    const session = {
      username: username.trim(),
      token: uuidv4(),
    };

    // Updating context and localStorage
    login(session);

    router.push("/dashboard");
  }

  if (!mounted) return null; 

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-50 to-sky-100 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-gray-900 shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-2">
          Welcome to
          <span className="text-sky-600 dark:text-sky-400">Music</span>
        </h1>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-6">
          Mock login — use any username & password
        </p>

        {mounted && (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Username
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                placeholder="Enter your password"
              />
            </div>

            {error && (
              <div className="text-sm text-red-600 dark:text-red-400">
                {error}
              </div>
            )}

            <div className="w-full">
              <button
                type="submit"
                className="w-full px-6 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg shadow transition-colors hover:cursor-pointer"
              >
                Login
              </button>
            </div>

            <button
              type="button"
              className="text-sm text-gray-600 dark:text-gray-400 hover:underline"
              onClick={() => {
                setUsername("demo");
                setPassword("demo");
              }}
            >
              Autofill demo
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

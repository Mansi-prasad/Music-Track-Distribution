"use client";

import Link from "next/link";
import { useLogin } from "../app/context/LoginContext.jsx";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const { loggedIn, logout } = useLogin();

  return (
    <header className="border-b border-gray-200 dark:border-gray-700">
      <div className="app-container flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-xl font-semibold">
            MMusic
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {loggedIn ? (
            <>
              <nav className="hidden sm:flex gap-3">
                <Link
                  href="/dashboard"
                  className="px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Dashboard
                </Link>
                <Link
                  href="/upload"
                  className="px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Upload
                </Link>
              </nav>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Hi, {loggedIn.username}
                </span>
                <button
                  onClick={logout}
                  className="px-3 py-2 text-sm bg-red-100 dark:bg-red-800 rounded text-red-700 dark:text-red-200"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <Link
              href="/"
              className="px-3 py-2 rounded bg-blue-600 text-white text-sm"
            >
              Login
            </Link>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { useLogin } from "../app/context/LoginContext.jsx";
import ThemeToggle from "./ThemeToggle";
import { MdLogout, MdOutlineLogin, MdMenu } from "react-icons/md";

export default function Header() {
  const { loggedIn, logout } = useLogin();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b border-gray-200 dark:border-gray-700">
      <div className="app-container flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-2xl font-semibold text-purple-700 dark:text-purple-400"
          >
            Music Track
          </Link>
        </div>

        {/* for desktop */}
        <nav className="hidden sm:flex items-center gap-3">
          {loggedIn ? (
            <>
              <Link
                href="/dashboard"
                className="px-3 py-2 text-lg rounded text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Dashboard
              </Link>
              <Link
                href="/upload"
                className="px-3 py-2 text-lg rounded text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Upload
              </Link>
              <button
                onClick={logout}
                className="flex gap-2 items-center px-3 py-2 text-md rounded bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
              >
                Logout
                <MdLogout />
              </button>
            </>
          ) : (
            <Link
              href="/"
              className="flex gap-1 items-center px-6 py-2 font-semibold rounded bg-purple-600 text-white text-md hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600"
            >
              Login
              <MdOutlineLogin />
            </Link>
          )}
        </nav>

        {/* for mobile  */}
        <div className="sm:hidden relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <MdMenu size={28} />
          </button>

          {/* Dropdown Menu */}
          {menuOpen && (
            <>
              {loggedIn ? (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg z-50">
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/upload"
                    className="block px-4 py-2 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setMenuOpen(false)}
                  >
                    Upload
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                  >
                    Logout <MdLogout />
                  </button>
                </div>
              ) : (
                <></>
              )}
            </>
          )}
        </div>

        {/* Theme Toggle */}
        <div className="hidden sm:flex ml-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

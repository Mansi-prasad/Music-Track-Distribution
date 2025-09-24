import "../styles/globals.css";
import Header from "@/components/Header";
import { LoginProvider } from "./context/LoginContext";
export const metadata = {
  title: "Label Lift - Music Dashboard",
  description: "Mini Music Distribution Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LoginProvider>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <Header />
            <main className="app-container py-8">{children}</main>
          </div>
        </LoginProvider>
      </body>
    </html>
  );
}

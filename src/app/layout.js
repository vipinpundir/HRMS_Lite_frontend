import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "HRMS Lite - Human Resource Management System",
  description: "A lightweight HR management system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex items-center">
                  <h1 className="text-xl font-bold text-gray-800">HRMS Lite</h1>
                </div>
                <div className="flex items-center space-x-4">
                  <a href="/" className="text-gray-700 hover:text-gray-900">
                    Dashboard
                  </a>
                  <a
                    href="/employees"
                    className="text-gray-700 hover:text-gray-900"
                  >
                    Employees
                  </a>
                  <a
                    href="/attendance"
                    className="text-gray-700 hover:text-gray-900"
                  >
                    Attendance
                  </a>
                </div>
              </div>
            </div>
          </nav>
          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
        <ToastContainer position="bottom-right" />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CartSidebar from "@/components/CartSidebar";
import AuthSuccessHandler from "@/components/AuthSuccessHandler";
import { ReduxProvider } from "@/redux/provider";
import { AuthProvider } from "@/providers/AuthProvider";
import { ToastProvider } from "@/providers/ToastProvider";


export const metadata: Metadata = {
  title: "Dabbzo - Digital Tiffin Service",
  description: "Order homemade tiffin meals from local vendors",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <ToastProvider>
          <AuthProvider>
            <ReduxProvider>
              <AuthSuccessHandler />
              <Navbar />
              <main className="container-custom py-8">{children}</main>
              <CartSidebar />
              <footer className="bg-gray-100 py-6 mt-12">
                <div className="container-custom text-center text-gray-600">
                  <p>© 2024 Dabbzo. All rights reserved.</p>
                </div>
              </footer>
            </ReduxProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}

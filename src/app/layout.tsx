import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CartSidebar from "@/components/CartSidebar";
import { ReduxProvider } from "@/redux/provider";
import { AuthProvider } from "@/providers/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <AuthProvider>
          <ReduxProvider>
            <Navbar />
            <main className="container-custom py-8">{children}</main>
            <CartSidebar />
            <footer className="bg-gray-100 py-6 mt-12">
              <div className="container-custom text-center text-gray-600">
                <p>© {new Date().getFullYear()} Dabbzo. All rights reserved.</p>
              </div>
            </footer>
          </ReduxProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

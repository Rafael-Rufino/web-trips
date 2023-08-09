import { NextAuthProvider } from "@/providers/auth";

import "./globals.css";

import { Poppins } from "next/font/google";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ToastProvider from "@/providers/toast";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "FSw Trips",
  description: "Sistema de Reserva de viagens da FSW",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={poppins.className}>
        <NextAuthProvider>
          <ToastProvider>
            <Header />
            {children}
            <Footer />
          </ToastProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}

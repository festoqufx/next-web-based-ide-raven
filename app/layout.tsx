import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner';
import React, { ReactNode } from 'react';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NEXT IDE",
  description: "A polished monochrome playground for HTML, CSS, and JavaScript.",
  icons: {
    icon: "/logo.png"
  },
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1.0,
};

interface RootLayoutProps {
  children: ReactNode;
}
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
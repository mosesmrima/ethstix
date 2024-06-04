"use client"
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import {NextUIProvider} from '@nextui-org/react';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  return (
      <html lang="en">
      <body className={`${inter.className} dark`}>
      <SessionProvider>
          <NextUIProvider className={"min-h-screen"}>
              {children}
          </NextUIProvider>
      </SessionProvider>
      </body>
      </html>
  );
}

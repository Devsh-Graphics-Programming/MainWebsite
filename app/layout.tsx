import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "@/app/components/Navbar"
import Navbar from "./components/Navbar";

// src: './fonts/futuraPT/FuturaCyrillicMedium.woff2'

const futuraPT = localFont({
  src: [
    {
      path: './fonts/futuraPT/FuturaCyrillicMedium.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: './fonts/futuraPT/FuturaCyrillicLight.woff2',
      weight: '100',
      style: 'thin'
    },
    {
      path: './fonts/futuraPT/FuturaCyrillicBook.woff2',
      weight: '300',
      style: 'normal'
    }
  ]
})

export const metadata: Metadata = {
  title: "DevSH Graphics Programming Sp. Z.O.O",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${futuraPT.className} antialiased flex flex-col h-dvh`}
      >
        <Navbar/>
        <main className="h-full overflow-y-auto overflow-x-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}

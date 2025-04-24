import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "@/app/components/Navbar"
import Navbar from "./components/Navbar";

const futuraPT = localFont({
  src: [
    {
      path: './fonts/FuturaPT/FuturaCyrillicMedium.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: './fonts/FuturaPT/FuturaCyrillicLight.woff2',
      weight: '100',
      style: 'thin'
    },
    {
      path: './fonts/FuturaPT/FuturaCyrillicBook.woff2',
      weight: '300',
      style: 'normal'
    }
  ]
})

export const metadata: Metadata = {
  title: "DevSH Graphics Programming",
  description: "The website of DevSH Graphics Programming",
  metadataBase: new URL("https://www.devsh.eu"),
  openGraph: {
    type: "website",
    title: "DevSH Graphics Programming",
    description: "The website of DevSH Graphics Programming",
    siteName: "DevSH Graphics Programming"
  }
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
        <main className="h-full overflow-x-hidden overflow-y-auto my-8">
          {children}
        </main>
      </body>
    </html>
  );
}

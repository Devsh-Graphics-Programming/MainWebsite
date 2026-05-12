import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

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
    },
    {
      path: './fonts/FuturaPT/FuturaCyrillicDemi.woff2',
      weight: '600',
      style: 'normal'
    },
    {
      path: './fonts/FuturaPT/FuturaCyrillicBold.woff2',
      weight: '700',
      style: 'normal'
    },
    {
      path: './fonts/FuturaPT/FuturaCyrillicExtraBold.woff2',
      weight: '800',
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
  initialScale: 1
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${futuraPT.className} antialiased min-h-dvh bg-black text-white`}
      >
        <Navbar/>
        <div className="min-h-dvh overflow-x-clip">
          {children}
        </div>
        <Footer/>
      </body>
    </html>
  );
}

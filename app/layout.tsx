import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const siteDescription =
  "DevSH is a specialized graphics engineering consultancy for GPU architecture, rendering, Vulkan, and high-performance compute.";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.devsh.eu/#organization",
      name: "DevSH Graphics Programming",
      alternateName: "DevSH",
      legalName: "DevSH Graphics Programming Sp. z o.o.",
      url: "https://www.devsh.eu/",
      logo: "https://www.devsh.eu/icon.png",
      sameAs: [
        "https://github.com/Devsh-Graphics-Programming",
        "https://www.linkedin.com/company/devsh-graphics-programming/",
        "https://x.com/devsh_gfx_prog"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://www.devsh.eu/#website",
      name: "DevSH",
      alternateName: "DevSH Graphics Programming",
      url: "https://www.devsh.eu/",
      publisher: {
        "@id": "https://www.devsh.eu/#organization"
      }
    }
  ]
};

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
  description: siteDescription,
  applicationName: "DevSH",
  metadataBase: new URL("https://www.devsh.eu"),
  openGraph: {
    type: "website",
    title: "DevSH Graphics Programming",
    description: siteDescription,
    url: "https://www.devsh.eu/",
    siteName: "DevSH Graphics Programming"
  },
  twitter: {
    card: "summary_large_image",
    title: "DevSH Graphics Programming",
    description: siteDescription
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${futuraPT.className} flex min-h-dvh flex-col bg-black text-white antialiased`}
      >
        <Navbar/>
        <div className="overflow-x-clip">
          {children}
        </div>
        <Footer/>
      </body>
    </html>
  );
}

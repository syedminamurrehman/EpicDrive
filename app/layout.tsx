import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import BackgroundEffects from "@/components/BackgroundEffects";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://epicdrive.vercel.app"),
  title: {
    default: "Epic Drive | Premium Car Rental Service in Karachi",
    template: "%s | Epic Drive Karachi"
  },
  description: "Experience world-class car rental in Karachi with Epic Drive. We offer a premium fleet of verified luxury sedans, SUVs, and electric vehicles with transparent pricing. The most trusted rent-a-car service from DHA to Bahria Town.",
  keywords: [
    "car rental karachi",
    "rent a car karachi",
    "luxury car rental pakistan",
    "epic drive karachi",
    "hourly car rental karachi",
    "monthly car rental karachi",
    "verified cars karachi",
    "rent a car DHA karachi",
    "rent a car Gulshan-e-Iqbal",
    "rent a car Clifton",
    "self drive car rental karachi",
    "best rent a car karachi",
    "cheap rent a car karachi",
    "suv rental karachi",
    "premium car lease karachi"
  ],
  authors: [{ name: "ZEX Softwares" }],
  creator: "ZEX Softwares",
  publisher: "ZEX Softwares",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  openGraph: {
    title: "Epic Drive - Premium Rent a Car Karachi",
    description: "Drive your dream across Karachi with our premium fleet. Rent luxury cars, SUVs, and EVs with 100% transparency.",
    url: "https://epicdrive.vercel.app",
    siteName: "Epic Drive Karachi",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Epic Drive Premium Car Rental Karachi Logo",
      },
      {
        url: "/1.jpg",
        width: 1200,
        height: 630,
        alt: "Epic Drive Premium Fleet",
      }
    ],
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Epic Drive | Premium Car Rental Karachi",
    description: "The most trusted car rental platform in Karachi. Verified cars, 24/7 support. Book your luxury ride today.",
    images: ["/logo.png"],
    creator: "@syedminamurrehman",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://epicdrive.vercel.app",
  },
  category: "Car Rental Service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <BackgroundEffects />
        {children}
        <WhatsAppFloat />
      </body>
    </html>
  );
}

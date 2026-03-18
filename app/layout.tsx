import { Analytics } from '@vercel/analytics/react'

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://justsaynoai.com"),

  title: "Just Say No AI – Funny AI Refusal Generator",

  description:
    "Generate funny, awkward, and polite replies with AI. Perfect for rejecting requests with humor.",

  keywords: [
    "AI reply generator",
    "how to say no politely",
    "funny rejection messages",
    "AI humor tool",
    "awkward replies AI"
  ],

  icons: {
    icon: "/favicon.png",
  },

  openGraph: {
    title: "Just Say No AI",
    description: "AI generates funny and awkward rejection replies.",
    url: "https://justsaynoai.com",
    siteName: "SayNo AI",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
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
        {children}
        <Analytics />
      </body>
    </html>
  );
}

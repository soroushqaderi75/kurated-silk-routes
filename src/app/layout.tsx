import type { Metadata } from "next";

import {
  Amiri,
  Cormorant_Garamond,
  Vazirmatn,
} from "next/font/google";

import Navbar from "@/components/layout/Navbar";

import "./globals.css";

const fashionFont = Cormorant_Garamond({
  variable: "--font-fashion",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const persianFont = Vazirmatn({
  variable: "--font-persian",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
});

const miwaniFont = Amiri({
  variable: "--font-miwani",
  subsets: ["arabic"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "MIWANI | Fashion is an invitation",
    template: "%s | MIWANI",
  },

  description:
    "فروشگاه اینترنتی پوشاک نو، استوک و دست‌دوم منتخب از برندهای معتبر با قیمت مناسب.",

  keywords: [
    "MIWANI",
    "پوشاک برند",
    "لباس استوک",
    "لباس نو",
    "لباس دست دوم",
    "پوشاک زنانه",
    "پوشاک مردانه",
    "فروشگاه لباس",
  ],

  authors: [
    {
      name: "MIWANI",
    },
  ],

  creator: "MIWANI",
  publisher: "MIWANI",

  metadataBase: new URL("https://miwani.ir"),

  openGraph: {
    title: "MIWANI | Fashion is an invitation",
    description:
      "مجموعه‌ای منتخب از پوشاک نو، استوک و دست‌دوم از برندهای معتبر با قیمت مناسب.",
    url: "https://miwani.ir",
    siteName: "MIWANI",
    locale: "fa_IR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "MIWANI | Fashion is an invitation",
    description:
      "مجموعه‌ای منتخب از پوشاک نو، استوک و دست‌دوم از برندهای معتبر با قیمت مناسب.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      suppressHydrationWarning
      className={`
        ${fashionFont.variable}
        ${persianFont.variable}
        ${miwaniFont.variable}
        antialiased
      `}
    >
      <body
        className="
          flex
          min-h-screen
          flex-col
          bg-white
          font-[var(--font-persian)]
          text-black
        "
      >
        <Navbar />

        <div className="flex min-h-0 flex-1 flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
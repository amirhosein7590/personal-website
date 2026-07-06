import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local"

const Estedad = localFont({
  src: [
    { path: "/fonts/Estedad-Regular.woff2", style: "normal", weight: "400" },
    { path: "/fonts/Estedad-ExtraBold.woff2", style: "normal", weight: "700" }
  ],
  display: "swap",
  variable: "--font-estedad"
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${Estedad.className}`}
    >
      <body className="">{children}</body>
    </html>
  );
}

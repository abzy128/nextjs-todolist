import type { Metadata } from "next";
import "./style.css"
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["cyrillic-ext"] });

export const metadata: Metadata = {
  title: "nextjs-todolist",
  description: "Todo list app built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
  );
}

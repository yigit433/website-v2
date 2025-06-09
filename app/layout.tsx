import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from 'next-themes'

import Navbar from "@/components/Navigation/Navbar";

export const metadata: Metadata = {
  title: "Yigit433 Portfolio",
  description: "Hayallerimi kodla anlatan portfolyo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main className="pt-20">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
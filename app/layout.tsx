import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yigit433 Portfolio",
  description: "Hayallerimi kodla anlatan portfolyo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

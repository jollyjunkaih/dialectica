import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dialectica - Infinite Knowledge CMS",
  description:
    "An infinite recursive knowledge management system with 3D bookshelf navigation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">{children}</body>
    </html>
  );
}

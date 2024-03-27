import HeaderLogado from "@/components/HeaderLogado";
import type { Metadata } from "next";
import "../globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: "Nextjs",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen">
        <HeaderLogado />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}

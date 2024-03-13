import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

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
        <div className=" flex flex-row justify-between w-[90%] m-auto">
          <h1>Bem vindo ao sistema</h1>
          <nav className="w-[40%]">
            <ul className="flex flex-row justify-between">
              <li>
                <Link href="./">Home</Link>
              </li>
              <li>
                <Link href="./clientes">Clientes</Link>
              </li>
              <li>
                <Link href="./login">Login</Link>
              </li>
            </ul>
          </nav>
        </div>
        <hr className="" />
        {children}
      </body>
    </html>
  );
}

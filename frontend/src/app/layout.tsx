import { IBM_Plex_Sans } from "next/font/google";
import { ReactNode } from "react";
import { Metadata } from "next";
import "./normalize.css";
import "./globals.css";
import Header from "@/components/Header/Header";
import Login from "@/components/Login/Login";

const IBM = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Quickbet Movies",
  description:
    "The QuickbetMovies project is a movies API that provides a wide range of movies and TV shows for users to enjoy.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>): JSX.Element {
  return (
    <html lang="en">
      <body className={IBM.className}>
        <Header />
        {children}
        <Login />
      </body>
    </html>
  );
}

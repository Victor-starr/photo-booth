import type { Metadata } from "next";
import { Cherry_Bomb_One } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const cherryBombOne = Cherry_Bomb_One({
  subsets: ["latin"],
  weight: "400",
  style: "normal",
  variable: "--font-cherry-bomb-one",
});

const Genty = localFont({
  src: [{ path: "../../public/fonts/GentyDemo-Regular.ttf" }],
  display: "swap",
  variable: "--font-genty",
});

export const metadata: Metadata = {
  title: "Photo Booth",
  description:
    "Snap photos with friends and family no matter where they are. Choose your own background, frame, and style.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cherryBombOne.variable} ${Genty.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}

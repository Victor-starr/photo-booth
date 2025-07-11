import type { Metadata } from "next";
import { Cherry_Bomb_One } from "next/font/google";
import localFont from "next/font/local";
import DeviceIndicator from "../components/DeviceIndicator";
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
  const DEVMODE = process.env.NEXT_PUBLIC_DEVMODE === "true";
  return (
    <html lang="en" className={`${cherryBombOne.variable} ${Genty.variable}`}>
      <body className="flex flex-col m-0 p-0 antialiased">
        {DEVMODE && <DeviceIndicator />}
        {children}
      </body>
    </html>
  );
}

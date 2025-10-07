import { Outfit, Geist } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const fontVariables = `${outfit.variable} ${geist.variable}`;

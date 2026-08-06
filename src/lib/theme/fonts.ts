import { Inter, Playfair_Display, Sora } from "next/font/google";

// Body font shared by both pairings.
export const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// Heading fonts, one per pairing offered in the theme panel.
export const sora = Sora({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-sora" });
export const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-playfair",
});

export const blockFontVariables = `${inter.variable} ${sora.variable} ${playfair.variable}`;

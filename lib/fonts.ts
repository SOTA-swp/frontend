import { Geist_Mono, Zen_Kaku_Gothic_New } from "next/font/google";

const zenKakuGothicNew = Zen_Kaku_Gothic_New({
  variable: "--font-family-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-family-mono",
  subsets: ["latin"],
  display: "swap",
});

export const fontConfig = {
  sans: zenKakuGothicNew,
  mono: geistMono,
};

export const fontVariables = `${fontConfig.sans.variable} ${fontConfig.mono.variable}`;

import "~/styles/globals.css";

import type { Metadata } from "next";

import { Manrope } from "next/font/google";
import { Toaster } from "sonner";
import { TRPCReactProvider } from "~/trpc/react";

const main_font = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-main",
  display: "swap",
});

export const metadata: Metadata = {
  title: "fit log",
  description: "Платформа для тренировок",
  icons: [{ rel: "icon", url: "/favicon.svg" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${main_font.variable} font-main`}>
      <body>
        <TRPCReactProvider>
          {children}
        </TRPCReactProvider>
        <Toaster />
      </body>
    </html>
  );
}
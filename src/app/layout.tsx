import type { Metadata } from "next";
import "./globals.css";
import { fontVariables } from "@/config/fonts";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { metaData } from "@/constant/app";
import TopLoader from "@/components/top-loader";

export const metadata: Metadata = metaData;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontVariables} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TopLoader />
          {children}
          <Toaster closeButton position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}

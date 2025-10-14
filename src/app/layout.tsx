import type { Metadata } from "next";
import "./globals.css";
import { fontVariables } from "@/config/fonts";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { appName } from "@/constant/app";

export const metadata: Metadata = {
  title: {
    default: `${appName} - Your online learning platform`,
    template: `%s - ${appName}`,
  },
  description: `${appName} - Your online learning platform for growth and skill development.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontVariables} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}

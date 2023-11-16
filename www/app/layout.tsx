import type { Metadata } from "next";
import "./globals.css";

import { GeistMono } from "geist/font/mono";

import { ThemeProvider } from "@/lib/theme-provider";
import MainNav from "@/components/layout/main-nav";
import { Footer } from "@/components/layout/footer";
import GridPattern from "@/components/layout/grid-background";
import { Container } from "@/components/layout/container";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistMono.className} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MainNav />
          <GridPattern width={20} height={20} x={-1} y={-1} className="-z-10" />
          <Container>{children}</Container>
          <Footer />
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
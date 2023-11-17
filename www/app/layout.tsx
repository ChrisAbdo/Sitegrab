import type { Metadata } from "next";
import "./globals.css";

import { GeistMono } from "geist/font/mono";

import { ThemeProvider } from "@/lib/theme-provider";
import MainNav from "@/components/layout/main-nav";
import { Footer } from "@/components/layout/footer";
import GridPattern from "@/components/layout/grid-background";
import { Container } from "@/components/layout/container";
import { Toaster } from "sonner";

const title = "Sitegrab - take screenshots of any website, instantly.";
const description =
  "Sitegrab is a free tool that lets you take screenshots of any website, instantly. No sign up required.";

export const metadata: Metadata = {
  title: title,
  description: description,
  openGraph: {
    title,
    description,
  },
  twitter: {
    title,
    description,
    card: "summary_large_image",
    creator: "@abdo_eth",
  },
  metadataBase: new URL("https://sitegrab.chrisabdo.dev/"),
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

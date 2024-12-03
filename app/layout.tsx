import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { ModalProvider } from "@/contexts/ModalContext";
import RequestModal from "@/components/RequestModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Xouston - Modern Web & Mobile Development",
  description:
    "Professional web and mobile development services for modern businesses",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <ModalProvider>
            <Navbar />
            {children}
            <RequestModal />
          </ModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

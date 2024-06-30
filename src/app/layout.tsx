import { Toaster } from "@/components/ui/sonner";
import { ImagePreviewProvider } from "@/contexts/imagePreviewContext";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Chat NextJS",
  description: "An chat with next js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={cn("font-sans antialiased", fontSans.variable)}>
        <ImagePreviewProvider>
          <Toaster />
          {children}
        </ImagePreviewProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { siteConfig } from "@/data";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: siteConfig.defaultSeoTitle,
    template: "%s | AsaHome",
  },
  description: siteConfig.defaultSeoDescription,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

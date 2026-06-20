import type { Metadata } from "next";
import { Inter, Barlow_Condensed } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getContent, toRuntimeConfig } from "@/lib/content";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const barlow = Barlow_Condensed({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — Volley à Perwez`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Volley Club Perwez",
    "volley Perwez",
    "club de volley Brabant wallon",
    "volleyball Perwez",
    "VCP",
  ],
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    locale: siteConfig.locale,
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await getContent();
  const runtime = toRuntimeConfig(content);

  return (
    <html lang="fr" className={`${inter.variable} ${barlow.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <Header runtime={runtime} />
        <main className="flex-1">{children}</main>
        <Footer runtime={runtime} />
      </body>
    </html>
  );
}

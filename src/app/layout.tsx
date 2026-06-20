import type { Metadata } from "next";
import { Inter, Barlow_Condensed, Geist } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getContent, toRuntimeConfig } from "@/lib/content";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const barlow = Barlow_Condensed({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent();
  const ui = content.ui;

  return {
    title: {
      default: `${ui.site_name} — ${ui.meta_title_suffix}`,
      template: `%s | ${ui.site_name}`,
    },
    description: content.config.description,
    keywords: [
      ui.site_name,
      "volley Perwez",
      "club de volley Brabant wallon",
      "volleyball Perwez",
      ui.site_short_name,
    ],
    openGraph: {
      title: ui.site_name,
      description: content.config.description,
      locale: "fr-BE",
      type: "website",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await getContent();
  const runtime = toRuntimeConfig(content);

  return (
    <html lang="fr" className={cn("h-full", inter.variable, barlow.variable, "font-sans", geist.variable)}>
      <body className="flex min-h-full flex-col antialiased">
        <Header runtime={runtime} />
        <main className="flex-1">{children}</main>
        <Footer runtime={runtime} />
      </body>
    </html>
  );
}

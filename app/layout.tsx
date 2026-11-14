import type { Metadata } from "next";
import { NoticeProvider } from "@/components/notice-provider";
import "./globals.css";
import "./refinements.css";
import "./zone-gallery.css";
import "./mobile.css";

export const metadata: Metadata = {
  metadataBase: process.env.SITE_URL ? new URL(process.env.SITE_URL) : undefined,
  title: "Pyinyar Lam Sone 2027 | Education & Career Pathways Festival",
  description:
    "One place, multiple pathways. Explore six education zones at Pyinyar Lam Sone, 30–31 January 2027 at Myanmar Expo Hall, Yangon.",
  openGraph: {
    type: "website",
    siteName: "Pyinyar Lam Sone 2027",
    title: "Pyinyar Lam Sone 2027 | Education & Career Pathways Festival",
    description: "One place, multiple pathways. Explore six education zones at Pyinyar Lam Sone, 30–31 January 2027 at Myanmar Expo Hall, Yangon.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pyinyar Lam Sone 2027 | Education & Career Pathways Festival",
    description: "One place, multiple pathways. Explore six education zones at Pyinyar Lam Sone, 30–31 January 2027 at Myanmar Expo Hall, Yangon.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <NoticeProvider>{children}</NoticeProvider>
      </body>
    </html>
  );
}

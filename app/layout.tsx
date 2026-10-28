import type { Metadata } from "next";
import { NoticeProvider } from "@/components/notice-provider";
import "./globals.css";
import "./refinements.css";
import "./zone-gallery.css";

export const metadata: Metadata = {
  title: "Pyinyar Lam Sone 2027 | Education & Career Pathways Festival",
  description:
    "One place, multiple pathways. Explore six education zones at Pyinyar Lam Sone, 30–31 January 2027 at Myanmar Expo Hall, Yangon.",
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

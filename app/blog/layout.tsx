import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>
    <a className="skip" href="#main">Skip to main content</a>
    <Header blog />
    {children}
    <Footer />
  </>;
}

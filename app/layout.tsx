import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Montserrat, Outfit } from "next/font/google";
import { StoreProvider } from "@/lib/store";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FormAria } from "@/components/layout/FormAria";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { AddedToast } from "@/components/cart/AddedToast";
import { AuthDialog } from "@/components/auth/AuthDialog";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import "./globals.css";

// Bebas Neue matches the official wordmark; Outfit matches the menu-board body
// text; Montserrat matches the small text on official posters (see research/).
const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-montserrat" });

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Seven Sides | Home of Red Tenders, Lahore",
    template: "%s | Seven Sides",
  },
  description:
    "Nashville hot chicken in Lahore. The Sando, Red Tenders and sliders, made at your heat level. DHA Phase 5, Lake City, Cantt and Model Town.",
  openGraph: {
    title: "Seven Sides | Home of Red Tenders",
    description: "Lahore’s favourite Sando & tenders. Four branches across Lahore.",
    images: [{ url: "/images/sando.webp", width: 1080, height: 1350 }],
  },
};

export const viewport: Viewport = { themeColor: "#1fa0a5" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${bebas.variable} ${outfit.variable} ${montserrat.variable}`}>
      <body className="min-h-dvh">
        <StoreProvider>
          <SmoothScroll />
          <FormAria />
          <Header />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
          <CartDrawer />
          <AuthDialog />
          <AddedToast />
        </StoreProvider>
      </body>
    </html>
  );
}

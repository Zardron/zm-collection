import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CartProvider } from "./contexts/CartContext";
import { LayoutWrapper } from "./components/LayoutWrapper";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "ZM Collection - Premium Beauty & Fashion Store",
  description: "Discover premium beauty products at ZM Collection. Shop luxurious lip tints, perfumes, serums, makeup, and fashionable clothing. Curated collections for your complete beauty and style journey.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${raleway.variable} antialiased`}
      >
        <ThemeProvider>
          <CartProvider>
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

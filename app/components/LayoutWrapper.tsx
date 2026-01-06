"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");
  const isAuthRoute = pathname?.startsWith("/auth");

  if (isAdminRoute || isAuthRoute) {
    // Admin and Auth pages get full-screen layout without Navbar/Footer
    return <>{children}</>;
  }

  // Regular pages get Navbar and Footer
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}


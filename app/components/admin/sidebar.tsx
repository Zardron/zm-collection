"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { createAdminMenu, type MenuItem } from "@/lib/menu";
import { Badge } from "@/app/components/ui/badge";
import { LogOut, ExternalLink, ChevronRight } from "lucide-react";
import { allProducts } from "@/app/data/products";
import { allCollections } from "@/app/data/collections";

interface SidebarProps {
  className?: string;
  onClose?: () => void;
}

export function Sidebar({ className, onClose }: SidebarProps) {
  const pathname = usePathname();

  // Get dynamic counts
  const productCount = allProducts.length;
  const collectionCount = allCollections.length; // Total collection items (20)
  const pendingOrders = 5; // This would come from real data

  // Create menu with dynamic counts
  const adminMenu = createAdminMenu({
    products: productCount,
    collections: collectionCount,
    pendingOrders: pendingOrders,
  });

  const isActiveLink = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  const NavItem = ({ item }: { item: MenuItem }) => {
    const Icon = item.icon;
    const isActive = isActiveLink(item.href);

    const getBadgeStyle = () => {
      if (item.badgeVariant === "warning") {
        return "bg-amber-500/20 text-amber-500 border-amber-500/30";
      }
      if (item.badgeVariant === "success") {
        return "bg-emerald-500/20 text-emerald-500 border-emerald-500/30";
      }
      return "";
    };

    return (
      <Link
        href={item.href}
        onClick={onClose}
        className={cn(
          "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 group relative overflow-hidden",
          isActive
            ? "bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] text-[var(--primary-black)] shadow-lg shadow-[var(--accent)]/20"
            : "text-[var(--foreground)]/70 hover:bg-[var(--accent)]/10 hover:text-[var(--foreground)]"
        )}
      >
        {/* Active indicator */}
        {isActive && (
          <span className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 rounded-r-full bg-[var(--primary-black)]/30" />
        )}
        
        <Icon
          className={cn(
            "h-5 w-5 transition-all duration-200",
            isActive
              ? "text-[var(--primary-black)]"
              : "text-[var(--foreground)]/50 group-hover:text-[var(--accent)] group-hover:scale-110"
          )}
        />
        <span className="flex-1">{item.title}</span>
        {item.badge !== undefined && (
          <Badge
            variant={isActive ? "secondary" : "outline"}
            className={cn(
              "ml-auto h-5 min-w-[24px] justify-center text-xs font-semibold",
              isActive 
                ? "bg-[var(--primary-black)]/20 text-[var(--primary-black)] border-0"
                : getBadgeStyle()
            )}
          >
            {item.badge}
          </Badge>
        )}
        {!isActive && (
          <ChevronRight className="h-4 w-4 text-[var(--foreground)]/30 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
        )}
      </Link>
    );
  };

  return (
    <aside
      className={cn(
        "flex h-full w-64 flex-col bg-[var(--background)] border-r border-[var(--border)]/10",
        className
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-[var(--border)]/10 px-6">
        <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-hover)] p-0.5 shadow-lg shadow-[var(--accent)]/20">
          <div className="h-full w-full rounded-[10px] bg-[var(--background)] overflow-hidden">
            <Image
              src="/ZM-logo.png"
              alt="ZM Collection"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-[var(--foreground)]">
            ZM Collection
          </span>
          <span className="text-xs text-[var(--accent)]">Admin Panel</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 hide-scrollbar">
        <div className="space-y-5">
          {adminMenu.map((section, idx) => (
            <div key={idx}>
              {section.title && (
                <h3 className="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-[var(--foreground)]/40">
                  {section.title}
                </h3>
              )}
              <div className="space-y-1">
                {section.items.map((item) => (
                  <NavItem key={item.href} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Store Status - moved inside nav for scrolling */}
        <div className="mt-6 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 p-3">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              <div className="absolute inset-0 h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            </div>
            <span className="text-xs font-medium text-emerald-500">Store Online</span>
          </div>
          <p className="mt-1.5 text-[11px] text-[var(--foreground)]/50">
            Your store is live and accepting orders
          </p>
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-[var(--border)]/10 p-3 space-y-1">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--foreground)]/70 hover:bg-[var(--accent)]/10 hover:text-[var(--foreground)] transition-all duration-200 group"
        >
          <ExternalLink className="h-5 w-5 text-[var(--foreground)]/50 group-hover:text-[var(--accent)] transition-colors" />
          <span className="flex-1">View Store</span>
          <span className="text-xs text-[var(--foreground)]/40 group-hover:text-[var(--accent)]">→</span>
        </Link>
        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-400/80 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 group">
          <LogOut className="h-5 w-5 text-red-400/60 group-hover:text-red-400 transition-colors" />
          <span className="flex-1 text-left">Logout</span>
        </button>
      </div>
    </aside>
  );
}

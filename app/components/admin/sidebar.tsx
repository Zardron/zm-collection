"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { adminMenu, type MenuItem } from "@/lib/menu";
import { Badge } from "@/app/components/ui/badge";
import { LogOut, ExternalLink } from "lucide-react";

interface SidebarProps {
  className?: string;
  onClose?: () => void;
}

export function Sidebar({ className, onClose }: SidebarProps) {
  const pathname = usePathname();

  const isActiveLink = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  const NavItem = ({ item }: { item: MenuItem }) => {
    const Icon = item.icon;
    const isActive = isActiveLink(item.href);

    return (
      <Link
        href={item.href}
        onClick={onClose}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 group",
          isActive
            ? "bg-[var(--accent)] text-[var(--primary-black)]"
            : "text-[var(--foreground)]/70 hover:bg-[var(--accent)]/10 hover:text-[var(--foreground)]"
        )}
      >
        <Icon
          className={cn(
            "h-5 w-5 transition-colors",
            isActive
              ? "text-[var(--primary-black)]"
              : "text-[var(--foreground)]/50 group-hover:text-[var(--accent)]"
          )}
        />
        <span className="flex-1">{item.title}</span>
        {item.badge && (
          <Badge
            variant={isActive ? "secondary" : "outline"}
            className={cn(
              "ml-auto h-5 min-w-[20px] justify-center text-xs",
              isActive && "bg-[var(--primary-black)]/20 text-[var(--primary-black)] border-0"
            )}
          >
            {item.badge}
          </Badge>
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
        <div className="relative h-8 w-8 overflow-hidden rounded-lg bg-[var(--accent)]">
          <Image
            src="/ZM-logo.png"
            alt="ZM Collection"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-[var(--foreground)]">
            ZM Collection
          </span>
          <span className="text-xs text-[var(--foreground)]/50">Admin Panel</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <div className="space-y-6">
          {adminMenu.map((section, idx) => (
            <div key={idx}>
              {section.title && (
                <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-[var(--foreground)]/40">
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
      </nav>

      {/* Footer */}
      <div className="border-t border-[var(--border)]/10 p-4">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--foreground)]/70 hover:bg-[var(--accent)]/10 hover:text-[var(--foreground)] transition-all duration-200 group"
        >
          <ExternalLink className="h-5 w-5 text-[var(--foreground)]/50 group-hover:text-[var(--accent)]" />
          <span className="flex-1">View Store</span>
        </Link>
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-400 hover:bg-red-600/10 transition-all duration-200 group">
          <LogOut className="h-5 w-5 text-red-400/70 group-hover:text-red-400" />
          <span className="flex-1 text-left">Logout</span>
        </button>
      </div>
    </aside>
  );
}


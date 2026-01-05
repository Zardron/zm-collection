"use client";

import React from "react";
import { Menu, Bell, Search, Moon, Sun, User } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/app/components/ui/sheet";
import { Sidebar } from "./sidebar";
import { useTheme } from "@/app/contexts/ThemeContext";

interface HeaderProps {
  title?: string;
}

export function Header({ title }: HeaderProps) {
  const [open, setOpen] = React.useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-[var(--border)]/10 bg-[var(--background)]/95 backdrop-blur-sm px-4 md:px-6">
      {/* Mobile Menu Button */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <SheetDescription className="sr-only">
            Admin navigation sidebar
          </SheetDescription>
          <Sidebar onClose={() => setOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Page Title */}
      {title && (
        <h1 className="text-lg font-semibold text-[var(--foreground)] hidden md:block">
          {title}
        </h1>
      )}

      {/* Search */}
      <div className="flex-1 md:max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--foreground)]/40" />
          <Input
            type="search"
            placeholder="Search products, orders..."
            className="pl-10 bg-[var(--card-bg)] border-[var(--border)]/20"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="relative"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5 text-[var(--foreground)]/70" />
          ) : (
            <Moon className="h-5 w-5 text-[var(--foreground)]/70" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-[var(--foreground)]/70" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
          <span className="sr-only">View notifications</span>
        </Button>

        {/* User Avatar */}
        <Button variant="ghost" size="icon" className="relative">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent)]">
            <User className="h-4 w-4 text-[var(--primary-black)]" />
          </div>
          <span className="sr-only">User menu</span>
        </Button>
      </div>
    </header>
  );
}


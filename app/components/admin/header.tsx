"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Menu, Bell, Search, Moon, Sun, User, ShoppingCart, Package, AlertTriangle, Star, UserPlus, X, Check, Clock } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/app/components/ui/sheet";
import { Badge } from "@/app/components/ui/badge";
import { Sidebar } from "./sidebar";
import { useTheme } from "@/app/contexts/ThemeContext";

interface HeaderProps {
  title?: string;
}

// Notification types
interface Notification {
  id: string;
  type: "order" | "stock" | "review" | "customer";
  title: string;
  message: string;
  time: string;
  read: boolean;
  link?: string;
}

// Sample notifications data
const initialNotifications: Notification[] = [
  {
    id: "1",
    type: "order",
    title: "New Order Received",
    message: "Order #ORD-2024-001 from Maria Santos - ₱4,599",
    time: "2 minutes ago",
    read: false,
    link: "/admin/orders/ORD-2024-001",
  },
  {
    id: "2",
    type: "stock",
    title: "Low Stock Alert",
    message: "Velvet Lip Tint - Rose is running low (5 left)",
    time: "1 hour ago",
    read: false,
    link: "/admin/products",
  },
  {
    id: "3",
    type: "review",
    title: "New 5-Star Review",
    message: "Customer left a review on Hyaluronic Acid Serum",
    time: "3 hours ago",
    read: false,
  },
  {
    id: "4",
    type: "customer",
    title: "New Customer",
    message: "Ana Garcia just created an account",
    time: "5 hours ago",
    read: true,
    link: "/admin/customers",
  },
  {
    id: "5",
    type: "order",
    title: "Order Shipped",
    message: "Order #ORD-2024-003 has been shipped",
    time: "1 day ago",
    read: true,
    link: "/admin/orders/ORD-2024-003",
  },
];

export function Header({ title }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const { theme, toggleTheme } = useTheme();
  const notificationRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Close notifications when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "order":
        return <ShoppingCart className="h-4 w-4" />;
      case "stock":
        return <AlertTriangle className="h-4 w-4" />;
      case "review":
        return <Star className="h-4 w-4" />;
      case "customer":
        return <UserPlus className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "order":
        return "bg-blue-500/10 text-blue-500";
      case "stock":
        return "bg-amber-500/10 text-amber-500";
      case "review":
        return "bg-purple-500/10 text-purple-500";
      case "customer":
        return "bg-emerald-500/10 text-emerald-500";
      default:
        return "bg-[var(--accent)]/10 text-[var(--accent)]";
    }
  };

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

      <div className="w-full flex items-center justify-between">
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
          <div className="relative" ref={notificationRef}>
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
            >
              <Bell className="h-5 w-5 text-[var(--foreground)]/70" />
              {unreadCount > 0 && (
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
              <span className="sr-only">View notifications</span>
            </Button>

            {/* Notifications Dropdown */}
            {notificationsOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 md:w-96 rounded-xl border border-[var(--border)]/20 bg-[var(--background)] shadow-2xl shadow-black/20 overflow-hidden z-50">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[var(--border)]/10 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-[var(--foreground)]">Notifications</h3>
                    {unreadCount > 0 && (
                      <Badge variant="destructive" className="h-5 px-1.5 text-xs">
                        {unreadCount} new
                      </Badge>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-[var(--accent)] hover:underline"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                {/* Notifications List */}
                <div className="max-h-[400px] overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--foreground)]/5">
                        <Bell className="h-6 w-6 text-[var(--foreground)]/30" />
                      </div>
                      <p className="mt-3 text-sm text-[var(--foreground)]/60">No notifications yet</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-[var(--border)]/10">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`group relative flex gap-3 p-4 transition-colors hover:bg-[var(--accent)]/5 ${!notification.read ? "bg-[var(--accent)]/5" : ""
                            }`}
                        >
                          {/* Icon */}
                          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${getNotificationColor(notification.type)}`}>
                            {getNotificationIcon(notification.type)}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            {notification.link ? (
                              <Link
                                href={notification.link}
                                onClick={() => {
                                  markAsRead(notification.id);
                                  setNotificationsOpen(false);
                                }}
                                className="block"
                              >
                                <p className="font-medium text-[var(--foreground)] text-sm hover:text-[var(--accent)]">
                                  {notification.title}
                                </p>
                                <p className="text-xs text-[var(--foreground)]/60 mt-0.5 line-clamp-2">
                                  {notification.message}
                                </p>
                              </Link>
                            ) : (
                              <>
                                <p className="font-medium text-[var(--foreground)] text-sm">
                                  {notification.title}
                                </p>
                                <p className="text-xs text-[var(--foreground)]/60 mt-0.5 line-clamp-2">
                                  {notification.message}
                                </p>
                              </>
                            )}
                            <div className="flex items-center gap-2 mt-1">
                              <Clock className="h-3 w-3 text-[var(--foreground)]/40" />
                              <span className="text-xs text-[var(--foreground)]/40">
                                {notification.time}
                              </span>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex flex-col items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            {!notification.read && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-emerald-500/20 text-emerald-500"
                                title="Mark as read"
                              >
                                <Check className="h-3.5 w-3.5" />
                              </button>
                            )}
                            <button
                              onClick={() => removeNotification(notification.id)}
                              className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-red-500/20 text-red-500"
                              title="Remove"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </div>

                          {/* Unread indicator */}
                          {!notification.read && (
                            <div className="absolute left-1.5 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-[var(--accent)]" />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="border-t border-[var(--border)]/10 p-2">
                  <Link
                    href="/admin/notifications"
                    onClick={() => setNotificationsOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium text-[var(--accent)] hover:bg-[var(--accent)]/10 transition-colors"
                  >
                    View all notifications
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* User Avatar */}
          <Button variant="ghost" size="icon" className="relative">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent)]">
              <User className="h-4 w-4 text-[var(--primary-black)]" />
            </div>
            <span className="sr-only">User menu</span>
          </Button>
        </div>
      </div>
    </header>
  );
}

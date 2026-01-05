"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import Link from "next/link";
import {
  Bell,
  ShoppingCart,
  AlertTriangle,
  Star,
  UserPlus,
  Check,
  Trash2,
  Filter,
  X,
  Clock,
  CheckCheck,
  Package,
  CreditCard,
  Truck,
  MessageSquare,
  Settings,
} from "lucide-react";

// Notification types
interface Notification {
  id: string;
  type: "order" | "stock" | "review" | "customer" | "payment" | "shipping" | "system";
  title: string;
  message: string;
  time: string;
  date: string;
  read: boolean;
  link?: string;
}

// Extended notifications data
const allNotificationsData: Notification[] = [
  {
    id: "1",
    type: "order",
    title: "New Order Received",
    message: "Order #ORD-2024-001 from Maria Santos - ₱4,599. The customer has requested express shipping.",
    time: "2 minutes ago",
    date: "2024-01-15",
    read: false,
    link: "/admin/orders/ORD-2024-001",
  },
  {
    id: "2",
    type: "stock",
    title: "Low Stock Alert",
    message: "Velvet Lip Tint - Rose is running low with only 5 units remaining. Consider restocking soon.",
    time: "1 hour ago",
    date: "2024-01-15",
    read: false,
    link: "/admin/products",
  },
  {
    id: "3",
    type: "review",
    title: "New 5-Star Review",
    message: "Customer Ana Garcia left a 5-star review on Hyaluronic Acid Serum: 'Amazing product! My skin feels so hydrated.'",
    time: "3 hours ago",
    date: "2024-01-15",
    read: false,
  },
  {
    id: "4",
    type: "customer",
    title: "New Customer Registration",
    message: "Ana Garcia just created an account and completed their profile.",
    time: "5 hours ago",
    date: "2024-01-15",
    read: true,
    link: "/admin/customers",
  },
  {
    id: "5",
    type: "shipping",
    title: "Order Shipped",
    message: "Order #ORD-2024-003 has been shipped via J&T Express. Tracking number: PH987654321",
    time: "1 day ago",
    date: "2024-01-14",
    read: true,
    link: "/admin/orders/ORD-2024-003",
  },
  {
    id: "6",
    type: "payment",
    title: "Payment Received",
    message: "Payment of ₱6,799 received for Order #ORD-2024-003 via Credit Card.",
    time: "1 day ago",
    date: "2024-01-14",
    read: true,
    link: "/admin/orders/ORD-2024-003",
  },
  {
    id: "7",
    type: "order",
    title: "Order Cancelled",
    message: "Order #ORD-2024-005 has been cancelled by customer Sofia Mendoza. Reason: Changed mind.",
    time: "2 days ago",
    date: "2024-01-13",
    read: true,
    link: "/admin/orders",
  },
  {
    id: "8",
    type: "stock",
    title: "Out of Stock",
    message: "Premium Makeup Brush Set is now out of stock. 3 customers have this item in their cart.",
    time: "2 days ago",
    date: "2024-01-13",
    read: true,
    link: "/admin/products",
  },
  {
    id: "9",
    type: "system",
    title: "System Update",
    message: "The admin dashboard has been updated with new analytics features. Check out the Analytics page!",
    time: "3 days ago",
    date: "2024-01-12",
    read: true,
    link: "/admin/analytics",
  },
  {
    id: "10",
    type: "review",
    title: "New Review",
    message: "Customer Juan Dela Cruz left a 4-star review on Midnight Bloom Perfume.",
    time: "3 days ago",
    date: "2024-01-12",
    read: true,
  },
  {
    id: "11",
    type: "customer",
    title: "Customer Milestone",
    message: "Maria Santos has reached Platinum tier with ₱125,750 total purchases!",
    time: "4 days ago",
    date: "2024-01-11",
    read: true,
    link: "/admin/customers",
  },
  {
    id: "12",
    type: "payment",
    title: "Refund Processed",
    message: "Refund of ₱3,299 has been processed for Order #ORD-2024-005.",
    time: "4 days ago",
    date: "2024-01-11",
    read: true,
    link: "/admin/orders",
  },
];

// Filter pill component
function FilterPill({
  label,
  active,
  onClick,
  icon: Icon,
  count,
  color = "default",
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  icon?: React.ComponentType<{ className?: string }>;
  count?: number;
  color?: "default" | "blue" | "amber" | "purple" | "emerald" | "cyan" | "pink";
}) {
  const colorClasses = {
    default: active
      ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)]"
      : "bg-transparent text-[var(--foreground)]/70 border-[var(--foreground)]/20 hover:border-[var(--foreground)]/40",
    blue: active
      ? "bg-blue-500 text-white border-blue-500"
      : "bg-transparent text-blue-500/70 border-blue-500/30 hover:border-blue-500/60",
    amber: active
      ? "bg-amber-500 text-white border-amber-500"
      : "bg-transparent text-amber-500/70 border-amber-500/30 hover:border-amber-500/60",
    purple: active
      ? "bg-purple-500 text-white border-purple-500"
      : "bg-transparent text-purple-500/70 border-purple-500/30 hover:border-purple-500/60",
    emerald: active
      ? "bg-emerald-500 text-white border-emerald-500"
      : "bg-transparent text-emerald-500/70 border-emerald-500/30 hover:border-emerald-500/60",
    cyan: active
      ? "bg-cyan-500 text-white border-cyan-500"
      : "bg-transparent text-cyan-500/70 border-cyan-500/30 hover:border-cyan-500/60",
    pink: active
      ? "bg-pink-500 text-white border-pink-500"
      : "bg-transparent text-pink-500/70 border-pink-500/30 hover:border-pink-500/60",
  };

  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium
        border transition-all duration-300 ease-out
        ${colorClasses[color]}
        ${active ? "shadow-lg scale-105" : "hover:scale-102"}
      `}
    >
      {Icon && <Icon className="h-3.5 w-3.5" />}
      {label}
      {count !== undefined && (
        <span
          className={`
          ml-1 px-1.5 py-0.5 text-xs rounded-full font-semibold
          ${active ? "bg-white/20" : "bg-[var(--foreground)]/10"}
        `}
        >
          {count}
        </span>
      )}
    </button>
  );
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(allNotificationsData);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Filter notifications
  const filteredNotifications = notifications.filter((n) => {
    if (showUnreadOnly && n.read) return false;
    if (selectedTypes.length > 0 && !selectedTypes.includes(n.type)) return false;
    return true;
  });

  // Group notifications by date
  const groupedNotifications = filteredNotifications.reduce((groups, notification) => {
    const date = notification.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(notification);
    return groups;
  }, {} as Record<string, Notification[]>);

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const deleteAllRead = () => {
    if (confirm("Delete all read notifications?")) {
      setNotifications((prev) => prev.filter((n) => !n.read));
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "order":
        return ShoppingCart;
      case "stock":
        return AlertTriangle;
      case "review":
        return Star;
      case "customer":
        return UserPlus;
      case "payment":
        return CreditCard;
      case "shipping":
        return Truck;
      case "system":
        return Settings;
      default:
        return Bell;
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
      case "payment":
        return "bg-cyan-500/10 text-cyan-500";
      case "shipping":
        return "bg-pink-500/10 text-pink-500";
      case "system":
        return "bg-gray-500/10 text-gray-500";
      default:
        return "bg-[var(--accent)]/10 text-[var(--accent)]";
    }
  };

  const formatDateHeader = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      });
    }
  };

  const typeCount = (type: string) => notifications.filter((n) => n.type === type).length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Notifications</h1>
          <p className="text-[var(--foreground)]/60">
            Stay updated with your store activities
          </p>
        </div>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" onClick={markAllAsRead}>
              <CheckCheck className="mr-2 h-4 w-4" />
              Mark all as read
            </Button>
          )}
          <Button variant="outline" onClick={deleteAllRead}>
            <Trash2 className="mr-2 h-4 w-4" />
            Clear read
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card
          className={`cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
            !showUnreadOnly ? "ring-2 ring-[var(--foreground)]/20" : ""
          }`}
          onClick={() => setShowUnreadOnly(false)}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-[var(--foreground)]/60">All Notifications</span>
                <p className="text-2xl font-bold text-[var(--foreground)]">{notifications.length}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent)]/10">
                <Bell className="h-6 w-6 text-[var(--accent)]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className={`cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-red-500/20 ${
            showUnreadOnly ? "ring-2 ring-red-500 shadow-lg shadow-red-500/20" : ""
          }`}
          onClick={() => setShowUnreadOnly(true)}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-[var(--foreground)]/60">Unread</span>
                <p className="text-2xl font-bold text-red-500">{unreadCount}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10">
                <MessageSquare className="h-6 w-6 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-[var(--foreground)]/60">Orders</span>
                <p className="text-2xl font-bold text-blue-500">{typeCount("order")}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
                <ShoppingCart className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-amber-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-[var(--foreground)]/60">Alerts</span>
                <p className="text-2xl font-bold text-amber-500">{typeCount("stock")}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10">
                <AlertTriangle className="h-6 w-6 text-amber-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-hover)]">
                <Filter className="h-5 w-5 text-[var(--primary-black)]" />
              </div>
              <div>
                <CardTitle className="text-lg">Filter by Type</CardTitle>
                <p className="text-sm text-[var(--foreground)]/50">
                  {selectedTypes.length > 0
                    ? `Showing ${filteredNotifications.length} notifications`
                    : "Showing all notifications"}
                </p>
              </div>
            </div>
            {selectedTypes.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedTypes([])}
                className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
              >
                <X className="mr-1 h-4 w-4" />
                Clear
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <FilterPill
              label="Orders"
              active={selectedTypes.includes("order")}
              onClick={() => toggleType("order")}
              icon={ShoppingCart}
              count={typeCount("order")}
              color="blue"
            />
            <FilterPill
              label="Stock Alerts"
              active={selectedTypes.includes("stock")}
              onClick={() => toggleType("stock")}
              icon={AlertTriangle}
              count={typeCount("stock")}
              color="amber"
            />
            <FilterPill
              label="Reviews"
              active={selectedTypes.includes("review")}
              onClick={() => toggleType("review")}
              icon={Star}
              count={typeCount("review")}
              color="purple"
            />
            <FilterPill
              label="Customers"
              active={selectedTypes.includes("customer")}
              onClick={() => toggleType("customer")}
              icon={UserPlus}
              count={typeCount("customer")}
              color="emerald"
            />
            <FilterPill
              label="Payments"
              active={selectedTypes.includes("payment")}
              onClick={() => toggleType("payment")}
              icon={CreditCard}
              count={typeCount("payment")}
              color="cyan"
            />
            <FilterPill
              label="Shipping"
              active={selectedTypes.includes("shipping")}
              onClick={() => toggleType("shipping")}
              icon={Truck}
              count={typeCount("shipping")}
              color="pink"
            />
            <FilterPill
              label="System"
              active={selectedTypes.includes("system")}
              onClick={() => toggleType("system")}
              icon={Settings}
              count={typeCount("system")}
              color="default"
            />
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <CardTitle>
            {showUnreadOnly ? "Unread Notifications" : "All Notifications"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--foreground)]/5">
                <Bell className="h-8 w-8 text-[var(--foreground)]/30" />
              </div>
              <p className="mt-4 text-lg font-medium text-[var(--foreground)]">No notifications</p>
              <p className="text-sm text-[var(--foreground)]/60">
                {showUnreadOnly
                  ? "You're all caught up! No unread notifications."
                  : "No notifications match your current filters."}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(groupedNotifications)
                .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
                .map(([date, notifs]) => (
                  <div key={date}>
                    <h3 className="mb-3 text-sm font-semibold text-[var(--foreground)]/60 uppercase tracking-wider">
                      {formatDateHeader(date)}
                    </h3>
                    <div className="space-y-2">
                      {notifs.map((notification) => {
                        const Icon = getNotificationIcon(notification.type);
                        return (
                          <div
                            key={notification.id}
                            className={`group relative flex gap-4 rounded-xl border border-[var(--border)]/10 p-4 transition-all hover:border-[var(--accent)]/30 hover:bg-[var(--accent)]/5 ${
                              !notification.read ? "bg-[var(--accent)]/5 border-[var(--accent)]/20" : ""
                            }`}
                          >
                            {/* Unread indicator */}
                            {!notification.read && (
                              <div className="absolute left-2 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-[var(--accent)]" />
                            )}

                            {/* Icon */}
                            <div
                              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${getNotificationColor(
                                notification.type
                              )}`}
                            >
                              <Icon className="h-6 w-6" />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  {notification.link ? (
                                    <Link
                                      href={notification.link}
                                      onClick={() => markAsRead(notification.id)}
                                      className="font-semibold text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
                                    >
                                      {notification.title}
                                    </Link>
                                  ) : (
                                    <p className="font-semibold text-[var(--foreground)]">
                                      {notification.title}
                                    </p>
                                  )}
                                  <p className="mt-1 text-sm text-[var(--foreground)]/60 leading-relaxed">
                                    {notification.message}
                                  </p>
                                  <div className="flex items-center gap-2 mt-2">
                                    <Clock className="h-3.5 w-3.5 text-[var(--foreground)]/40" />
                                    <span className="text-xs text-[var(--foreground)]/40">
                                      {notification.time}
                                    </span>
                                    <Badge variant="secondary" className="text-xs capitalize">
                                      {notification.type}
                                    </Badge>
                                  </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  {!notification.read && (
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8 text-emerald-500 hover:text-emerald-400 hover:bg-emerald-500/10"
                                      onClick={() => markAsRead(notification.id)}
                                      title="Mark as read"
                                    >
                                      <Check className="h-4 w-4" />
                                    </Button>
                                  )}
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-red-500 hover:text-red-400 hover:bg-red-500/10"
                                    onClick={() => deleteNotification(notification.id)}
                                    title="Delete"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}


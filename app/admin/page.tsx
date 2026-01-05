"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { StatCard } from "@/app/components/admin/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import {
  Package,
  FolderOpen,
  ShoppingCart,
  TrendingUp,
  ArrowUpRight,
  Clock,
  Eye,
  DollarSign,
  Users,
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Plus,
  Sparkles,
  Calendar,
  ArrowDown,
  ArrowUp,
} from "lucide-react";
import { allProducts } from "@/app/data/products";
import { allCollections } from "@/app/data/collections";

// Helper to get greeting based on time of day
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

// Helper to format currency
function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 0,
  }).format(amount);
}

export default function AdminDashboard() {
  // Calculate stats from data
  const totalProducts = allProducts.length;
  const activeProducts = allProducts.filter((p) => p.badge !== "Draft").length;
  const totalCollections = allCollections.length; // Total collection items (20)
  const totalCategories = new Set(allCollections.map((c) => c.category)).size; // Unique categories (6)

  // Simulated revenue data
  const revenueData = useMemo(() => ({
    totalRevenue: 2847650,
    todaySales: 48750,
    monthlyRevenue: 847650,
    pendingOrders: 12,
    averageOrderValue: 3240,
    conversionRate: 3.2,
  }), []);

  // Recent orders (dummy data)
  const recentOrders = [
    {
      id: "ORD-2024-001",
      customer: "Maria Santos",
      email: "maria.s@email.com",
      total: 4599,
      items: 3,
      status: "Pending",
      date: "2 hours ago",
      avatar: "MS",
    },
    {
      id: "ORD-2024-002",
      customer: "Juan Dela Cruz",
      email: "juan.dc@email.com",
      total: 2199,
      items: 1,
      status: "Processing",
      date: "5 hours ago",
      avatar: "JD",
    },
    {
      id: "ORD-2024-003",
      customer: "Ana Garcia",
      email: "ana.g@email.com",
      total: 6799,
      items: 4,
      status: "Shipped",
      date: "1 day ago",
      avatar: "AG",
    },
    {
      id: "ORD-2024-004",
      customer: "Pedro Reyes",
      email: "pedro.r@email.com",
      total: 1399,
      items: 1,
      status: "Delivered",
      date: "2 days ago",
      avatar: "PR",
    },
  ];

  // Top products (based on actual products)
  const topProducts = allProducts.slice(0, 5).map((product, index) => ({
    ...product,
    sales: [247, 189, 156, 134, 98][index],
    revenue: [345353, 943911, 342144, 167966, 107702][index],
    growth: [12, 8, -3, 15, 5][index],
  }));

  // Low stock items
  const lowStockItems = [
    { id: 1, name: "Velvet Lip Tint - Rose", stock: 5, threshold: 10, image: allProducts[0]?.image },
    { id: 3, name: "Hyaluronic Acid Serum", stock: 3, threshold: 15, image: allProducts[2]?.image },
    { id: 7, name: "Floral Essence Perfume", stock: 8, threshold: 10, image: allProducts[6]?.image },
  ];

  // Activity feed
  const activities = [
    { type: "order", message: "New order #ORD-2024-001 from Maria Santos", time: "2 hours ago", icon: ShoppingCart },
    { type: "product", message: "Product 'Velvet Lip Tint' stock is running low", time: "3 hours ago", icon: AlertTriangle },
    { type: "customer", message: "New customer registration: Ana Garcia", time: "5 hours ago", icon: Users },
    { type: "review", message: "New 5-star review on 'Hyaluronic Acid Serum'", time: "6 hours ago", icon: Sparkles },
    { type: "order", message: "Order #ORD-2024-003 has been shipped", time: "1 day ago", icon: CheckCircle },
    { type: "product", message: "Product 'Premium Makeup Brush Set' updated", time: "1 day ago", icon: Package },
  ];

  // Sales data for mini chart (last 7 days)
  const salesChartData = [
    { day: "Mon", sales: 12400 },
    { day: "Tue", sales: 18200 },
    { day: "Wed", sales: 15800 },
    { day: "Thu", sales: 22100 },
    { day: "Fri", sales: 28700 },
    { day: "Sat", sales: 35200 },
    { day: "Sun", sales: 24800 },
  ];

  const maxSales = Math.max(...salesChartData.map((d) => d.sales));

  const getStatusConfig = (status: string) => {
    const configs: Record<string, { variant: "warning" | "default" | "success" | "secondary"; color: string }> = {
      Pending: { variant: "warning", color: "text-amber-500" },
      Processing: { variant: "default", color: "text-blue-500" },
      Shipped: { variant: "success", color: "text-emerald-500" },
      Delivered: { variant: "secondary", color: "text-gray-500" },
    };
    return configs[status] || { variant: "secondary", color: "text-gray-500" };
  };

  const getActivityColor = (type: string) => {
    const colors: Record<string, string> = {
      order: "bg-blue-500/10 text-blue-500",
      product: "bg-amber-500/10 text-amber-500",
      customer: "bg-emerald-500/10 text-emerald-500",
      review: "bg-purple-500/10 text-purple-500",
    };
    return colors[type] || "bg-gray-500/10 text-gray-500";
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--accent)]/20 via-[var(--card-bg)] to-[var(--card-bg)] p-6 md:p-8">
        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[var(--accent)]/10 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-[var(--accent)]/5 blur-2xl" />
        
        <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">👋</span>
              <h1 className="text-2xl font-bold text-[var(--foreground)]">
                {getGreeting()}, Admin!
              </h1>
            </div>
            <p className="text-[var(--foreground)]/60 max-w-md">
              Here&apos;s what&apos;s happening with your store today. You have{" "}
              <span className="font-semibold text-[var(--accent)]">{revenueData.pendingOrders} pending orders</span> to review.
            </p>
            <div className="flex items-center gap-2 text-sm text-[var(--foreground)]/50">
              <Calendar className="h-4 w-4" />
              <span>{new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild className="border-[var(--accent)]/30">
              <Link href="/admin/products/new">
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Link>
            </Button>
            <Button asChild className="bg-[var(--accent)] text-[var(--primary-black)] hover:bg-[var(--accent-hover)]">
              <Link href="/admin/orders">
                <Eye className="mr-2 h-4 w-4" />
                View Orders
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Revenue Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value={formatCurrency(revenueData.totalRevenue)}
          icon={DollarSign}
          trend={{ value: 23, isPositive: true }}
          description="All time earnings"
        />
        <StatCard
          title="Today's Sales"
          value={formatCurrency(revenueData.todaySales)}
          icon={TrendingUp}
          trend={{ value: 18, isPositive: true }}
          description="vs yesterday"
        />
        <StatCard
          title="Active Products"
          value={activeProducts}
          icon={Package}
          trend={{ value: 8, isPositive: true }}
          description={`of ${totalProducts} total`}
        />
        <StatCard
          title="Collections"
          value={totalCollections}
          icon={FolderOpen}
          description={`In ${totalCategories} categories`}
        />
      </div>

      {/* Sales Chart + Activity Feed */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Sales Chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-lg font-semibold">Weekly Sales Overview</CardTitle>
              <p className="text-sm text-[var(--foreground)]/50">Last 7 days performance</p>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-emerald-500/10 px-3 py-1.5">
              <ArrowUp className="h-4 w-4 text-emerald-500" />
              <span className="text-sm font-medium text-emerald-500">+24.5%</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between gap-3 h-[200px] pt-4">
              {salesChartData.map((data, index) => {
                const heightPercent = (data.sales / maxSales) * 100;
                const barHeight = Math.round(heightPercent * 1.5 + 20); // Min 20px, max ~170px
                return (
                  <div key={data.day} className="flex flex-col items-center gap-2 flex-1 min-w-0">
                    <div className="flex-1 flex items-end">
                      <div className="relative group cursor-pointer">
                        <div
                          className="w-10 md:w-14 rounded-t-lg bg-gradient-to-t from-[var(--accent)] to-[var(--accent)]/60 transition-all duration-500 group-hover:from-[var(--accent-hover)] group-hover:to-[var(--accent)] shadow-lg shadow-[var(--accent)]/20"
                          style={{
                            height: `${barHeight}px`,
                          }}
                        />
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-[var(--foreground)] text-[var(--background)] text-xs px-2 py-1 rounded whitespace-nowrap z-10 pointer-events-none shadow-md">
                          {formatCurrency(data.sales)}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-[var(--foreground)]/50 font-medium">{data.day}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-[var(--border)]/10 pt-4">
              <div>
                <p className="text-2xl font-bold text-[var(--foreground)]">
                  {formatCurrency(salesChartData.reduce((acc, d) => acc + d.sales, 0))}
                </p>
                <p className="text-sm text-[var(--foreground)]/50">Total weekly sales</p>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/analytics">
                  View Analytics
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <Activity className="h-5 w-5 text-[var(--accent)]" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.slice(0, 5).map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div
                    key={index}
                    className="flex items-start gap-3 animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${getActivityColor(activity.type)}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[var(--foreground)] line-clamp-2">
                        {activity.message}
                      </p>
                      <p className="flex items-center gap-1 text-xs text-[var(--foreground)]/50 mt-0.5">
                        <Clock className="h-3 w-3" />
                        {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders + Top Products + Low Stock */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Orders */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold">Recent Orders</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/orders" className="text-[var(--accent)]">
                View All
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentOrders.map((order) => {
                const statusConfig = getStatusConfig(order.status);
                return (
                  <div
                    key={order.id}
                    className="flex items-center gap-4 rounded-xl border border-[var(--border)]/10 p-4 hover:bg-[var(--accent)]/5 transition-all duration-200 cursor-pointer group"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)]/10 text-sm font-semibold text-[var(--accent)]">
                      {order.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-[var(--foreground)]">
                          {order.id}
                        </span>
                        <Badge variant={statusConfig.variant}>{order.status}</Badge>
                      </div>
                      <p className="text-sm text-[var(--foreground)]/60 truncate">
                        {order.customer} • {order.items} item{order.items > 1 ? "s" : ""}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-[var(--foreground)]">
                        {formatCurrency(order.total)}
                      </p>
                      <p className="flex items-center justify-end gap-1 text-xs text-[var(--foreground)]/50">
                        <Clock className="h-3 w-3" />
                        {order.date}
                      </p>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-[var(--foreground)]/30 group-hover:text-[var(--accent)] transition-colors" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Alert */}
        <Card className="border-amber-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Low Stock Alert
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {lowStockItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3"
                >
                  <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-[var(--card-bg)]">
                    <Image
                      src={item.image || "/placeholder.jpg"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--foreground)] truncate">
                      {item.name}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-semibold text-amber-500">
                        {item.stock} left
                      </span>
                      <span className="text-xs text-[var(--foreground)]/50">
                        (min: {item.threshold})
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="h-8 text-xs border-amber-500/30 text-amber-500 hover:bg-amber-500/10">
                    Restock
                  </Button>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-2 border-[var(--border)]/20" asChild>
                <Link href="/admin/products?filter=low-stock">
                  View All Low Stock Items
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Products */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-lg font-semibold">Top Performing Products</CardTitle>
            <p className="text-sm text-[var(--foreground)]/50">Based on sales volume this month</p>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/products" className="text-[var(--accent)]">
              View All
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {topProducts.map((product, index) => (
              <div
                key={product.id}
                className="group relative overflow-hidden rounded-xl border border-[var(--border)]/10 p-4 hover:border-[var(--accent)]/30 hover:bg-[var(--accent)]/5 transition-all duration-200"
              >
                <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent)] text-sm font-bold text-[var(--primary-black)]">
                  #{index + 1}
                </div>
                <div className="relative h-20 w-20 mx-auto mb-3 overflow-hidden rounded-xl bg-[var(--card-bg)]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="text-center">
                  <p className="font-medium text-[var(--foreground)] text-sm line-clamp-1">
                    {product.name}
                  </p>
                  <p className="text-lg font-bold text-[var(--accent)] mt-1">
                    {formatCurrency(product.revenue)}
                  </p>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <span className="text-xs text-[var(--foreground)]/50">
                      {product.sales} sales
                    </span>
                    <span className={`flex items-center text-xs font-medium ${product.growth >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                      {product.growth >= 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                      {Math.abs(product.growth)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-auto flex-col gap-3 p-6 border-[var(--border)]/20 hover:border-[var(--accent)]/30 hover:bg-[var(--accent)]/5" asChild>
              <Link href="/admin/products/new">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent)]/10">
                  <Package className="h-6 w-6 text-[var(--accent)]" />
                </div>
                <span className="font-medium">Add New Product</span>
                <span className="text-xs text-[var(--foreground)]/50">Create a product listing</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-3 p-6 border-[var(--border)]/20 hover:border-[var(--accent)]/30 hover:bg-[var(--accent)]/5" asChild>
              <Link href="/admin/collections">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent)]/10">
                  <FolderOpen className="h-6 w-6 text-[var(--accent)]" />
                </div>
                <span className="font-medium">Manage Collections</span>
                <span className="text-xs text-[var(--foreground)]/50">Organize your products</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-3 p-6 border-[var(--border)]/20 hover:border-[var(--accent)]/30 hover:bg-[var(--accent)]/5" asChild>
              <Link href="/admin/orders">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent)]/10">
                  <ShoppingCart className="h-6 w-6 text-[var(--accent)]" />
                </div>
                <span className="font-medium">Process Orders</span>
                <span className="text-xs text-[var(--foreground)]/50">Handle pending orders</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-3 p-6 border-[var(--border)]/20 hover:border-[var(--accent)]/30 hover:bg-[var(--accent)]/5" asChild>
              <Link href="/admin/analytics">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent)]/10">
                  <TrendingUp className="h-6 w-6 text-[var(--accent)]" />
                </div>
                <span className="font-medium">View Analytics</span>
                <span className="text-xs text-[var(--foreground)]/50">Track performance</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

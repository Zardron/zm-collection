"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Eye,
  Package,
  ArrowUp,
  ArrowDown,
  Calendar,
  Download,
  RefreshCw,
  Target,
  Zap,
  Globe,
  Clock,
  BarChart3,
  PieChart,
} from "lucide-react";
import { allProducts } from "@/app/data/products";

// Helper to format currency
function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 0,
  }).format(amount);
}

// Mini Chart Bar Component
function ChartBar({ 
  value, 
  maxValue, 
  label, 
  color = "accent" 
}: { 
  value: number; 
  maxValue: number; 
  label: string;
  color?: "accent" | "emerald" | "blue" | "purple" | "amber";
}) {
  const height = (value / maxValue) * 100;
  const colorClasses = {
    accent: "from-[var(--accent)] to-[var(--accent)]/60",
    emerald: "from-emerald-500 to-emerald-500/60",
    blue: "from-blue-500 to-blue-500/60",
    purple: "from-purple-500 to-purple-500/60",
    amber: "from-amber-500 to-amber-500/60",
  };

  return (
    <div className="flex flex-col items-center gap-2 flex-1">
      <div className="h-32 flex items-end">
        <div
          className={`w-8 md:w-12 rounded-t-lg bg-gradient-to-t ${colorClasses[color]} transition-all duration-500 hover:opacity-80`}
          style={{ height: `${Math.max(height, 5)}%` }}
        />
      </div>
      <span className="text-xs text-[var(--foreground)]/50">{label}</span>
    </div>
  );
}

// Stat Card Component
function StatCard({
  title,
  value,
  change,
  isPositive,
  icon: Icon,
  color = "accent",
}: {
  title: string;
  value: string | number;
  change?: number;
  isPositive?: boolean;
  icon: React.ComponentType<{ className?: string }>;
  color?: "accent" | "emerald" | "blue" | "purple" | "amber";
}) {
  const colorClasses = {
    accent: "bg-[var(--accent)]/10 text-[var(--accent)]",
    emerald: "bg-emerald-500/10 text-emerald-500",
    blue: "bg-blue-500/10 text-blue-500",
    purple: "bg-purple-500/10 text-purple-500",
    amber: "bg-amber-500/10 text-amber-500",
  };

  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm text-[var(--foreground)]/60">{title}</p>
            <p className="text-2xl font-bold text-[var(--foreground)]">{value}</p>
            {change !== undefined && (
              <div className={`flex items-center gap-1 text-sm ${isPositive ? "text-emerald-500" : "text-red-500"}`}>
                {isPositive ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                <span className="font-medium">{Math.abs(change)}%</span>
                <span className="text-[var(--foreground)]/50">vs last period</span>
              </div>
            )}
          </div>
          <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${colorClasses[color]}`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function AdminAnalyticsPage() {
  // Analytics data
  const revenueData = useMemo(
    () => ({
      total: 2847650,
      thisMonth: 847650,
      lastMonth: 712340,
      growth: 19,
      target: 1000000,
      achieved: 85,
    }),
    []
  );

  const ordersData = useMemo(
    () => ({
      total: 1247,
      thisMonth: 342,
      lastMonth: 298,
      growth: 15,
      averageValue: 3240,
      conversionRate: 3.2,
    }),
    []
  );

  const visitorData = useMemo(
    () => ({
      total: 48750,
      thisMonth: 12340,
      lastMonth: 10890,
      growth: 13,
      bounceRate: 42,
      avgDuration: "2m 34s",
    }),
    []
  );

  // Weekly sales data
  const weeklySales = [
    { day: "Mon", amount: 124500 },
    { day: "Tue", amount: 182300 },
    { day: "Wed", amount: 158200 },
    { day: "Thu", amount: 221400 },
    { day: "Fri", amount: 287600 },
    { day: "Sat", amount: 352100 },
    { day: "Sun", amount: 248900 },
  ];
  const maxSales = Math.max(...weeklySales.map((d) => d.amount));

  // Monthly revenue data
  const monthlyRevenue = [
    { month: "Jan", amount: 520000 },
    { month: "Feb", amount: 480000 },
    { month: "Mar", amount: 610000 },
    { month: "Apr", amount: 550000 },
    { month: "May", amount: 680000 },
    { month: "Jun", amount: 720000 },
    { month: "Jul", amount: 650000 },
    { month: "Aug", amount: 710000 },
    { month: "Sep", amount: 780000 },
    { month: "Oct", amount: 820000 },
    { month: "Nov", amount: 890000 },
    { month: "Dec", amount: 847650 },
  ];
  const maxRevenue = Math.max(...monthlyRevenue.map((d) => d.amount));

  // Traffic sources data
  const trafficSources = [
    { source: "Direct", visitors: 4820, percentage: 39, color: "bg-[var(--accent)]" },
    { source: "Social Media", visitors: 3210, percentage: 26, color: "bg-purple-500" },
    { source: "Search", visitors: 2470, percentage: 20, color: "bg-blue-500" },
    { source: "Referral", visitors: 1240, percentage: 10, color: "bg-emerald-500" },
    { source: "Email", visitors: 600, percentage: 5, color: "bg-amber-500" },
  ];

  // Top products by sales
  const topProducts = allProducts.slice(0, 5).map((product, index) => ({
    ...product,
    sales: [247, 189, 156, 134, 98][index],
    revenue: [345353, 264911, 218544, 187966, 137102][index],
    growth: [12, 8, -3, 15, 5][index],
  }));

  // Category performance
  const categoryPerformance = [
    { category: "Lip Tint", orders: 456, revenue: 638400, growth: 18 },
    { category: "Perfume", orders: 312, revenue: 1404000, growth: 12 },
    { category: "Serum", orders: 289, revenue: 404600, growth: 8 },
    { category: "Makeup", orders: 198, revenue: 356400, growth: -2 },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Analytics</h1>
          <p className="text-[var(--foreground)]/60">Monitor your store performance and insights</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            This Month
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Key Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value={formatCurrency(revenueData.total)}
          change={revenueData.growth}
          isPositive={true}
          icon={DollarSign}
          color="emerald"
        />
        <StatCard
          title="Total Orders"
          value={ordersData.total.toLocaleString()}
          change={ordersData.growth}
          isPositive={true}
          icon={ShoppingCart}
          color="blue"
        />
        <StatCard
          title="Total Visitors"
          value={visitorData.total.toLocaleString()}
          change={visitorData.growth}
          isPositive={true}
          icon={Users}
          color="purple"
        />
        <StatCard
          title="Conversion Rate"
          value={`${ordersData.conversionRate}%`}
          change={8}
          isPositive={true}
          icon={Target}
          color="accent"
        />
      </div>

      {/* Revenue Target Progress */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Monthly Revenue Target</CardTitle>
              <p className="text-sm text-[var(--foreground)]/50">
                Progress towards {formatCurrency(revenueData.target)}
              </p>
            </div>
            <Badge variant="success" className="gap-1">
              <Zap className="h-3 w-3" />
              {revenueData.achieved}% Achieved
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold text-[var(--foreground)]">
                  {formatCurrency(revenueData.thisMonth)}
                </p>
                <p className="text-sm text-[var(--foreground)]/50">Current month revenue</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-[var(--foreground)]/70">
                  {formatCurrency(revenueData.target - revenueData.thisMonth)}
                </p>
                <p className="text-sm text-[var(--foreground)]/50">Remaining to target</p>
              </div>
            </div>
            <div className="h-4 rounded-full bg-[var(--foreground)]/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[var(--accent)] to-emerald-500 transition-all duration-1000"
                style={{ width: `${revenueData.achieved}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Weekly Sales Chart */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BarChart3 className="h-5 w-5 text-[var(--accent)]" />
                  Weekly Sales
                </CardTitle>
                <p className="text-sm text-[var(--foreground)]/50">Last 7 days performance</p>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-emerald-500/10 px-3 py-1.5">
                <TrendingUp className="h-4 w-4 text-emerald-500" />
                <span className="text-sm font-medium text-emerald-500">+24.5%</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between gap-2 pt-4">
              {weeklySales.map((data) => (
                <ChartBar key={data.day} value={data.amount} maxValue={maxSales} label={data.day} />
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-[var(--border)]/10">
              <div className="flex justify-between">
                <span className="text-sm text-[var(--foreground)]/50">Total Weekly</span>
                <span className="font-semibold text-[var(--foreground)]">
                  {formatCurrency(weeklySales.reduce((sum, d) => sum + d.amount, 0))}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Revenue Chart */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="h-5 w-5 text-emerald-500" />
                  Monthly Revenue
                </CardTitle>
                <p className="text-sm text-[var(--foreground)]/50">Revenue trend this year</p>
              </div>
              <Badge variant="secondary">2024</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between gap-1 pt-4">
              {monthlyRevenue.map((data, idx) => (
                <ChartBar
                  key={data.month}
                  value={data.amount}
                  maxValue={maxRevenue}
                  label={data.month.slice(0, 1)}
                  color={idx === monthlyRevenue.length - 1 ? "accent" : "emerald"}
                />
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-[var(--border)]/10">
              <div className="flex justify-between">
                <span className="text-sm text-[var(--foreground)]/50">Yearly Total</span>
                <span className="font-semibold text-[var(--foreground)]">
                  {formatCurrency(monthlyRevenue.reduce((sum, d) => sum + d.amount, 0))}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Traffic & Performance Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Traffic Sources */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Globe className="h-5 w-5 text-blue-500" />
              Traffic Sources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trafficSources.map((source) => (
                <div key={source.source} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[var(--foreground)]">{source.source}</span>
                    <span className="text-[var(--foreground)]/60">
                      {source.visitors.toLocaleString()} ({source.percentage}%)
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-[var(--foreground)]/10 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${source.color}`}
                      style={{ width: `${source.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Visitor Insights */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Eye className="h-5 w-5 text-purple-500" />
              Visitor Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1 rounded-lg bg-[var(--accent)]/5 p-3">
                <p className="text-xs text-[var(--foreground)]/50">This Month</p>
                <p className="text-xl font-bold text-[var(--foreground)]">
                  {visitorData.thisMonth.toLocaleString()}
                </p>
              </div>
              <div className="space-y-1 rounded-lg bg-[var(--accent)]/5 p-3">
                <p className="text-xs text-[var(--foreground)]/50">Last Month</p>
                <p className="text-xl font-bold text-[var(--foreground)]">
                  {visitorData.lastMonth.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm text-[var(--foreground)]/70">
                  <Clock className="h-4 w-4" />
                  Avg. Duration
                </span>
                <span className="font-medium text-[var(--foreground)]">{visitorData.avgDuration}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm text-[var(--foreground)]/70">
                  <TrendingDown className="h-4 w-4" />
                  Bounce Rate
                </span>
                <span className="font-medium text-[var(--foreground)]">{visitorData.bounceRate}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Insights */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <ShoppingCart className="h-5 w-5 text-emerald-500" />
              Order Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1 rounded-lg bg-emerald-500/5 p-3">
                <p className="text-xs text-[var(--foreground)]/50">This Month</p>
                <p className="text-xl font-bold text-[var(--foreground)]">{ordersData.thisMonth}</p>
              </div>
              <div className="space-y-1 rounded-lg bg-emerald-500/5 p-3">
                <p className="text-xs text-[var(--foreground)]/50">Last Month</p>
                <p className="text-xl font-bold text-[var(--foreground)]">{ordersData.lastMonth}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--foreground)]/70">Avg. Order Value</span>
                <span className="font-medium text-[var(--foreground)]">
                  {formatCurrency(ordersData.averageValue)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--foreground)]/70">Conversion Rate</span>
                <span className="font-medium text-[var(--foreground)]">{ordersData.conversionRate}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Products & Category Performance */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Package className="h-5 w-5 text-[var(--accent)]" />
              Top Performing Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="flex items-center gap-4 rounded-lg p-2 hover:bg-[var(--accent)]/5 transition-colors"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-bold text-[var(--primary-black)]">
                    {index + 1}
                  </span>
                  <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-[var(--card-bg)]">
                    <Image src={product.image} alt={product.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[var(--foreground)] truncate">{product.name}</p>
                    <p className="text-xs text-[var(--foreground)]/50">{product.sales} sales</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-[var(--accent)]">{formatCurrency(product.revenue)}</p>
                    <p
                      className={`flex items-center justify-end gap-1 text-xs ${
                        product.growth >= 0 ? "text-emerald-500" : "text-red-500"
                      }`}
                    >
                      {product.growth >= 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                      {Math.abs(product.growth)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Category Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <PieChart className="h-5 w-5 text-purple-500" />
              Category Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryPerformance.map((category) => (
                <div
                  key={category.category}
                  className="flex items-center justify-between rounded-lg p-3 bg-[var(--foreground)]/5"
                >
                  <div>
                    <p className="font-medium text-[var(--foreground)]">{category.category}</p>
                    <p className="text-sm text-[var(--foreground)]/50">{category.orders} orders</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-[var(--foreground)]">{formatCurrency(category.revenue)}</p>
                    <p
                      className={`flex items-center justify-end gap-1 text-sm ${
                        category.growth >= 0 ? "text-emerald-500" : "text-red-500"
                      }`}
                    >
                      {category.growth >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {Math.abs(category.growth)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


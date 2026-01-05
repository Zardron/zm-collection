"use client";

import React from "react";
import Link from "next/link";
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
} from "lucide-react";
import { allProducts } from "@/app/data/products";
import { allCollections } from "@/app/data/collections";

export default function AdminDashboard() {
  // Calculate stats from dummy data
  const totalProducts = allProducts.length;
  const activeProducts = allProducts.filter((p) => p.badge !== "Draft").length;
  const outOfStock = 2; // Dummy value
  const totalCollections = new Set(allCollections.map((c) => c.category)).size;

  // Recent orders (dummy data)
  const recentOrders = [
    {
      id: "ORD-001",
      customer: "Maria Santos",
      total: "₱4,599",
      status: "Pending",
      date: "2 hours ago",
    },
    {
      id: "ORD-002",
      customer: "Juan Dela Cruz",
      total: "₱2,199",
      status: "Processing",
      date: "5 hours ago",
    },
    {
      id: "ORD-003",
      customer: "Ana Garcia",
      total: "₱6,799",
      status: "Shipped",
      date: "1 day ago",
    },
    {
      id: "ORD-004",
      customer: "Pedro Reyes",
      total: "₱1,399",
      status: "Delivered",
      date: "2 days ago",
    },
    {
      id: "ORD-005",
      customer: "Sofia Mendoza",
      total: "₱3,849",
      status: "Delivered",
      date: "3 days ago",
    },
  ];

  // Top products (dummy data based on actual products)
  const topProducts = allProducts.slice(0, 5).map((product, index) => ({
    ...product,
    sales: [247, 189, 156, 134, 98][index],
    revenue: ["₱345,353", "₱943,911", "₱342,144", "₱167,966", "₱107,702"][index],
  }));

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "warning" | "default" | "success" | "secondary"> = {
      Pending: "warning",
      Processing: "default",
      Shipped: "success",
      Delivered: "secondary",
    };
    return <Badge variant={variants[status] || "secondary"}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">
            Dashboard
          </h1>
          <p className="text-[var(--foreground)]/60">
            Welcome back! Here&apos;s an overview of your store.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/admin/products/new">
              <Package className="mr-2 h-4 w-4" />
              Add Product
            </Link>
          </Button>
          <Button asChild>
            <Link href="/admin/orders">
              <Eye className="mr-2 h-4 w-4" />
              View Orders
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Products"
          value={totalProducts}
          icon={Package}
          trend={{ value: 12, isPositive: true }}
          description="From all categories"
        />
        <StatCard
          title="Active Products"
          value={activeProducts}
          icon={TrendingUp}
          trend={{ value: 8, isPositive: true }}
          description="Currently listed"
        />
        <StatCard
          title="Out of Stock"
          value={outOfStock}
          icon={ShoppingCart}
          trend={{ value: 2, isPositive: false }}
          description="Needs restocking"
        />
        <StatCard
          title="Collections"
          value={totalCollections}
          icon={FolderOpen}
          description="Product categories"
        />
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Orders */}
        <Card>
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
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between rounded-lg border border-[var(--border)]/10 p-3 hover:bg-[var(--accent)]/5 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-[var(--foreground)]">
                        {order.id}
                      </span>
                      {getStatusBadge(order.status)}
                    </div>
                    <p className="text-sm text-[var(--foreground)]/60">
                      {order.customer}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-[var(--accent)]">
                      {order.total}
                    </p>
                    <p className="flex items-center gap-1 text-xs text-[var(--foreground)]/50">
                      <Clock className="h-3 w-3" />
                      {order.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold">Top Products</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/products" className="text-[var(--accent)]">
                View All
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="flex items-center gap-4 rounded-lg border border-[var(--border)]/10 p-3 hover:bg-[var(--accent)]/5 transition-colors"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent)]/10 text-sm font-bold text-[var(--accent)]">
                    #{index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[var(--foreground)] truncate">
                      {product.name}
                    </p>
                    <p className="text-sm text-[var(--foreground)]/60">
                      {product.sales} sales
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-[var(--accent)]">
                      {product.revenue}
                    </p>
                    <p className="text-xs text-[var(--foreground)]/50">
                      {product.price} each
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-auto flex-col gap-2 p-4" asChild>
              <Link href="/admin/products/new">
                <Package className="h-6 w-6 text-[var(--accent)]" />
                <span>Add New Product</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 p-4" asChild>
              <Link href="/admin/collections">
                <FolderOpen className="h-6 w-6 text-[var(--accent)]" />
                <span>Manage Collections</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 p-4" asChild>
              <Link href="/admin/orders">
                <ShoppingCart className="h-6 w-6 text-[var(--accent)]" />
                <span>View Orders</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 p-4" asChild>
              <Link href="/admin/analytics">
                <TrendingUp className="h-6 w-6 text-[var(--accent)]" />
                <span>View Analytics</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


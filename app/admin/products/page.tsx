"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { DataTable, type Column } from "@/app/components/admin/data-table";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Plus, Pencil, Trash2, MoreHorizontal, Eye } from "lucide-react";
import { allProducts } from "@/app/data/products";

interface AdminProduct {
  id: number;
  name: string;
  price: string;
  originalPrice?: string | null;
  image: string;
  badge?: string;
  category?: string;
  stock: number;
  sku: string;
  status: "Active" | "Draft";
}

// Extend products with admin fields (dummy data)
const adminProducts: AdminProduct[] = allProducts.map((product, index) => ({
  ...product,
  stock: [50, 32, 0, 25, 18, 42, 15, 8, 0, 28, 35][index] || 20,
  sku: `ZM-${String(product.id).padStart(4, "0")}`,
  status: index === 2 || index === 8 ? "Draft" : "Active",
}));

export default function AdminProductsPage() {
  const columns: Column<AdminProduct>[] = [
    {
      key: "product",
      header: "Product",
      cell: (item) => (
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-[var(--card-bg)]">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-medium text-[var(--foreground)]">{item.name}</p>
            <p className="text-sm text-[var(--foreground)]/60">{item.sku}</p>
          </div>
        </div>
      ),
    },
    {
      key: "category",
      header: "Category",
      cell: (item) => (
        <Badge variant="secondary">{item.category || "Uncategorized"}</Badge>
      ),
    },
    {
      key: "price",
      header: "Price",
      cell: (item) => (
        <div>
          <p className="font-semibold text-[var(--accent)]">{item.price}</p>
          {item.originalPrice && (
            <p className="text-xs text-[var(--foreground)]/50 line-through">
              {item.originalPrice}
            </p>
          )}
        </div>
      ),
    },
    {
      key: "stock",
      header: "Stock",
      cell: (item) => (
        <div className="flex items-center gap-2">
          <span
            className={
              item.stock === 0
                ? "text-red-500"
                : item.stock < 10
                ? "text-amber-500"
                : "text-[var(--foreground)]"
            }
          >
            {item.stock}
          </span>
          {item.stock === 0 && (
            <Badge variant="destructive" className="text-xs">
              Out of Stock
            </Badge>
          )}
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (item) => (
        <Badge variant={item.status === "Active" ? "success" : "secondary"}>
          {item.status}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      cell: (item) => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/products/${item.id}`}>
              <Eye className="h-4 w-4 text-[var(--foreground)]/60" />
              <span className="sr-only">View</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/admin/products/${item.id}`}>
              <Pencil className="h-4 w-4 text-[var(--foreground)]/60" />
              <span className="sr-only">Edit</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon">
            <Trash2 className="h-4 w-4 text-red-500/70 hover:text-red-500" />
            <span className="sr-only">Delete</span>
          </Button>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4 text-[var(--foreground)]/60" />
            <span className="sr-only">More actions</span>
          </Button>
        </div>
      ),
      className: "text-right",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">
            Products
          </h1>
          <p className="text-[var(--foreground)]/60">
            Manage your product catalog
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/products/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>

      {/* Stats Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--foreground)]/60">
                Total Products
              </span>
              <span className="text-2xl font-bold text-[var(--foreground)]">
                {adminProducts.length}
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--foreground)]/60">Active</span>
              <span className="text-2xl font-bold text-emerald-500">
                {adminProducts.filter((p) => p.status === "Active").length}
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--foreground)]/60">Draft</span>
              <span className="text-2xl font-bold text-amber-500">
                {adminProducts.filter((p) => p.status === "Draft").length}
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--foreground)]/60">
                Out of Stock
              </span>
              <span className="text-2xl font-bold text-red-500">
                {adminProducts.filter((p) => p.stock === 0).length}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Products</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={adminProducts}
            columns={columns}
            searchPlaceholder="Search products..."
            searchKey="name"
            pageSize={10}
          />
        </CardContent>
      </Card>
    </div>
  );
}


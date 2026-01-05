"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { DataTable, type Column } from "@/app/components/admin/data-table";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Plus, Pencil, Trash2, Eye, FolderOpen } from "lucide-react";
import { allCollections } from "@/app/data/collections";

interface AdminCollection {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
  status: "Public" | "Hidden";
  createdAt: string;
}

// Group products by category to create collections
const categoryGroups = allCollections.reduce((acc, product) => {
  const category = product.category || "Uncategorized";
  if (!acc[category]) {
    acc[category] = [];
  }
  acc[category].push(product);
  return acc;
}, {} as Record<string, typeof allCollections>);

// Create collection data from categories
const adminCollections: AdminCollection[] = Object.entries(categoryGroups).map(
  ([category, products], index) => ({
    id: `col-${index + 1}`,
    name: category,
    description: `Collection of ${category.toLowerCase()} products`,
    image: products[0]?.image || "",
    productCount: products.length,
    status: index % 5 === 0 ? "Hidden" : "Public",
    createdAt: new Date(
      Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000
    ).toLocaleDateString("en-PH", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
  })
);

export default function AdminCollectionsPage() {
  const columns: Column<AdminCollection>[] = [
    {
      key: "collection",
      header: "Collection",
      cell: (item) => (
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-[var(--card-bg)]">
            {item.image ? (
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <FolderOpen className="h-6 w-6 text-[var(--foreground)]/30" />
              </div>
            )}
          </div>
          <div>
            <p className="font-medium text-[var(--foreground)]">{item.name}</p>
            <p className="text-sm text-[var(--foreground)]/60 line-clamp-1">
              {item.description}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "productCount",
      header: "Products",
      cell: (item) => (
        <span className="font-medium text-[var(--foreground)]">
          {item.productCount} items
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (item) => (
        <Badge variant={item.status === "Public" ? "success" : "secondary"}>
          {item.status}
        </Badge>
      ),
    },
    {
      key: "createdAt",
      header: "Created",
      cell: (item) => (
        <span className="text-[var(--foreground)]/60">{item.createdAt}</span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      cell: (item) => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/collections?category=${encodeURIComponent(item.name)}`}>
              <Eye className="h-4 w-4 text-[var(--foreground)]/60" />
              <span className="sr-only">View</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/admin/collections/${item.id}`}>
              <Pencil className="h-4 w-4 text-[var(--foreground)]/60" />
              <span className="sr-only">Edit</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon">
            <Trash2 className="h-4 w-4 text-red-500/70 hover:text-red-500" />
            <span className="sr-only">Delete</span>
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
            Collections
          </h1>
          <p className="text-[var(--foreground)]/60">
            Organize your products into collections
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/collections/new">
            <Plus className="mr-2 h-4 w-4" />
            Create Collection
          </Link>
        </Button>
      </div>

      {/* Stats Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--foreground)]/60">
                Total Collections
              </span>
              <span className="text-2xl font-bold text-[var(--foreground)]">
                {adminCollections.length}
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--foreground)]/60">Public</span>
              <span className="text-2xl font-bold text-emerald-500">
                {adminCollections.filter((c) => c.status === "Public").length}
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--foreground)]/60">Hidden</span>
              <span className="text-2xl font-bold text-amber-500">
                {adminCollections.filter((c) => c.status === "Hidden").length}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Collections Grid View */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {adminCollections.slice(0, 8).map((collection) => (
          <Card
            key={collection.id}
            className="overflow-hidden hover:border-[var(--accent)]/50 transition-colors group"
          >
            <div className="relative aspect-video bg-[var(--card-bg)]">
              {collection.image ? (
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <FolderOpen className="h-12 w-12 text-[var(--foreground)]/20" />
                </div>
              )}
              <Badge
                variant={collection.status === "Public" ? "success" : "secondary"}
                className="absolute top-2 right-2"
              >
                {collection.status}
              </Badge>
            </div>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-[var(--foreground)]">
                    {collection.name}
                  </h3>
                  <p className="text-sm text-[var(--foreground)]/60">
                    {collection.productCount} products
                  </p>
                </div>
                <Button variant="ghost" size="icon" asChild>
                  <Link href={`/admin/collections/${collection.id}`}>
                    <Pencil className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Collections Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Collections</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={adminCollections}
            columns={columns}
            searchPlaceholder="Search collections..."
            searchKey="name"
            pageSize={10}
          />
        </CardContent>
      </Card>
    </div>
  );
}


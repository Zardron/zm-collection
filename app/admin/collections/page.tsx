"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { DataTable, type Column } from "@/app/components/admin/data-table";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  MoreHorizontal,
  ImageIcon,
  Filter,
  X,
  Shirt,
  Package,
  TrendingDown,
  CheckCircle2,
  FileEdit,
  AlertTriangle,
  Tag
} from "lucide-react";
import { allCollections } from "@/app/data/collections";

interface AdminCollection {
  [key: string]: unknown;
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

// Extend collections with admin fields
const adminCollections: AdminCollection[] = allCollections.map((collection, index) => ({
  ...collection,
  stock: [50, 32, 20, 25, 18, 42, 15, 8, 28, 35, 22, 30, 45, 12, 38, 27, 19, 33, 41, 16][index % 20] || 20,
  sku: `ZM-${String(collection.id).padStart(4, "0")}`,
  status: index === 2 || index === 8 ? "Draft" : "Active",
}));

// Get unique categories
const categories = [...new Set(adminCollections.map(c => c.category).filter(Boolean))] as string[];

// Get unique badges
const badges = [...new Set(adminCollections.map(c => c.badge).filter(Boolean))] as string[];

// Image component with fallback
function CollectionImage({ src, alt }: { src: string; alt: string }) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (hasError || !src) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center bg-[#1a1a1a] rounded-lg">
        <ImageIcon className="h-5 w-5 text-[var(--foreground)]/30" />
      </div>
    );
  }

  return (
    <>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#1a1a1a] rounded-lg">
          <ImageIcon className="h-5 w-5 text-[var(--foreground)]/30" />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        onError={() => setHasError(true)}
        onLoad={() => setIsLoading(false)}
      />
    </>
  );
}

// Filter pill component
function FilterPill({
  label,
  active,
  onClick,
  icon: Icon,
  count,
  color = "default"
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  icon?: React.ComponentType<{ className?: string }>;
  count?: number;
  color?: "default" | "success" | "warning" | "danger" | "accent" | "purple";
}) {
  const colorClasses = {
    default: active
      ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)]"
      : "bg-transparent text-[var(--foreground)]/70 border-[var(--foreground)]/20 hover:border-[var(--foreground)]/40",
    success: active
      ? "bg-emerald-500 text-white border-emerald-500"
      : "bg-transparent text-emerald-500/70 border-emerald-500/30 hover:border-emerald-500/60",
    warning: active
      ? "bg-amber-500 text-white border-amber-500"
      : "bg-transparent text-amber-500/70 border-amber-500/30 hover:border-amber-500/60",
    danger: active
      ? "bg-red-500 text-white border-red-500"
      : "bg-transparent text-red-500/70 border-red-500/30 hover:border-red-500/60",
    accent: active
      ? "bg-[var(--accent)] text-[var(--background)] border-[var(--accent)]"
      : "bg-transparent text-[var(--accent)]/70 border-[var(--accent)]/30 hover:border-[var(--accent)]/60",
    purple: active
      ? "bg-purple-500 text-white border-purple-500"
      : "bg-transparent text-purple-500/70 border-purple-500/30 hover:border-purple-500/60",
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
        <span className={`
          ml-1 px-1.5 py-0.5 text-xs rounded-full font-semibold
          ${active ? "bg-white/20" : "bg-[var(--foreground)]/10"}
        `}>
          {count}
        </span>
      )}
    </button>
  );
}

export default function AdminCollectionsPage() {
  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedStock, setSelectedStock] = useState<string[]>([]);
  const [selectedBadges, setSelectedBadges] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(true);

  // Toggle category filter
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // Toggle status filter
  const toggleStatus = (status: string) => {
    setSelectedStatus(prev =>
      prev.includes(status)
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  // Toggle stock filter
  const toggleStock = (stock: string) => {
    setSelectedStock(prev =>
      prev.includes(stock)
        ? prev.filter(s => s !== stock)
        : [...prev, stock]
    );
  };

  // Toggle badge filter
  const toggleBadge = (badge: string) => {
    setSelectedBadges(prev =>
      prev.includes(badge)
        ? prev.filter(b => b !== badge)
        : [...prev, badge]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedStatus([]);
    setSelectedStock([]);
    setSelectedBadges([]);
  };

  // Filter collections based on selections
  const filteredCollections = useMemo(() => {
    return adminCollections.filter(collection => {
      // Category filter
      if (selectedCategories.length > 0 && !selectedCategories.includes(collection.category || "")) {
        return false;
      }

      // Status filter
      if (selectedStatus.length > 0 && !selectedStatus.includes(collection.status)) {
        return false;
      }

      // Stock filter
      if (selectedStock.length > 0) {
        const stockStatus = collection.stock === 0
          ? "out"
          : collection.stock < 10
            ? "low"
            : "in";
        if (!selectedStock.includes(stockStatus)) {
          return false;
        }
      }

      // Badge filter
      if (selectedBadges.length > 0 && !selectedBadges.includes(collection.badge || "")) {
        return false;
      }

      return true;
    });
  }, [selectedCategories, selectedStatus, selectedStock, selectedBadges]);

  const hasActiveFilters = selectedCategories.length > 0 || selectedStatus.length > 0 || selectedStock.length > 0 || selectedBadges.length > 0;

  // Count collections by category
  const categoryCount = (category: string) =>
    adminCollections.filter(c => c.category === category).length;

  // Count collections by status
  const statusCount = (status: string) =>
    adminCollections.filter(c => c.status === status).length;

  // Count collections by stock
  const stockCount = (type: string) => {
    switch (type) {
      case "in": return adminCollections.filter(c => c.stock >= 10).length;
      case "low": return adminCollections.filter(c => c.stock > 0 && c.stock < 10).length;
      case "out": return adminCollections.filter(c => c.stock === 0).length;
      default: return 0;
    }
  };

  // Count collections by badge
  const badgeCount = (badge: string) =>
    adminCollections.filter(c => c.badge === badge).length;

  const columns: Column<AdminCollection>[] = [
    {
      key: "product",
      header: "Item",
      cell: (item) => (
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-[#1a1a1a]">
            <CollectionImage src={item.image} alt={item.name} />
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
            <Link href={`/collections/${item.id}`}>
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

      {/* Stats Summary - Clickable Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card
          className={`cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${!hasActiveFilters ? "ring-2 ring-[var(--foreground)]/20" : ""
            }`}
          onClick={clearFilters}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--foreground)]/60">
                Total Items
              </span>
              <span className="text-2xl font-bold text-[var(--foreground)]">
                {adminCollections.length}
              </span>
            </div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/20 ${selectedStatus.includes("Active") && selectedStatus.length === 1 && selectedCategories.length === 0 && selectedStock.length === 0 && selectedBadges.length === 0
            ? "ring-2 ring-emerald-500 shadow-lg shadow-emerald-500/20"
            : ""
            }`}
          onClick={() => {
            clearFilters();
            setSelectedStatus(["Active"]);
          }}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--foreground)]/60">Active</span>
              <span className="text-2xl font-bold text-emerald-500">
                {adminCollections.filter((c) => c.status === "Active").length}
              </span>
            </div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-amber-500/20 ${selectedStatus.includes("Draft") && selectedStatus.length === 1 && selectedCategories.length === 0 && selectedStock.length === 0 && selectedBadges.length === 0
            ? "ring-2 ring-amber-500 shadow-lg shadow-amber-500/20"
            : ""
            }`}
          onClick={() => {
            clearFilters();
            setSelectedStatus(["Draft"]);
          }}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--foreground)]/60">Draft</span>
              <span className="text-2xl font-bold text-amber-500">
                {adminCollections.filter((c) => c.status === "Draft").length}
              </span>
            </div>
          </CardContent>
        </Card>
        <Card
          className="cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/20"
          onClick={() => setShowFilters(true)}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--foreground)]/60">
                Categories
              </span>
              <span className="text-2xl font-bold text-purple-500">
                {categories.length}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters Section */}
      <Card className="overflow-hidden border-[var(--foreground)]/10">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
                <Filter className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">Filters</CardTitle>
                <p className="text-sm text-[var(--foreground)]/50">
                  {hasActiveFilters
                    ? `Showing ${filteredCollections.length} of ${adminCollections.length} items`
                    : "Refine your collection view"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                >
                  <X className="mr-1 h-4 w-4" />
                  Clear all
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
              >
                {showFilters ? "Hide" : "Show"}
              </Button>
            </div>
          </div>
        </CardHeader>

        <div className={`
          transition-all duration-500 ease-out overflow-hidden
          ${showFilters ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}
        `}>
          <CardContent className="space-y-6 pt-0">
            {/* Category Filter */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Shirt className="h-4 w-4 text-purple-500" />
                <h4 className="text-sm font-semibold text-[var(--foreground)]">Categories</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <FilterPill
                    key={category}
                    label={category}
                    active={selectedCategories.includes(category)}
                    onClick={() => toggleCategory(category)}
                    count={categoryCount(category)}
                    color="purple"
                  />
                ))}
              </div>
            </div>

            {/* Badge Filter */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-[var(--accent)]" />
                <h4 className="text-sm font-semibold text-[var(--foreground)]">Badges</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {badges.map(badge => (
                  <FilterPill
                    key={badge}
                    label={badge}
                    active={selectedBadges.includes(badge)}
                    onClick={() => toggleBadge(badge)}
                    count={badgeCount(badge)}
                    color="accent"
                  />
                ))}
              </div>
            </div>

            {/* Status Filter */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-emerald-500" />
                <h4 className="text-sm font-semibold text-[var(--foreground)]">Status</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                <FilterPill
                  label="Active"
                  active={selectedStatus.includes("Active")}
                  onClick={() => toggleStatus("Active")}
                  icon={CheckCircle2}
                  count={statusCount("Active")}
                  color="success"
                />
                <FilterPill
                  label="Draft"
                  active={selectedStatus.includes("Draft")}
                  onClick={() => toggleStatus("Draft")}
                  icon={FileEdit}
                  count={statusCount("Draft")}
                  color="warning"
                />
              </div>
            </div>

            {/* Stock Filter */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <TrendingDown className="h-4 w-4 text-amber-500" />
                <h4 className="text-sm font-semibold text-[var(--foreground)]">Stock Level</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                <FilterPill
                  label="In Stock"
                  active={selectedStock.includes("in")}
                  onClick={() => toggleStock("in")}
                  count={stockCount("in")}
                  color="success"
                />
                <FilterPill
                  label="Low Stock"
                  active={selectedStock.includes("low")}
                  onClick={() => toggleStock("low")}
                  icon={AlertTriangle}
                  count={stockCount("low")}
                  color="warning"
                />
                <FilterPill
                  label="Out of Stock"
                  active={selectedStock.includes("out")}
                  onClick={() => toggleStock("out")}
                  count={stockCount("out")}
                  color="danger"
                />
              </div>
            </div>

            {/* Active Filters Summary */}
            {hasActiveFilters && (
              <div className="pt-3 border-t border-[var(--foreground)]/10">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-medium text-[var(--foreground)]/50 uppercase tracking-wider">
                    Active filters:
                  </span>
                  {selectedCategories.map(cat => (
                    <span
                      key={cat}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-purple-500/20 text-purple-400"
                    >
                      {cat}
                      <button onClick={() => toggleCategory(cat)} className="hover:text-red-400">
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                  {selectedBadges.map(badge => (
                    <span
                      key={badge}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-[var(--accent)]/20 text-[var(--accent)]"
                    >
                      {badge}
                      <button onClick={() => toggleBadge(badge)} className="hover:text-red-400">
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                  {selectedStatus.map(status => (
                    <span
                      key={status}
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${status === "Active" ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"
                        }`}
                    >
                      {status}
                      <button onClick={() => toggleStatus(status)} className="hover:text-red-400">
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                  {selectedStock.map(stock => (
                    <span
                      key={stock}
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${stock === "in" ? "bg-emerald-500/20 text-emerald-400" :
                        stock === "low" ? "bg-amber-500/20 text-amber-400" :
                          "bg-red-500/20 text-red-400"
                        }`}
                    >
                      {stock === "in" ? "In Stock" : stock === "low" ? "Low Stock" : "Out of Stock"}
                      <button onClick={() => toggleStock(stock)} className="hover:text-red-400">
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </div>
      </Card>

      {/* Collections Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            {hasActiveFilters ? `Filtered Items (${filteredCollections.length})` : "All Collections"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={filteredCollections}
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

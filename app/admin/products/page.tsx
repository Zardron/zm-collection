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
  MoreHorizontal, 
  Eye, 
  ImageIcon,
  Filter,
  X,
  Sparkles,
  Package,
  TrendingDown,
  CheckCircle2,
  FileEdit,
  AlertTriangle
} from "lucide-react";
import { allProducts } from "@/app/data/products";

interface AdminProduct {
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

// Extend products with admin fields (dummy data)
const adminProducts: AdminProduct[] = allProducts.map((product, index) => ({
  ...product,
  stock: [50, 32, 0, 25, 18, 42, 15, 8, 0, 28, 35][index] || 20,
  sku: `ZM-${String(product.id).padStart(4, "0")}`,
  status: index === 2 || index === 8 ? "Draft" : "Active",
}));

// Get unique categories
const categories = [...new Set(adminProducts.map(p => p.category).filter(Boolean))] as string[];

// Image component with fallback
function ProductImage({ src, alt }: { src: string; alt: string }) {
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
  color?: "default" | "success" | "warning" | "danger" | "accent";
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

export default function AdminProductsPage() {
  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedStock, setSelectedStock] = useState<string[]>([]);
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

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedStatus([]);
    setSelectedStock([]);
  };

  // Filter products based on selections
  const filteredProducts = useMemo(() => {
    return adminProducts.filter(product => {
      // Category filter
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category || "")) {
        return false;
      }
      
      // Status filter
      if (selectedStatus.length > 0 && !selectedStatus.includes(product.status)) {
        return false;
      }
      
      // Stock filter
      if (selectedStock.length > 0) {
        const stockStatus = product.stock === 0 
          ? "out" 
          : product.stock < 10 
            ? "low" 
            : "in";
        if (!selectedStock.includes(stockStatus)) {
          return false;
        }
      }
      
      return true;
    });
  }, [selectedCategories, selectedStatus, selectedStock]);

  const hasActiveFilters = selectedCategories.length > 0 || selectedStatus.length > 0 || selectedStock.length > 0;

  // Count products by category
  const categoryCount = (category: string) => 
    adminProducts.filter(p => p.category === category).length;

  // Count products by status
  const statusCount = (status: string) => 
    adminProducts.filter(p => p.status === status).length;

  // Count products by stock
  const stockCount = (type: string) => {
    switch (type) {
      case "in": return adminProducts.filter(p => p.stock >= 10).length;
      case "low": return adminProducts.filter(p => p.stock > 0 && p.stock < 10).length;
      case "out": return adminProducts.filter(p => p.stock === 0).length;
      default: return 0;
    }
  };

  const columns: Column<AdminProduct>[] = [
    {
      key: "product",
      header: "Product",
      cell: (item) => (
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-[#1a1a1a]">
            <ProductImage src={item.image} alt={item.name} />
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

      {/* Stats Summary - Clickable Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card 
          className={`cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${
            !hasActiveFilters ? "ring-2 ring-[var(--foreground)]/20" : ""
          }`}
          onClick={clearFilters}
        >
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
        <Card 
          className={`cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/20 ${
            selectedStatus.includes("Active") && selectedStatus.length === 1 && selectedCategories.length === 0 && selectedStock.length === 0
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
                {adminProducts.filter((p) => p.status === "Active").length}
              </span>
            </div>
          </CardContent>
        </Card>
        <Card 
          className={`cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-amber-500/20 ${
            selectedStatus.includes("Draft") && selectedStatus.length === 1 && selectedCategories.length === 0 && selectedStock.length === 0
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
                {adminProducts.filter((p) => p.status === "Draft").length}
              </span>
            </div>
          </CardContent>
        </Card>
        <Card 
          className={`cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-red-500/20 ${
            selectedStock.includes("out") && selectedStock.length === 1 && selectedCategories.length === 0 && selectedStatus.length === 0
              ? "ring-2 ring-red-500 shadow-lg shadow-red-500/20" 
              : ""
          }`}
          onClick={() => {
            clearFilters();
            setSelectedStock(["out"]);
          }}
        >
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

      {/* Filters Section */}
      <Card className="overflow-hidden border-[var(--foreground)]/10">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent)]/60">
                <Filter className="h-5 w-5 text-[var(--background)]" />
              </div>
              <div>
                <CardTitle className="text-lg">Filters</CardTitle>
                <p className="text-sm text-[var(--foreground)]/50">
                  {hasActiveFilters 
                    ? `Showing ${filteredProducts.length} of ${adminProducts.length} products` 
                    : "Refine your product view"}
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
          ${showFilters ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
        `}>
          <CardContent className="space-y-6 pt-0">
            {/* Category Filter */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[var(--accent)]" />
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
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-[var(--accent)]/20 text-[var(--accent)]"
                    >
                      {cat}
                      <button onClick={() => toggleCategory(cat)} className="hover:text-red-400">
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                  {selectedStatus.map(status => (
                    <span 
                      key={status}
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${
                        status === "Active" ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"
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
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${
                        stock === "in" ? "bg-emerald-500/20 text-emerald-400" : 
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

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            {hasActiveFilters ? `Filtered Products (${filteredProducts.length})` : "All Products"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={filteredProducts}
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

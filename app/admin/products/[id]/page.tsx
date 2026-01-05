"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { Switch } from "@/app/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { ArrowLeft, Save, ImagePlus, X, Trash2 } from "lucide-react";
import { getProductDetails } from "@/app/data/products";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = Number(params.id);
  const product = getProductDetails(productId);

  const [isActive, setIsActive] = React.useState(true);
  const [images, setImages] = React.useState<string[]>(
    product?.image ? [product.image] : []
  );

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">
          Product Not Found
        </h1>
        <p className="text-[var(--foreground)]/60">
          The product you&apos;re looking for doesn&apos;t exist.
        </p>
        <Button asChild>
          <Link href="/admin/products">Back to Products</Link>
        </Button>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // UI only - no data persistence
    alert("Product update is UI only. No data is persisted.");
    router.push("/admin/products");
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this product?")) {
      alert("Delete is UI only. No data is persisted.");
      router.push("/admin/products");
    }
  };

  const categories = [
    "Lip Tint",
    "Perfume",
    "Serum",
    "Makeup",
    "Skincare",
    "Accessories",
  ];

  // Parse price from string
  const parsePrice = (price: string) => {
    return price.replace(/[^0-9.]/g, "");
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/products">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back to products</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">
              Edit Product
            </h1>
            <p className="text-[var(--foreground)]/60">{product.name}</p>
          </div>
        </div>
        <Button variant="destructive" onClick={handleDelete}>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter product name"
                    defaultValue={product.name}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter product description"
                    defaultValue={product.description || ""}
                    rows={5}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Media */}
            <Card>
              <CardHeader>
                <CardTitle>Media</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-4">
                    {images.map((image, index) => (
                      <div
                        key={index}
                        className="relative h-24 w-24 rounded-lg border border-[var(--border)]/20 bg-[var(--card-bg)] overflow-hidden group"
                      >
                        <Image
                          src={image}
                          alt={`Product ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setImages(images.filter((_, i) => i !== index))
                          }
                          className="absolute top-1 right-1 h-6 w-6 rounded-full bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        setImages([
                          ...images,
                          `https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=200&h=200&fit=crop&t=${Date.now()}`,
                        ]);
                      }}
                      className="flex h-24 w-24 flex-col items-center justify-center rounded-lg border-2 border-dashed border-[var(--border)]/30 text-[var(--foreground)]/50 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                    >
                      <ImagePlus className="h-6 w-6 mb-1" />
                      <span className="text-xs">Add Image</span>
                    </button>
                  </div>
                  <p className="text-sm text-[var(--foreground)]/50">
                    Add up to 5 product images. First image will be the main
                    product image.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card>
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="price">Selling Price (₱)</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="0.00"
                      defaultValue={parsePrice(product.price)}
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="originalPrice">
                      Compare at Price (₱)
                      <span className="text-[var(--foreground)]/50 ml-1">
                        Optional
                      </span>
                    </Label>
                    <Input
                      id="originalPrice"
                      type="number"
                      placeholder="0.00"
                      defaultValue={
                        product.originalPrice
                          ? parsePrice(product.originalPrice)
                          : ""
                      }
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Inventory */}
            <Card>
              <CardHeader>
                <CardTitle>Inventory</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="sku">SKU (Stock Keeping Unit)</Label>
                    <Input
                      id="sku"
                      placeholder="ZM-0001"
                      defaultValue={`ZM-${String(product.id).padStart(4, "0")}`}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stock">Stock Quantity</Label>
                    <Input
                      id="stock"
                      type="number"
                      placeholder="0"
                      defaultValue="50"
                      min="0"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Product Details */}
            {product.features && (
              <Card>
                <CardHeader>
                  <CardTitle>Product Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label>Features (one per line)</Label>
                    <Textarea
                      defaultValue={product.features?.join("\n") || ""}
                      rows={5}
                      placeholder="Enter product features, one per line"
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status */}
            <Card>
              <CardHeader>
                <CardTitle>Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-[var(--foreground)]">
                      Active
                    </p>
                    <p className="text-sm text-[var(--foreground)]/60">
                      Product will be visible in the store
                    </p>
                  </div>
                  <Switch checked={isActive} onCheckedChange={setIsActive} />
                </div>
              </CardContent>
            </Card>

            {/* Organization */}
            <Card>
              <CardHeader>
                <CardTitle>Organization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select defaultValue={product.category}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="badge">Badge</Label>
                  <Select
                    defaultValue={product.badge?.toLowerCase().replace(" ", "")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select badge" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="bestseller">Best Seller</SelectItem>
                      <SelectItem value="limited">Limited</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Product Info */}
            <Card>
              <CardHeader>
                <CardTitle>Product Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--foreground)]/60">ID</span>
                  <span className="text-[var(--foreground)]">{product.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--foreground)]/60">Size</span>
                  <span className="text-[var(--foreground)]">
                    {product.size || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--foreground)]/60">Rating</span>
                  <span className="text-[var(--foreground)]">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex flex-col gap-2">
              <Button type="submit" className="w-full">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
              <Button type="button" variant="outline" className="w-full" asChild>
                <Link href="/admin/products">Cancel</Link>
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}


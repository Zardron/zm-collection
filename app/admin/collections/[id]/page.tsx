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
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { ArrowLeft, Save, ImagePlus, Trash2, X } from "lucide-react";
import { allCollections } from "@/app/data/collections";

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
const collectionsData = Object.entries(categoryGroups).map(
  ([category, products], index) => ({
    id: `col-${index + 1}`,
    name: category,
    description: `A curated collection of premium ${category.toLowerCase()} products. Browse our selection of high-quality items designed to enhance your style.`,
    image: products[0]?.image || "",
    products: products,
    isPublic: index % 5 !== 0,
  })
);

export default function EditCollectionPage() {
  const router = useRouter();
  const params = useParams();
  const collectionId = params.id as string;
  
  const collection = collectionsData.find((c) => c.id === collectionId);
  
  const [isPublic, setIsPublic] = React.useState(collection?.isPublic ?? true);
  const [coverImage, setCoverImage] = React.useState<string | null>(
    collection?.image || null
  );

  if (!collection) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">
          Collection Not Found
        </h1>
        <p className="text-[var(--foreground)]/60">
          The collection you&apos;re looking for doesn&apos;t exist.
        </p>
        <Button asChild>
          <Link href="/admin/collections">Back to Collections</Link>
        </Button>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // UI only - no data persistence
    alert("Collection update is UI only. No data is persisted.");
    router.push("/admin/collections");
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this collection?")) {
      alert("Delete is UI only. No data is persisted.");
      router.push("/admin/collections");
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/collections">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back to collections</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">
              Edit Collection
            </h1>
            <p className="text-[var(--foreground)]/60">{collection.name}</p>
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
                <CardTitle>Collection Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Collection Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter collection name"
                    defaultValue={collection.name}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter collection description"
                    defaultValue={collection.description}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Cover Image */}
            <Card>
              <CardHeader>
                <CardTitle>Cover Image</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {coverImage ? (
                    <div className="relative aspect-video rounded-lg border border-[var(--border)]/20 bg-[var(--card-bg)] overflow-hidden group">
                      <Image
                        src={coverImage}
                        alt="Collection cover"
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setCoverImage(null)}
                        className="absolute top-2 right-2 h-8 w-8 rounded-full bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setCoverImage(
                          `https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop&t=${Date.now()}`
                        );
                      }}
                      className="flex aspect-video w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-[var(--border)]/30 text-[var(--foreground)]/50 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                    >
                      <ImagePlus className="h-10 w-10 mb-2" />
                      <span className="text-sm">Add Cover Image</span>
                    </button>
                  )}
                  <p className="text-sm text-[var(--foreground)]/50">
                    Recommended size: 1200x600 pixels
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Products in Collection */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Products in Collection</CardTitle>
                  <Badge variant="secondary">
                    {collection.products.length} products
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  {collection.products.slice(0, 6).map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-3 rounded-lg border border-[var(--border)]/10 p-3 hover:bg-[var(--accent)]/5 transition-colors"
                    >
                      <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-[var(--card-bg)]">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-[var(--foreground)] truncate">
                          {product.name}
                        </p>
                        <p className="text-sm text-[var(--accent)]">
                          {product.price}
                        </p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <X className="h-4 w-4 text-[var(--foreground)]/50" />
                      </Button>
                    </div>
                  ))}
                </div>
                {collection.products.length > 6 && (
                  <p className="mt-4 text-center text-sm text-[var(--foreground)]/60">
                    And {collection.products.length - 6} more products...
                  </p>
                )}
                <Button variant="outline" className="w-full mt-4">
                  Manage Products
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Visibility */}
            <Card>
              <CardHeader>
                <CardTitle>Visibility</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-[var(--foreground)]">
                      Public
                    </p>
                    <p className="text-sm text-[var(--foreground)]/60">
                      Collection will be visible in the store
                    </p>
                  </div>
                  <Switch checked={isPublic} onCheckedChange={setIsPublic} />
                </div>
              </CardContent>
            </Card>

            {/* Collection Info */}
            <Card>
              <CardHeader>
                <CardTitle>Collection Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--foreground)]/60">ID</span>
                  <span className="text-[var(--foreground)]">
                    {collection.id}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--foreground)]/60">Products</span>
                  <span className="text-[var(--foreground)]">
                    {collection.products.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--foreground)]/60">Status</span>
                  <Badge variant={isPublic ? "success" : "secondary"}>
                    {isPublic ? "Public" : "Hidden"}
                  </Badge>
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
                <Link href="/admin/collections">Cancel</Link>
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}


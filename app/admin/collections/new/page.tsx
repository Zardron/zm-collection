"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { Switch } from "@/app/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { ArrowLeft, ImagePlus, X, FolderPlus } from "lucide-react";

// Collection categories based on the collections data
const collectionCategories = [
    "Men's T-Shirt",
    "Men's Shorts",
    "Women's Blouse",
    "Women's Dress",
    "Men's Pants",
    "Accessories",
];

const badgeOptions = ["Best Seller", "New", "Premium", "Limited", "Sale"];

export default function NewCollectionPage() {
    const router = useRouter();
    const [isActive, setIsActive] = useState(true);
    const [images, setImages] = useState<string[]>([]);
    const [collectionName, setCollectionName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [badge, setBadge] = useState("");
    const [price, setPrice] = useState("");
    const [originalPrice, setOriginalPrice] = useState("");
    const [sku, setSku] = useState("");
    const [stock, setStock] = useState("");

    const handleAddImage = () => {
        if (images.length < 5) {
            // Simulate adding an image (in a real app, this would open a file picker)
            const placeholderImages = [
                "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop",
                "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=200&h=200&fit=crop",
                "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop",
                "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=200&h=200&fit=crop",
                "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200&h=200&fit=crop",
            ];
            setImages([...images, placeholderImages[images.length]]);
        }
    };

    const removeImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!collectionName.trim()) {
            alert("Please enter a collection name");
            return;
        }

        // In a real app, this would save to a database
        const newCollection = {
            name: collectionName,
            description,
            category,
            badge,
            price,
            originalPrice,
            sku,
            stock,
            images,
            isActive,
            createdAt: new Date().toISOString(),
        };

        console.log("New Collection:", newCollection);
        alert(
            `Collection "${collectionName}" created!\n\n(Note: This is UI only - data is not persisted)`
        );
        router.push("/admin/collections");
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/admin/collections">
                        <ArrowLeft className="h-5 w-5" />
                        <span className="sr-only">Back to collections</span>
                    </Link>
                </Button>
                <div>
                    <h1 className="text-2xl font-bold text-[var(--foreground)]">
                        Create Collection
                    </h1>
                    <p className="text-[var(--foreground)]/60">
                        Add a new collection to your catalog
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Main Content - Left Column */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Basic Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Basic Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Collection Name</Label>
                                    <Input
                                        id="name"
                                        placeholder="Enter collection name"
                                        value={collectionName}
                                        onChange={(e) => setCollectionName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Enter collection description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
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
                                        {/* Existing Images */}
                                        {images.map((image, index) => (
                                            <div
                                                key={index}
                                                className="relative h-24 w-24 overflow-hidden rounded-lg border border-[var(--border)]/20 bg-[var(--card-bg)] group"
                                            >
                                                <Image
                                                    src={image}
                                                    alt={`Collection image ${index + 1}`}
                                                    fill
                                                    className="object-cover"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    className="absolute top-1 right-1 h-6 w-6 rounded-full bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                                {index === 0 && (
                                                    <span className="absolute bottom-1 left-1 text-[10px] bg-[var(--accent)] text-black px-1.5 py-0.5 rounded font-medium">
                                                        Main
                                                    </span>
                                                )}
                                            </div>
                                        ))}

                                        {/* Add Image Button */}
                                        {images.length < 5 && (
                                            <button
                                                type="button"
                                                onClick={handleAddImage}
                                                className="flex h-24 w-24 flex-col items-center justify-center rounded-lg border-2 border-dashed border-[var(--border)]/30 text-[var(--foreground)]/50 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                                            >
                                                <ImagePlus className="h-6 w-6 mb-1" />
                                                <span className="text-xs">Add Image</span>
                                            </button>
                                        )}
                                    </div>
                                    <p className="text-sm text-[var(--foreground)]/50">
                                        Add up to 5 collection images. First image will be the main
                                        collection image.
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
                                            min="0"
                                            step="0.01"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
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
                                            min="0"
                                            step="0.01"
                                            value={originalPrice}
                                            onChange={(e) => setOriginalPrice(e.target.value)}
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
                                            placeholder="ZM-COL-0001"
                                            value={sku}
                                            onChange={(e) => setSku(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="stock">Stock Quantity</Label>
                                        <Input
                                            id="stock"
                                            type="number"
                                            placeholder="0"
                                            min="0"
                                            value={stock}
                                            onChange={(e) => setStock(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar - Right Column */}
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
                                            {isActive ? "Active" : "Draft"}
                                        </p>
                                        <p className="text-sm text-[var(--foreground)]/60">
                                            {isActive
                                                ? "Collection will be visible in the store"
                                                : "Collection will be hidden from customers"}
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
                                    <select
                                        id="category"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="flex h-10 w-full rounded-md border border-[var(--border)]/30 bg-[var(--card-bg)] px-3 py-2 text-sm text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50"
                                    >
                                        <option value="">Select category</option>
                                        {collectionCategories.map((cat) => (
                                            <option key={cat} value={cat}>
                                                {cat}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="badge">Badge</Label>
                                    <select
                                        id="badge"
                                        value={badge}
                                        onChange={(e) => setBadge(e.target.value)}
                                        className="flex h-10 w-full rounded-md border border-[var(--border)]/30 bg-[var(--card-bg)] px-3 py-2 text-sm text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50"
                                    >
                                        <option value="">Select badge</option>
                                        {badgeOptions.map((b) => (
                                            <option key={b} value={b}>
                                                {b}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Actions */}
                        <div className="flex flex-col gap-2">
                            <Button type="submit" className="w-full">
                                <FolderPlus className="mr-2 h-4 w-4" />
                                Create Collection
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

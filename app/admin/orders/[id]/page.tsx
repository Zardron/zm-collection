"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Textarea } from "@/app/components/ui/textarea";
import { Label } from "@/app/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import {
  ArrowLeft,
  Clock,
  RefreshCw,
  Truck,
  CheckCircle2,
  XCircle,
  Package,
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Calendar,
  Printer,
  Download,
  MessageSquare,
  Save,
  AlertCircle,
} from "lucide-react";

// Order statuses
const orderStatuses = [
  { value: "Pending", label: "Pending", icon: Clock, color: "warning" },
  { value: "Processing", label: "Processing", icon: RefreshCw, color: "default" },
  { value: "Shipped", label: "Shipped", icon: Truck, color: "default" },
  { value: "Delivered", label: "Delivered", icon: CheckCircle2, color: "success" },
  { value: "Cancelled", label: "Cancelled", icon: XCircle, color: "destructive" },
  { value: "Refunded", label: "Refunded", icon: RefreshCw, color: "secondary" },
] as const;

// Payment statuses
const paymentStatuses = [
  { value: "Paid", label: "Paid", color: "success" },
  { value: "Pending", label: "Pending", color: "warning" },
  { value: "Failed", label: "Failed", color: "destructive" },
  { value: "Refunded", label: "Refunded", color: "secondary" },
] as const;

// Dummy order data (in a real app, this would come from an API)
const ordersData: Record<string, {
  id: string;
  customer: string;
  email: string;
  phone: string;
  total: number;
  items: { name: string; quantity: number; price: number; image: string }[];
  status: string;
  paymentStatus: string;
  paymentMethod: string;
  date: string;
  shippingAddress: string;
  billingAddress: string;
  notes: string;
  trackingNumber: string;
}> = {
  "ORD-2024-001": {
    id: "ORD-2024-001",
    customer: "Maria Santos",
    email: "maria.s@email.com",
    phone: "+63 912 345 6789",
    total: 4599,
    items: [
      { name: "Velvet Lip Tint - Rose", quantity: 2, price: 1399, image: "/lip-tint/7811b1f6-b688-4abc-89b9-97653b4bf04a.jpeg" },
      { name: "Hyaluronic Acid Serum", quantity: 1, price: 1799, image: "/serum/2b5aa96a-562a-41b2-9705-7284b0fc2056.jpeg" },
    ],
    status: "Pending",
    paymentStatus: "Paid",
    paymentMethod: "GCash",
    date: "2024-01-15T10:30:00",
    shippingAddress: "123 Main St, Brgy. San Antonio, Manila, Metro Manila 1000",
    billingAddress: "123 Main St, Brgy. San Antonio, Manila, Metro Manila 1000",
    notes: "",
    trackingNumber: "",
  },
  "ORD-2024-002": {
    id: "ORD-2024-002",
    customer: "Juan Dela Cruz",
    email: "juan.dc@email.com",
    phone: "+63 917 234 5678",
    total: 2199,
    items: [
      { name: "Midnight Bloom Perfume", quantity: 1, price: 2199, image: "/perfume/a08f8f04-2d59-438a-b136-66c08dc7c814.jpeg" },
    ],
    status: "Processing",
    paymentStatus: "Paid",
    paymentMethod: "Maya",
    date: "2024-01-15T08:15:00",
    shippingAddress: "456 Oak Ave, Brgy. Loyola Heights, Quezon City, Metro Manila 1108",
    billingAddress: "456 Oak Ave, Brgy. Loyola Heights, Quezon City, Metro Manila 1108",
    notes: "Please handle with care - fragile item",
    trackingNumber: "PH123456789",
  },
  "ORD-2024-003": {
    id: "ORD-2024-003",
    customer: "Ana Garcia",
    email: "ana.g@email.com",
    phone: "+63 918 345 6780",
    total: 6799,
    items: [
      { name: "Velvet Lip Tint - Rose", quantity: 1, price: 1399, image: "/lip-tint/7811b1f6-b688-4abc-89b9-97653b4bf04a.jpeg" },
      { name: "Floral Essence Perfume", quantity: 2, price: 2450, image: "/perfume/b723d408-d6b8-48b6-8cad-3331a4e5f66c.jpeg" },
      { name: "Hyaluronic Acid Serum", quantity: 1, price: 1799, image: "/serum/2b5aa96a-562a-41b2-9705-7284b0fc2056.jpeg" },
    ],
    status: "Shipped",
    paymentStatus: "Paid",
    paymentMethod: "Credit Card",
    date: "2024-01-14T14:20:00",
    shippingAddress: "789 Pine Rd, Brgy. Bel-Air, Makati, Metro Manila 1209",
    billingAddress: "789 Pine Rd, Brgy. Bel-Air, Makati, Metro Manila 1209",
    notes: "",
    trackingNumber: "PH987654321",
  },
};

// Helper to format currency
function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 0,
  }).format(amount);
}

// Helper to format date
function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;

  // Get order data (fallback to first order if not found)
  const orderData = ordersData[orderId] || ordersData["ORD-2024-001"];

  // State for editable fields
  const [status, setStatus] = useState(orderData.status);
  const [paymentStatus, setPaymentStatus] = useState(orderData.paymentStatus);
  const [trackingNumber, setTrackingNumber] = useState(orderData.trackingNumber);
  const [notes, setNotes] = useState(orderData.notes);
  const [isSaving, setIsSaving] = useState(false);

  const getStatusConfig = (statusValue: string) => {
    const found = orderStatuses.find((s) => s.value === statusValue);
    return found || orderStatuses[0];
  };

  const getPaymentConfig = (paymentValue: string) => {
    const found = paymentStatuses.find((s) => s.value === paymentValue);
    return found || paymentStatuses[0];
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    alert(`Order ${orderId} updated successfully!\n\nStatus: ${status}\nPayment: ${paymentStatus}\nTracking: ${trackingNumber || "N/A"}\n\n(UI only - data is not persisted)`);
  };

  const statusConfig = getStatusConfig(status);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/orders">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back to orders</span>
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-[var(--foreground)]">{orderId}</h1>
              <Badge variant={statusConfig.color as "warning" | "default" | "success" | "secondary" | "destructive"} className="gap-1">
                <StatusIcon className="h-3 w-3" />
                {status}
              </Badge>
            </div>
            <p className="text-[var(--foreground)]/60">{formatDate(orderData.date)}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Invoice
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content - Left Column */}
        <div className="space-y-6 lg:col-span-2">
          {/* Order Status Update */}
          <Card className="border-[var(--accent)]/30">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <RefreshCw className="h-5 w-5 text-[var(--accent)]" />
                Update Order Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="status">Order Status</Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {orderStatuses.map((s) => {
                        const Icon = s.icon;
                        return (
                          <SelectItem key={s.value} value={s.value}>
                            <div className="flex items-center gap-2">
                              <Icon className="h-4 w-4" />
                              {s.label}
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paymentStatus">Payment Status</Label>
                  <Select value={paymentStatus} onValueChange={setPaymentStatus}>
                    <SelectTrigger id="paymentStatus">
                      <SelectValue placeholder="Select payment status" />
                    </SelectTrigger>
                    <SelectContent>
                      {paymentStatuses.map((p) => (
                        <SelectItem key={p.value} value={p.value}>
                          {p.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {(status === "Shipped" || status === "Delivered") && (
                <div className="space-y-2">
                  <Label htmlFor="tracking">
                    <Truck className="inline h-4 w-4 mr-1" />
                    Tracking Number
                  </Label>
                  <input
                    id="tracking"
                    type="text"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="Enter tracking number"
                    className="flex h-10 w-full rounded-md border border-[var(--border)]/30 bg-[var(--card-bg)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--foreground)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50"
                  />
                </div>
              )}

              {/* Status Timeline */}
              <div className="pt-4 border-t border-[var(--border)]/10">
                <p className="text-sm font-medium text-[var(--foreground)] mb-3">Status Timeline</p>
                <div className="flex items-center justify-between">
                  {orderStatuses.slice(0, 4).map((s, index) => {
                    const Icon = s.icon;
                    const statusIndex = orderStatuses.findIndex((os) => os.value === status);
                    const isCompleted = index <= statusIndex;
                    const isCurrent = s.value === status;

                    return (
                      <React.Fragment key={s.value}>
                        <div className="flex flex-col items-center gap-1">
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-full transition-all ${
                              isCurrent
                                ? "bg-[var(--accent)] text-[var(--primary-black)] ring-4 ring-[var(--accent)]/20"
                                : isCompleted
                                ? "bg-emerald-500 text-white"
                                : "bg-[var(--foreground)]/10 text-[var(--foreground)]/40"
                            }`}
                          >
                            <Icon className="h-5 w-5" />
                          </div>
                          <span
                            className={`text-xs ${
                              isCurrent ? "text-[var(--accent)] font-semibold" : isCompleted ? "text-emerald-500" : "text-[var(--foreground)]/40"
                            }`}
                          >
                            {s.label}
                          </span>
                        </div>
                        {index < 3 && (
                          <div
                            className={`flex-1 h-1 mx-2 rounded-full ${
                              index < statusIndex ? "bg-emerald-500" : "bg-[var(--foreground)]/10"
                            }`}
                          />
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Package className="h-5 w-5 text-[var(--accent)]" />
                Order Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orderData.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 rounded-lg border border-[var(--border)]/10 p-3"
                  >
                    <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-[var(--card-bg)]">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[var(--foreground)]">{item.name}</p>
                      <p className="text-sm text-[var(--foreground)]/60">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-[var(--accent)]">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                  </div>
                ))}

                <div className="pt-4 border-t border-[var(--border)]/10 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--foreground)]/60">Subtotal</span>
                    <span className="text-[var(--foreground)]">{formatCurrency(orderData.total - 150)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--foreground)]/60">Shipping</span>
                    <span className="text-[var(--foreground)]">{formatCurrency(150)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold pt-2 border-t border-[var(--border)]/10">
                    <span className="text-[var(--foreground)]">Total</span>
                    <span className="text-[var(--accent)]">{formatCurrency(orderData.total)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <MessageSquare className="h-5 w-5 text-[var(--accent)]" />
                Order Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add internal notes about this order..."
                rows={4}
              />
              {orderData.notes && (
                <div className="mt-3 flex items-start gap-2 rounded-lg bg-amber-500/10 border border-amber-500/20 p-3">
                  <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-amber-500">Customer Note</p>
                    <p className="text-sm text-[var(--foreground)]/70">{orderData.notes}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Right Column */}
        <div className="space-y-6">
          {/* Customer Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className="h-5 w-5 text-[var(--accent)]" />
                Customer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-hover)] text-sm font-bold text-[var(--primary-black)]">
                  {orderData.customer.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="font-medium text-[var(--foreground)]">{orderData.customer}</p>
                  <p className="text-sm text-[var(--foreground)]/60">Customer</p>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-[var(--border)]/10">
                <div className="flex items-center gap-2 text-sm text-[var(--foreground)]/70">
                  <Mail className="h-4 w-4" />
                  <a href={`mailto:${orderData.email}`} className="hover:text-[var(--accent)]">
                    {orderData.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm text-[var(--foreground)]/70">
                  <Phone className="h-4 w-4" />
                  <a href={`tel:${orderData.phone}`} className="hover:text-[var(--accent)]">
                    {orderData.phone}
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <MapPin className="h-5 w-5 text-[var(--accent)]" />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-[var(--foreground)]/70 leading-relaxed">
                {orderData.shippingAddress}
              </p>
            </CardContent>
          </Card>

          {/* Payment Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <CreditCard className="h-5 w-5 text-[var(--accent)]" />
                Payment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--foreground)]/60">Method</span>
                <span className="font-medium text-[var(--foreground)]">{orderData.paymentMethod}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--foreground)]/60">Status</span>
                <Badge variant={getPaymentConfig(paymentStatus).color as "success" | "warning" | "destructive" | "secondary"}>
                  {paymentStatus}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--foreground)]/60">Amount</span>
                <span className="font-semibold text-[var(--accent)]">{formatCurrency(orderData.total)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Order Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calendar className="h-5 w-5 text-[var(--accent)]" />
                Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent)]">
                      <Package className="h-4 w-4 text-[var(--primary-black)]" />
                    </div>
                    <div className="flex-1 w-px bg-[var(--border)]/20 my-1" />
                  </div>
                  <div className="pb-4">
                    <p className="font-medium text-[var(--foreground)]">Order Placed</p>
                    <p className="text-sm text-[var(--foreground)]/60">{formatDate(orderData.date)}</p>
                  </div>
                </div>

                {orderData.paymentStatus === "Paid" && (
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500">
                        <CreditCard className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1 w-px bg-[var(--border)]/20 my-1" />
                    </div>
                    <div className="pb-4">
                      <p className="font-medium text-[var(--foreground)]">Payment Received</p>
                      <p className="text-sm text-[var(--foreground)]/60">via {orderData.paymentMethod}</p>
                    </div>
                  </div>
                )}

                {(status === "Shipped" || status === "Delivered") && (
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
                        <Truck className="h-4 w-4 text-white" />
                      </div>
                      {status !== "Delivered" && <div className="flex-1 w-px bg-[var(--border)]/20 my-1" />}
                    </div>
                    <div className="pb-4">
                      <p className="font-medium text-[var(--foreground)]">Shipped</p>
                      <p className="text-sm text-[var(--foreground)]/60">
                        {trackingNumber ? `Tracking: ${trackingNumber}` : "In transit"}
                      </p>
                    </div>
                  </div>
                )}

                {status === "Delivered" && (
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500">
                        <CheckCircle2 className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-[var(--foreground)]">Delivered</p>
                      <p className="text-sm text-[var(--foreground)]/60">Order completed</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}


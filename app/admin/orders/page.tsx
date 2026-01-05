"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { DataTable, type Column } from "@/app/components/admin/data-table";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import {
  Eye,
  MoreHorizontal,
  Filter,
  X,
  ShoppingCart,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  XCircle,
  RefreshCw,
  Download,
  Calendar,
  TrendingUp,
  DollarSign,
} from "lucide-react";

// Dummy order data
interface Order {
  [key: string]: unknown;
  id: string;
  customer: string;
  email: string;
  phone: string;
  total: number;
  items: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled" | "Refunded";
  paymentStatus: "Paid" | "Pending" | "Failed" | "Refunded";
  paymentMethod: string;
  date: string;
  address: string;
}

const ordersData: Order[] = [
  {
    id: "ORD-2024-001",
    customer: "Maria Santos",
    email: "maria.s@email.com",
    phone: "+63 912 345 6789",
    total: 4599,
    items: 3,
    status: "Pending",
    paymentStatus: "Paid",
    paymentMethod: "GCash",
    date: "2024-01-15T10:30:00",
    address: "123 Main St, Manila",
  },
  {
    id: "ORD-2024-002",
    customer: "Juan Dela Cruz",
    email: "juan.dc@email.com",
    phone: "+63 917 234 5678",
    total: 2199,
    items: 1,
    status: "Processing",
    paymentStatus: "Paid",
    paymentMethod: "Maya",
    date: "2024-01-15T08:15:00",
    address: "456 Oak Ave, Quezon City",
  },
  {
    id: "ORD-2024-003",
    customer: "Ana Garcia",
    email: "ana.g@email.com",
    phone: "+63 918 345 6780",
    total: 6799,
    items: 4,
    status: "Shipped",
    paymentStatus: "Paid",
    paymentMethod: "Credit Card",
    date: "2024-01-14T14:20:00",
    address: "789 Pine Rd, Makati",
  },
  {
    id: "ORD-2024-004",
    customer: "Pedro Reyes",
    email: "pedro.r@email.com",
    phone: "+63 919 456 7891",
    total: 1399,
    items: 1,
    status: "Delivered",
    paymentStatus: "Paid",
    paymentMethod: "COD",
    date: "2024-01-13T09:45:00",
    address: "321 Cedar Ln, Pasig",
  },
  {
    id: "ORD-2024-005",
    customer: "Sofia Mendoza",
    email: "sofia.m@email.com",
    phone: "+63 920 567 8902",
    total: 3299,
    items: 2,
    status: "Cancelled",
    paymentStatus: "Refunded",
    paymentMethod: "GCash",
    date: "2024-01-13T16:30:00",
    address: "654 Maple Dr, Taguig",
  },
  {
    id: "ORD-2024-006",
    customer: "Miguel Torres",
    email: "miguel.t@email.com",
    phone: "+63 921 678 9013",
    total: 8999,
    items: 5,
    status: "Processing",
    paymentStatus: "Paid",
    paymentMethod: "Bank Transfer",
    date: "2024-01-15T11:00:00",
    address: "987 Birch St, Paranaque",
  },
  {
    id: "ORD-2024-007",
    customer: "Isabella Cruz",
    email: "isabella.c@email.com",
    phone: "+63 922 789 0124",
    total: 5499,
    items: 3,
    status: "Pending",
    paymentStatus: "Pending",
    paymentMethod: "Maya",
    date: "2024-01-15T12:30:00",
    address: "246 Elm Way, Mandaluyong",
  },
  {
    id: "ORD-2024-008",
    customer: "Carlos Ramos",
    email: "carlos.r@email.com",
    phone: "+63 923 890 1235",
    total: 2899,
    items: 2,
    status: "Shipped",
    paymentStatus: "Paid",
    paymentMethod: "Credit Card",
    date: "2024-01-14T10:15:00",
    address: "135 Walnut Ct, San Juan",
  },
  {
    id: "ORD-2024-009",
    customer: "Elena Villanueva",
    email: "elena.v@email.com",
    phone: "+63 924 901 2346",
    total: 4199,
    items: 3,
    status: "Delivered",
    paymentStatus: "Paid",
    paymentMethod: "GCash",
    date: "2024-01-12T15:45:00",
    address: "864 Cherry Blvd, Pasay",
  },
  {
    id: "ORD-2024-010",
    customer: "Roberto Santos",
    email: "roberto.s@email.com",
    phone: "+63 925 012 3457",
    total: 1899,
    items: 1,
    status: "Refunded",
    paymentStatus: "Refunded",
    paymentMethod: "Maya",
    date: "2024-01-11T09:00:00",
    address: "753 Spruce Ave, Las Pinas",
  },
];

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
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Filter pill component
function FilterPill({
  label,
  active,
  onClick,
  icon: Icon,
  count,
  color = "default",
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  icon?: React.ComponentType<{ className?: string }>;
  count?: number;
  color?: "default" | "success" | "warning" | "danger" | "accent" | "blue" | "purple";
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
    blue: active
      ? "bg-blue-500 text-white border-blue-500"
      : "bg-transparent text-blue-500/70 border-blue-500/30 hover:border-blue-500/60",
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
        <span
          className={`
          ml-1 px-1.5 py-0.5 text-xs rounded-full font-semibold
          ${active ? "bg-white/20" : "bg-[var(--foreground)]/10"}
        `}
        >
          {count}
        </span>
      )}
    </button>
  );
}

export default function AdminOrdersPage() {
  // Filter states
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(true);

  // Toggle status filter
  const toggleStatus = (status: string) => {
    setSelectedStatus((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  };

  // Toggle payment filter
  const togglePayment = (payment: string) => {
    setSelectedPayment((prev) =>
      prev.includes(payment) ? prev.filter((p) => p !== payment) : [...prev, payment]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedStatus([]);
    setSelectedPayment([]);
  };

  // Filter orders based on selections
  const filteredOrders = useMemo(() => {
    return ordersData.filter((order) => {
      if (selectedStatus.length > 0 && !selectedStatus.includes(order.status)) {
        return false;
      }
      if (selectedPayment.length > 0 && !selectedPayment.includes(order.paymentStatus)) {
        return false;
      }
      return true;
    });
  }, [selectedStatus, selectedPayment]);

  const hasActiveFilters = selectedStatus.length > 0 || selectedPayment.length > 0;

  // Count orders by status
  const statusCount = (status: string) => ordersData.filter((o) => o.status === status).length;

  // Count orders by payment status
  const paymentCount = (payment: string) => ordersData.filter((o) => o.paymentStatus === payment).length;

  // Calculate summary stats
  const totalRevenue = ordersData
    .filter((o) => o.paymentStatus === "Paid")
    .reduce((sum, o) => sum + o.total, 0);
  const pendingOrders = ordersData.filter((o) => o.status === "Pending").length;
  const processingOrders = ordersData.filter((o) => o.status === "Processing").length;

  const getStatusConfig = (status: string) => {
    const configs: Record<
      string,
      { variant: "warning" | "default" | "success" | "secondary" | "destructive"; icon: React.ComponentType<{ className?: string }> }
    > = {
      Pending: { variant: "warning", icon: Clock },
      Processing: { variant: "default", icon: RefreshCw },
      Shipped: { variant: "default", icon: Truck },
      Delivered: { variant: "success", icon: CheckCircle2 },
      Cancelled: { variant: "destructive", icon: XCircle },
      Refunded: { variant: "secondary", icon: RefreshCw },
    };
    return configs[status] || { variant: "secondary", icon: Package };
  };

  const getPaymentConfig = (status: string) => {
    const configs: Record<string, { variant: "warning" | "default" | "success" | "secondary" | "destructive" }> = {
      Paid: { variant: "success" },
      Pending: { variant: "warning" },
      Failed: { variant: "destructive" },
      Refunded: { variant: "secondary" },
    };
    return configs[status] || { variant: "secondary" };
  };

  const columns: Column<Order>[] = [
    {
      key: "order",
      header: "Order",
      cell: (item) => (
        <div>
          <p className="font-semibold text-[var(--foreground)]">{item.id}</p>
          <p className="text-sm text-[var(--foreground)]/60">{formatDate(item.date)}</p>
        </div>
      ),
    },
    {
      key: "customer",
      header: "Customer",
      cell: (item) => (
        <div>
          <p className="font-medium text-[var(--foreground)]">{item.customer}</p>
          <p className="text-sm text-[var(--foreground)]/60">{item.email}</p>
        </div>
      ),
    },
    {
      key: "items",
      header: "Items",
      cell: (item) => (
        <span className="text-[var(--foreground)]">
          {item.items} item{item.items > 1 ? "s" : ""}
        </span>
      ),
    },
    {
      key: "total",
      header: "Total",
      cell: (item) => (
        <span className="font-semibold text-[var(--accent)]">{formatCurrency(item.total)}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (item) => {
        const config = getStatusConfig(item.status);
        const Icon = config.icon;
        return (
          <Badge variant={config.variant} className="gap-1">
            <Icon className="h-3 w-3" />
            {item.status}
          </Badge>
        );
      },
    },
    {
      key: "payment",
      header: "Payment",
      cell: (item) => {
        const config = getPaymentConfig(item.paymentStatus);
        return (
          <div>
            <Badge variant={config.variant}>{item.paymentStatus}</Badge>
            <p className="text-xs text-[var(--foreground)]/50 mt-1">{item.paymentMethod}</p>
          </div>
        );
      },
    },
    {
      key: "actions",
      header: "Actions",
      cell: (item) => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/admin/orders/${item.id}`}>
              <Eye className="h-4 w-4 text-[var(--foreground)]/60" />
              <span className="sr-only">View</span>
            </Link>
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
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Orders</h1>
          <p className="text-[var(--foreground)]/60">Manage and track customer orders</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Date Range
          </Button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-[var(--foreground)]/60">Total Orders</span>
                <p className="text-2xl font-bold text-[var(--foreground)]">{ordersData.length}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent)]/10">
                <ShoppingCart className="h-6 w-6 text-[var(--accent)]" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-amber-500/20 ${
            selectedStatus.includes("Pending") && selectedStatus.length === 1
              ? "ring-2 ring-amber-500 shadow-lg shadow-amber-500/20"
              : ""
          }`}
          onClick={() => {
            clearFilters();
            setSelectedStatus(["Pending"]);
          }}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-[var(--foreground)]/60">Pending</span>
                <p className="text-2xl font-bold text-amber-500">{pendingOrders}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10">
                <Clock className="h-6 w-6 text-amber-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/20 ${
            selectedStatus.includes("Processing") && selectedStatus.length === 1
              ? "ring-2 ring-blue-500 shadow-lg shadow-blue-500/20"
              : ""
          }`}
          onClick={() => {
            clearFilters();
            setSelectedStatus(["Processing"]);
          }}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-[var(--foreground)]/60">Processing</span>
                <p className="text-2xl font-bold text-blue-500">{processingOrders}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
                <RefreshCw className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-[var(--foreground)]/60">Revenue</span>
                <p className="text-2xl font-bold text-emerald-500">{formatCurrency(totalRevenue)}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">
                <DollarSign className="h-6 w-6 text-emerald-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters Section */}
      <Card className="overflow-hidden border-[var(--foreground)]/10">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
                <Filter className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">Filters</CardTitle>
                <p className="text-sm text-[var(--foreground)]/50">
                  {hasActiveFilters
                    ? `Showing ${filteredOrders.length} of ${ordersData.length} orders`
                    : "Filter orders by status and payment"}
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
              <Button variant="ghost" size="sm" onClick={() => setShowFilters(!showFilters)}>
                {showFilters ? "Hide" : "Show"}
              </Button>
            </div>
          </div>
        </CardHeader>

        <div
          className={`
          transition-all duration-500 ease-out overflow-hidden
          ${showFilters ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}
        `}
        >
          <CardContent className="space-y-6 pt-0">
            {/* Order Status Filter */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-blue-500" />
                <h4 className="text-sm font-semibold text-[var(--foreground)]">Order Status</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                <FilterPill
                  label="Pending"
                  active={selectedStatus.includes("Pending")}
                  onClick={() => toggleStatus("Pending")}
                  icon={Clock}
                  count={statusCount("Pending")}
                  color="warning"
                />
                <FilterPill
                  label="Processing"
                  active={selectedStatus.includes("Processing")}
                  onClick={() => toggleStatus("Processing")}
                  icon={RefreshCw}
                  count={statusCount("Processing")}
                  color="blue"
                />
                <FilterPill
                  label="Shipped"
                  active={selectedStatus.includes("Shipped")}
                  onClick={() => toggleStatus("Shipped")}
                  icon={Truck}
                  count={statusCount("Shipped")}
                  color="purple"
                />
                <FilterPill
                  label="Delivered"
                  active={selectedStatus.includes("Delivered")}
                  onClick={() => toggleStatus("Delivered")}
                  icon={CheckCircle2}
                  count={statusCount("Delivered")}
                  color="success"
                />
                <FilterPill
                  label="Cancelled"
                  active={selectedStatus.includes("Cancelled")}
                  onClick={() => toggleStatus("Cancelled")}
                  icon={XCircle}
                  count={statusCount("Cancelled")}
                  color="danger"
                />
                <FilterPill
                  label="Refunded"
                  active={selectedStatus.includes("Refunded")}
                  onClick={() => toggleStatus("Refunded")}
                  icon={RefreshCw}
                  count={statusCount("Refunded")}
                  color="default"
                />
              </div>
            </div>

            {/* Payment Status Filter */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-emerald-500" />
                <h4 className="text-sm font-semibold text-[var(--foreground)]">Payment Status</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                <FilterPill
                  label="Paid"
                  active={selectedPayment.includes("Paid")}
                  onClick={() => togglePayment("Paid")}
                  count={paymentCount("Paid")}
                  color="success"
                />
                <FilterPill
                  label="Pending"
                  active={selectedPayment.includes("Pending")}
                  onClick={() => togglePayment("Pending")}
                  count={paymentCount("Pending")}
                  color="warning"
                />
                <FilterPill
                  label="Failed"
                  active={selectedPayment.includes("Failed")}
                  onClick={() => togglePayment("Failed")}
                  count={paymentCount("Failed")}
                  color="danger"
                />
                <FilterPill
                  label="Refunded"
                  active={selectedPayment.includes("Refunded")}
                  onClick={() => togglePayment("Refunded")}
                  count={paymentCount("Refunded")}
                  color="default"
                />
              </div>
            </div>
          </CardContent>
        </div>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>{hasActiveFilters ? `Filtered Orders (${filteredOrders.length})` : "All Orders"}</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={filteredOrders}
            columns={columns}
            searchPlaceholder="Search orders..."
            searchKey="customer"
            pageSize={10}
          />
        </CardContent>
      </Card>
    </div>
  );
}


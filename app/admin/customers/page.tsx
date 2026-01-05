"use client";

import React, { useState, useMemo } from "react";
import { DataTable, type Column } from "@/app/components/admin/data-table";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import {
  MoreHorizontal,
  Filter,
  X,
  Users,
  UserCheck,
  UserX,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShoppingBag,
  DollarSign,
  Star,
  Download,
  UserPlus,
  Crown,
  TrendingUp,
} from "lucide-react";

// Dummy customer data
interface Customer {
  [key: string]: unknown;
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: "Active" | "Inactive";
  tier: "Regular" | "Silver" | "Gold" | "Platinum";
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  joinedDate: string;
  avatar: string;
}

const customersData: Customer[] = [
  {
    id: "CUS-001",
    name: "Maria Santos",
    email: "maria.s@email.com",
    phone: "+63 912 345 6789",
    address: "123 Main St, Manila",
    status: "Active",
    tier: "Platinum",
    totalOrders: 25,
    totalSpent: 125750,
    lastOrderDate: "2024-01-15",
    joinedDate: "2023-03-12",
    avatar: "MS",
  },
  {
    id: "CUS-002",
    name: "Juan Dela Cruz",
    email: "juan.dc@email.com",
    phone: "+63 917 234 5678",
    address: "456 Oak Ave, Quezon City",
    status: "Active",
    tier: "Gold",
    totalOrders: 18,
    totalSpent: 78990,
    lastOrderDate: "2024-01-14",
    joinedDate: "2023-05-20",
    avatar: "JD",
  },
  {
    id: "CUS-003",
    name: "Ana Garcia",
    email: "ana.g@email.com",
    phone: "+63 918 345 6780",
    address: "789 Pine Rd, Makati",
    status: "Active",
    tier: "Silver",
    totalOrders: 12,
    totalSpent: 45600,
    lastOrderDate: "2024-01-13",
    joinedDate: "2023-07-08",
    avatar: "AG",
  },
  {
    id: "CUS-004",
    name: "Pedro Reyes",
    email: "pedro.r@email.com",
    phone: "+63 919 456 7891",
    address: "321 Cedar Ln, Pasig",
    status: "Inactive",
    tier: "Regular",
    totalOrders: 3,
    totalSpent: 8970,
    lastOrderDate: "2023-11-20",
    joinedDate: "2023-09-15",
    avatar: "PR",
  },
  {
    id: "CUS-005",
    name: "Sofia Mendoza",
    email: "sofia.m@email.com",
    phone: "+63 920 567 8902",
    address: "654 Maple Dr, Taguig",
    status: "Active",
    tier: "Gold",
    totalOrders: 15,
    totalSpent: 67800,
    lastOrderDate: "2024-01-12",
    joinedDate: "2023-04-25",
    avatar: "SM",
  },
  {
    id: "CUS-006",
    name: "Miguel Torres",
    email: "miguel.t@email.com",
    phone: "+63 921 678 9013",
    address: "987 Birch St, Paranaque",
    status: "Active",
    tier: "Platinum",
    totalOrders: 32,
    totalSpent: 198500,
    lastOrderDate: "2024-01-15",
    joinedDate: "2023-01-10",
    avatar: "MT",
  },
  {
    id: "CUS-007",
    name: "Isabella Cruz",
    email: "isabella.c@email.com",
    phone: "+63 922 789 0124",
    address: "246 Elm Way, Mandaluyong",
    status: "Active",
    tier: "Silver",
    totalOrders: 8,
    totalSpent: 32400,
    lastOrderDate: "2024-01-10",
    joinedDate: "2023-08-18",
    avatar: "IC",
  },
  {
    id: "CUS-008",
    name: "Carlos Ramos",
    email: "carlos.r@email.com",
    phone: "+63 923 890 1235",
    address: "135 Walnut Ct, San Juan",
    status: "Inactive",
    tier: "Regular",
    totalOrders: 2,
    totalSpent: 5800,
    lastOrderDate: "2023-10-05",
    joinedDate: "2023-09-28",
    avatar: "CR",
  },
  {
    id: "CUS-009",
    name: "Elena Villanueva",
    email: "elena.v@email.com",
    phone: "+63 924 901 2346",
    address: "864 Cherry Blvd, Pasay",
    status: "Active",
    tier: "Gold",
    totalOrders: 20,
    totalSpent: 89650,
    lastOrderDate: "2024-01-11",
    joinedDate: "2023-02-14",
    avatar: "EV",
  },
  {
    id: "CUS-010",
    name: "Roberto Santos",
    email: "roberto.s@email.com",
    phone: "+63 925 012 3457",
    address: "753 Spruce Ave, Las Pinas",
    status: "Active",
    tier: "Regular",
    totalOrders: 5,
    totalSpent: 15900,
    lastOrderDate: "2024-01-08",
    joinedDate: "2023-11-02",
    avatar: "RS",
  },
  {
    id: "CUS-011",
    name: "Carmen Flores",
    email: "carmen.f@email.com",
    phone: "+63 926 123 4568",
    address: "369 Willow St, Muntinlupa",
    status: "Active",
    tier: "Silver",
    totalOrders: 10,
    totalSpent: 42300,
    lastOrderDate: "2024-01-09",
    joinedDate: "2023-06-30",
    avatar: "CF",
  },
  {
    id: "CUS-012",
    name: "Antonio Lim",
    email: "antonio.l@email.com",
    phone: "+63 927 234 5679",
    address: "147 Ash Dr, Caloocan",
    status: "Inactive",
    tier: "Regular",
    totalOrders: 1,
    totalSpent: 2990,
    lastOrderDate: "2023-12-15",
    joinedDate: "2023-12-01",
    avatar: "AL",
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
  color?: "default" | "success" | "warning" | "danger" | "accent" | "blue" | "purple" | "gold";
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
    gold: active
      ? "bg-yellow-500 text-white border-yellow-500"
      : "bg-transparent text-yellow-500/70 border-yellow-500/30 hover:border-yellow-500/60",
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

export default function AdminCustomersPage() {
  // Filter states
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedTier, setSelectedTier] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(true);

  // Toggle status filter
  const toggleStatus = (status: string) => {
    setSelectedStatus((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  };

  // Toggle tier filter
  const toggleTier = (tier: string) => {
    setSelectedTier((prev) =>
      prev.includes(tier) ? prev.filter((t) => t !== tier) : [...prev, tier]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedStatus([]);
    setSelectedTier([]);
  };

  // Filter customers based on selections
  const filteredCustomers = useMemo(() => {
    return customersData.filter((customer) => {
      if (selectedStatus.length > 0 && !selectedStatus.includes(customer.status)) {
        return false;
      }
      if (selectedTier.length > 0 && !selectedTier.includes(customer.tier)) {
        return false;
      }
      return true;
    });
  }, [selectedStatus, selectedTier]);

  const hasActiveFilters = selectedStatus.length > 0 || selectedTier.length > 0;

  // Count customers by status
  const statusCount = (status: string) => customersData.filter((c) => c.status === status).length;

  // Count customers by tier
  const tierCount = (tier: string) => customersData.filter((c) => c.tier === tier).length;

  // Calculate summary stats
  const totalCustomers = customersData.length;
  const activeCustomers = customersData.filter((c) => c.status === "Active").length;
  const totalRevenue = customersData.reduce((sum, c) => sum + c.totalSpent, 0);
  const avgOrderValue = totalRevenue / customersData.reduce((sum, c) => sum + c.totalOrders, 0);

  const getTierConfig = (tier: string) => {
    const configs: Record<
      string,
      { variant: "warning" | "default" | "success" | "secondary"; color: string }
    > = {
      Regular: { variant: "secondary", color: "text-gray-500" },
      Silver: { variant: "default", color: "text-gray-400" },
      Gold: { variant: "warning", color: "text-yellow-500" },
      Platinum: { variant: "success", color: "text-purple-500" },
    };
    return configs[tier] || { variant: "secondary", color: "text-gray-500" };
  };

  const columns: Column<Customer>[] = [
    {
      key: "customer",
      header: "Customer",
      cell: (item) => (
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-hover)] text-sm font-bold text-[var(--primary-black)]">
            {item.avatar}
          </div>
          <div>
            <p className="font-medium text-[var(--foreground)]">{item.name}</p>
            <p className="text-sm text-[var(--foreground)]/60">{item.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "contact",
      header: "Contact",
      cell: (item) => (
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-sm text-[var(--foreground)]/70">
            <Phone className="h-3.5 w-3.5" />
            {item.phone}
          </div>
          <div className="flex items-center gap-1.5 text-sm text-[var(--foreground)]/50">
            <MapPin className="h-3.5 w-3.5" />
            <span className="truncate max-w-[150px]">{item.address}</span>
          </div>
        </div>
      ),
    },
    {
      key: "tier",
      header: "Tier",
      cell: (item) => {
        const config = getTierConfig(item.tier);
        return (
          <div className="flex items-center gap-2">
            {item.tier === "Platinum" && <Crown className="h-4 w-4 text-purple-500" />}
            {item.tier === "Gold" && <Star className="h-4 w-4 text-yellow-500" />}
            <Badge variant={config.variant}>{item.tier}</Badge>
          </div>
        );
      },
    },
    {
      key: "orders",
      header: "Orders",
      cell: (item) => (
        <div>
          <p className="font-semibold text-[var(--foreground)]">{item.totalOrders}</p>
          <p className="text-xs text-[var(--foreground)]/50">Last: {formatDate(item.lastOrderDate)}</p>
        </div>
      ),
    },
    {
      key: "spent",
      header: "Total Spent",
      cell: (item) => (
        <span className="font-semibold text-[var(--accent)]">{formatCurrency(item.totalSpent)}</span>
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
      cell: () => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon">
            <Mail className="h-4 w-4 text-[var(--foreground)]/60" />
            <span className="sr-only">Email</span>
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
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Customers</h1>
          <p className="text-[var(--foreground)]/60">Manage your customer base and insights</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Customer
          </Button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-[var(--foreground)]/60">Total Customers</span>
                <p className="text-2xl font-bold text-[var(--foreground)]">{totalCustomers}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent)]/10">
                <Users className="h-6 w-6 text-[var(--accent)]" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/20 ${
            selectedStatus.includes("Active") && selectedStatus.length === 1
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
              <div>
                <span className="text-sm text-[var(--foreground)]/60">Active</span>
                <p className="text-2xl font-bold text-emerald-500">{activeCustomers}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">
                <UserCheck className="h-6 w-6 text-emerald-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-[var(--foreground)]/60">Total Revenue</span>
                <p className="text-2xl font-bold text-purple-500">{formatCurrency(totalRevenue)}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10">
                <DollarSign className="h-6 w-6 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-[var(--foreground)]/60">Avg Order Value</span>
                <p className="text-2xl font-bold text-blue-500">{formatCurrency(avgOrderValue)}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
                <TrendingUp className="h-6 w-6 text-blue-500" />
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
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
                <Filter className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">Filters</CardTitle>
                <p className="text-sm text-[var(--foreground)]/50">
                  {hasActiveFilters
                    ? `Showing ${filteredCustomers.length} of ${customersData.length} customers`
                    : "Filter customers by status and tier"}
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
            {/* Status Filter */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <UserCheck className="h-4 w-4 text-emerald-500" />
                <h4 className="text-sm font-semibold text-[var(--foreground)]">Status</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                <FilterPill
                  label="Active"
                  active={selectedStatus.includes("Active")}
                  onClick={() => toggleStatus("Active")}
                  icon={UserCheck}
                  count={statusCount("Active")}
                  color="success"
                />
                <FilterPill
                  label="Inactive"
                  active={selectedStatus.includes("Inactive")}
                  onClick={() => toggleStatus("Inactive")}
                  icon={UserX}
                  count={statusCount("Inactive")}
                  color="default"
                />
              </div>
            </div>

            {/* Tier Filter */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Crown className="h-4 w-4 text-purple-500" />
                <h4 className="text-sm font-semibold text-[var(--foreground)]">Customer Tier</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                <FilterPill
                  label="Regular"
                  active={selectedTier.includes("Regular")}
                  onClick={() => toggleTier("Regular")}
                  count={tierCount("Regular")}
                  color="default"
                />
                <FilterPill
                  label="Silver"
                  active={selectedTier.includes("Silver")}
                  onClick={() => toggleTier("Silver")}
                  icon={Star}
                  count={tierCount("Silver")}
                  color="default"
                />
                <FilterPill
                  label="Gold"
                  active={selectedTier.includes("Gold")}
                  onClick={() => toggleTier("Gold")}
                  icon={Star}
                  count={tierCount("Gold")}
                  color="gold"
                />
                <FilterPill
                  label="Platinum"
                  active={selectedTier.includes("Platinum")}
                  onClick={() => toggleTier("Platinum")}
                  icon={Crown}
                  count={tierCount("Platinum")}
                  color="purple"
                />
              </div>
            </div>
          </CardContent>
        </div>
      </Card>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>{hasActiveFilters ? `Filtered Customers (${filteredCustomers.length})` : "All Customers"}</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={filteredCustomers}
            columns={columns}
            searchPlaceholder="Search customers..."
            searchKey="name"
            pageSize={10}
          />
        </CardContent>
      </Card>
    </div>
  );
}


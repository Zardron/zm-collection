import {
  LayoutDashboard,
  Package,
  FolderOpen,
  Settings,
  ShoppingCart,
  Users,
  BarChart3,
  type LucideIcon,
} from "lucide-react";

export interface MenuItem {
  title: string;
  href: string;
  icon: LucideIcon;
  badge?: string | number;
  badgeVariant?: "default" | "warning" | "success";
  submenu?: MenuItem[];
}

export interface MenuSection {
  title?: string;
  items: MenuItem[];
}

// Function to create admin menu with dynamic counts
export function createAdminMenu(counts?: {
  products?: number;
  collections?: number;
  orders?: number;
  pendingOrders?: number;
}): MenuSection[] {
  return [
    {
      items: [
        {
          title: "Dashboard",
          href: "/admin",
          icon: LayoutDashboard,
        },
      ],
    },
    {
      title: "Catalog",
      items: [
        {
          title: "Products",
          href: "/admin/products",
          icon: Package,
          badge: counts?.products ?? 11,
        },
        {
          title: "Collections",
          href: "/admin/collections",
          icon: FolderOpen,
          badge: counts?.collections ?? 6,
        },
      ],
    },
    {
      title: "Sales",
      items: [
        {
          title: "Orders",
          href: "/admin/orders",
          icon: ShoppingCart,
          badge: counts?.pendingOrders ?? 5,
          badgeVariant: (counts?.pendingOrders ?? 5) > 0 ? "warning" : "default",
        },
        {
          title: "Customers",
          href: "/admin/customers",
          icon: Users,
        },
        {
          title: "Analytics",
          href: "/admin/analytics",
          icon: BarChart3,
        },
      ],
    },
    {
      title: "Settings",
      items: [
        {
          title: "Settings",
          href: "/admin/settings",
          icon: Settings,
        },
      ],
    },
  ];
}

// Default menu for static imports
export const adminMenu: MenuSection[] = createAdminMenu();

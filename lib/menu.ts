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
  badge?: string;
  submenu?: MenuItem[];
}

export interface MenuSection {
  title?: string;
  items: MenuItem[];
}

export const adminMenu: MenuSection[] = [
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
        badge: "11",
      },
      {
        title: "Collections",
        href: "/admin/collections",
        icon: FolderOpen,
        badge: "20",
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
        badge: "5",
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


"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { Switch } from "@/app/components/ui/switch";
import { Badge } from "@/app/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import {
  Store,
  Globe,
  CreditCard,
  Truck,
  Bell,
  Shield,
  Palette,
  Mail,
  Phone,
  MapPin,
  Save,
  Upload,
  ExternalLink,
  Check,
  AlertCircle,
  Settings,
  User,
  Key,
  Smartphone,
  Languages,
} from "lucide-react";

// Settings Section Component
function SettingsSection({
  title,
  description,
  icon: Icon,
  children,
  badge,
}: {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  badge?: string;
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent)]/10">
              <Icon className="h-5 w-5 text-[var(--accent)]" />
            </div>
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
          </div>
          {badge && <Badge variant="secondary">{badge}</Badge>}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  );
}

// Toggle Setting Component
function ToggleSetting({
  title,
  description,
  checked,
  onCheckedChange,
  icon: Icon,
}: {
  title: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-[var(--border)]/10 p-4">
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--foreground)]/5">
            <Icon className="h-4 w-4 text-[var(--foreground)]/60" />
          </div>
        )}
        <div>
          <p className="font-medium text-[var(--foreground)]">{title}</p>
          <p className="text-sm text-[var(--foreground)]/60">{description}</p>
        </div>
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}

export default function AdminSettingsPage() {
  // Store settings
  const [storeName, setStoreName] = useState("ZM Collection");
  const [storeEmail, setStoreEmail] = useState("hello@zmcollection.com");
  const [storePhone, setStorePhone] = useState("+63 912 345 6789");
  const [storeAddress, setStoreAddress] = useState("123 Fashion Street, Manila, Philippines");
  const [storeDescription, setStoreDescription] = useState(
    "Premium beauty and fashion e-commerce store offering curated collections of cosmetics, skincare, and clothing."
  );

  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [orderNotifications, setOrderNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [lowStockAlerts, setLowStockAlerts] = useState(true);
  const [customerReviews, setCustomerReviews] = useState(true);

  // Payment settings
  const [gcashEnabled, setGcashEnabled] = useState(true);
  const [mayaEnabled, setMayaEnabled] = useState(true);
  const [codEnabled, setCodEnabled] = useState(true);
  const [creditCardEnabled, setCreditCardEnabled] = useState(false);

  // Shipping settings
  const [freeShippingThreshold, setFreeShippingThreshold] = useState("1500");
  const [defaultShippingRate, setDefaultShippingRate] = useState("150");
  const [expressShippingRate, setExpressShippingRate] = useState("300");

  // Security settings
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState("30");

  const handleSaveSettings = () => {
    alert("Settings saved successfully! (UI only - data is not persisted)");
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Settings</h1>
          <p className="text-[var(--foreground)]/60">Manage your store preferences and configurations</p>
        </div>
        <Button onClick={handleSaveSettings}>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      {/* Settings Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Store Information */}
        <SettingsSection
          title="Store Information"
          description="Basic information about your store"
          icon={Store}
        >
          <div className="flex items-center gap-4 pb-4 border-b border-[var(--border)]/10">
            <div className="relative h-20 w-20 overflow-hidden rounded-xl bg-[var(--card-bg)]">
              <Image src="/ZM-logo.png" alt="Store Logo" fill className="object-cover" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-[var(--foreground)]">Store Logo</p>
              <p className="text-sm text-[var(--foreground)]/60">Recommended: 200x200px PNG</p>
              <Button variant="outline" size="sm" className="mt-2">
                <Upload className="mr-2 h-4 w-4" />
                Upload Logo
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="storeName">Store Name</Label>
            <Input id="storeName" value={storeName} onChange={(e) => setStoreName(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="storeDescription">Store Description</Label>
            <Textarea
              id="storeDescription"
              value={storeDescription}
              onChange={(e) => setStoreDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="storeEmail">
                <Mail className="inline h-4 w-4 mr-1" />
                Email
              </Label>
              <Input
                id="storeEmail"
                type="email"
                value={storeEmail}
                onChange={(e) => setStoreEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="storePhone">
                <Phone className="inline h-4 w-4 mr-1" />
                Phone
              </Label>
              <Input id="storePhone" value={storePhone} onChange={(e) => setStorePhone(e.target.value)} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="storeAddress">
              <MapPin className="inline h-4 w-4 mr-1" />
              Address
            </Label>
            <Input
              id="storeAddress"
              value={storeAddress}
              onChange={(e) => setStoreAddress(e.target.value)}
            />
          </div>
        </SettingsSection>

        {/* Notification Settings */}
        <SettingsSection
          title="Notifications"
          description="Configure how you receive updates"
          icon={Bell}
        >
          <ToggleSetting
            title="Email Notifications"
            description="Receive important updates via email"
            checked={emailNotifications}
            onCheckedChange={setEmailNotifications}
            icon={Mail}
          />
          <ToggleSetting
            title="Order Notifications"
            description="Get notified when orders are placed"
            checked={orderNotifications}
            onCheckedChange={setOrderNotifications}
            icon={Bell}
          />
          <ToggleSetting
            title="Low Stock Alerts"
            description="Alert when products are running low"
            checked={lowStockAlerts}
            onCheckedChange={setLowStockAlerts}
            icon={AlertCircle}
          />
          <ToggleSetting
            title="Customer Reviews"
            description="Get notified about new reviews"
            checked={customerReviews}
            onCheckedChange={setCustomerReviews}
            icon={User}
          />
          <ToggleSetting
            title="Marketing Emails"
            description="Receive promotional content and tips"
            checked={marketingEmails}
            onCheckedChange={setMarketingEmails}
            icon={Globe}
          />
        </SettingsSection>

        {/* Payment Methods */}
        <SettingsSection
          title="Payment Methods"
          description="Configure accepted payment options"
          icon={CreditCard}
          badge="4 active"
        >
          <ToggleSetting
            title="GCash"
            description="Accept payments via GCash"
            checked={gcashEnabled}
            onCheckedChange={setGcashEnabled}
          />
          <ToggleSetting
            title="Maya (PayMaya)"
            description="Accept payments via Maya"
            checked={mayaEnabled}
            onCheckedChange={setMayaEnabled}
          />
          <ToggleSetting
            title="Cash on Delivery"
            description="Accept COD payments"
            checked={codEnabled}
            onCheckedChange={setCodEnabled}
          />
          <ToggleSetting
            title="Credit/Debit Card"
            description="Accept card payments"
            checked={creditCardEnabled}
            onCheckedChange={setCreditCardEnabled}
          />

          <div className="pt-4 border-t border-[var(--border)]/10">
            <Button variant="outline" className="w-full">
              <ExternalLink className="mr-2 h-4 w-4" />
              Configure Payment Gateway
            </Button>
          </div>
        </SettingsSection>

        {/* Shipping Settings */}
        <SettingsSection
          title="Shipping"
          description="Configure shipping rates and options"
          icon={Truck}
        >
          <div className="space-y-2">
            <Label htmlFor="freeShipping">Free Shipping Threshold (₱)</Label>
            <Input
              id="freeShipping"
              type="number"
              value={freeShippingThreshold}
              onChange={(e) => setFreeShippingThreshold(e.target.value)}
              placeholder="Order amount for free shipping"
            />
            <p className="text-xs text-[var(--foreground)]/50">
              Orders above this amount qualify for free shipping
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="defaultShipping">Standard Rate (₱)</Label>
              <Input
                id="defaultShipping"
                type="number"
                value={defaultShippingRate}
                onChange={(e) => setDefaultShippingRate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expressShipping">Express Rate (₱)</Label>
              <Input
                id="expressShipping"
                type="number"
                value={expressShippingRate}
                onChange={(e) => setExpressShippingRate(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Default Shipping Method</Label>
            <Select defaultValue="standard">
              <SelectTrigger>
                <SelectValue placeholder="Select method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard Shipping (3-5 days)</SelectItem>
                <SelectItem value="express">Express Shipping (1-2 days)</SelectItem>
                <SelectItem value="same-day">Same Day Delivery</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </SettingsSection>

        {/* Security Settings */}
        <SettingsSection
          title="Security"
          description="Protect your account and data"
          icon={Shield}
        >
          <ToggleSetting
            title="Two-Factor Authentication"
            description="Add an extra layer of security"
            checked={twoFactorAuth}
            onCheckedChange={setTwoFactorAuth}
            icon={Smartphone}
          />

          <div className="space-y-2">
            <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
            <Select value={sessionTimeout} onValueChange={setSessionTimeout}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="60">1 hour</SelectItem>
                <SelectItem value="120">2 hours</SelectItem>
                <SelectItem value="never">Never</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="pt-4 space-y-2 border-t border-[var(--border)]/10">
            <Button variant="outline" className="w-full">
              <Key className="mr-2 h-4 w-4" />
              Change Password
            </Button>
            <Button variant="outline" className="w-full">
              <Settings className="mr-2 h-4 w-4" />
              Manage API Keys
            </Button>
          </div>
        </SettingsSection>

        {/* Display Settings */}
        <SettingsSection
          title="Display & Localization"
          description="Customize appearance and regional settings"
          icon={Palette}
        >
          <div className="space-y-2">
            <Label>Currency</Label>
            <Select defaultValue="php">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="php">Philippine Peso (₱)</SelectItem>
                <SelectItem value="usd">US Dollar ($)</SelectItem>
                <SelectItem value="eur">Euro (€)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>
              <Languages className="inline h-4 w-4 mr-1" />
              Language
            </Label>
            <Select defaultValue="en">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="tl">Filipino (Tagalog)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Timezone</Label>
            <Select defaultValue="asia-manila">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asia-manila">Asia/Manila (GMT+8)</SelectItem>
                <SelectItem value="utc">UTC</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Date Format</Label>
            <Select defaultValue="mdy">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </SettingsSection>
      </div>

      {/* Save Button (Mobile) */}
      <div className="flex justify-end md:hidden">
        <Button onClick={handleSaveSettings} className="w-full">
          <Save className="mr-2 h-4 w-4" />
          Save All Changes
        </Button>
      </div>

      {/* Status Banner */}
      <Card className="border-emerald-500/30 bg-emerald-500/5">
        <CardContent className="flex items-center gap-3 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20">
            <Check className="h-5 w-5 text-emerald-500" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-[var(--foreground)]">Store is Online</p>
            <p className="text-sm text-[var(--foreground)]/60">
              Your store is live and accepting orders. Last updated: Just now
            </p>
          </div>
          <Badge variant="success">Active</Badge>
        </CardContent>
      </Card>
    </div>
  );
}


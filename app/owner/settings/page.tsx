"use client";

import Link from "next/link";
import { BarChart3, Home, Package, Settings, ShoppingCart, Store, Users } from "lucide-react";
import { isAdminEmail } from "@/lib/authConfig";
import { useAuthStore } from "@/store/useAuthStore";

export default function OwnerSettingsPage() {
  const currentUser = useAuthStore((state) => state.currentUser);

  if (!currentUser || currentUser.role !== "owner" || !isAdminEmail(currentUser.email)) return null;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <OwnerNav active="settings" />
        <section className="rounded-2xl border bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800">Owner Settings</h1>
          <p className="mt-1 text-sm text-gray-500">Manage store preferences for the owner panel.</p>
          <div className="mt-6 rounded-xl border p-5">
            <Store className="mb-3 h-6 w-6 text-cyan-600" />
            <h2 className="font-semibold text-gray-800">Rainbow Aqua Store</h2>
            <p className="mt-1 text-sm text-gray-500">
              Store settings are ready for future configuration such as notifications, operating hours, and fulfilment rules.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

function OwnerNav({ active }: { active: string }) {
  const links = [
    { href: "/owner/dashboard", label: "Dashboard", icon: Home, key: "dashboard" },
    { href: "/owner/products", label: "Products", icon: Package, key: "products" },
    { href: "/owner/orders", label: "Orders", icon: ShoppingCart, key: "orders" },
    { href: "/owner/customers", label: "Customers", icon: Users, key: "customers" },
    { href: "/owner/reports", label: "Reports", icon: BarChart3, key: "reports" },
    { href: "/owner/settings", label: "Settings", icon: Settings, key: "settings" },
  ];

  return (
    <nav className="mb-6 flex flex-wrap gap-2">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${
            active === link.key ? "bg-slate-900 text-white" : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          <link.icon className="h-4 w-4" />
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

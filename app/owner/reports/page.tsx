"use client";

import Link from "next/link";
import { BarChart3, Home, Package, Settings, ShoppingCart, TrendingUp, Users } from "lucide-react";
import { isAdminEmail } from "@/lib/authConfig";
import { useAuthStore } from "@/store/useAuthStore";

const metrics = [
  { label: "Monthly Revenue", value: "Rs. 2,45,890", change: "+12.5%" },
  { label: "Orders", value: "1,234", change: "+8.2%" },
  { label: "Repeat Customers", value: "42%", change: "+4.1%" },
];

export default function OwnerReportsPage() {
  const currentUser = useAuthStore((state) => state.currentUser);

  if (!currentUser || currentUser.role !== "owner" || !isAdminEmail(currentUser.email)) return null;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <OwnerNav active="reports" />
        <section className="rounded-2xl border bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800">Reports</h1>
          <p className="mt-1 text-sm text-gray-500">Quick performance overview for the owner panel.</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {metrics.map((metric) => (
              <article key={metric.label} className="rounded-xl border p-5">
                <TrendingUp className="mb-3 h-5 w-5 text-cyan-600" />
                <p className="text-sm text-gray-500">{metric.label}</p>
                <p className="mt-1 text-2xl font-bold text-gray-800">{metric.value}</p>
                <p className="mt-1 text-sm text-green-600">{metric.change}</p>
              </article>
            ))}
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

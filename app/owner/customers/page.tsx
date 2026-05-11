"use client";

import { useEffect } from "react";
import Link from "next/link";
import { BarChart3, Home, Mail, MapPin, Package, Phone, Settings, ShoppingCart, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/store/useAuthStore";
import { isAdminEmail } from "@/lib/authConfig";

export default function OwnerCustomersPage() {
  const { currentUser, users, getAllOrders, fetchAdminData } = useAuthStore();

  useEffect(() => {
    fetchAdminData();
  }, [fetchAdminData]);

  if (!currentUser || currentUser.role !== "owner" || !isAdminEmail(currentUser.email)) return null;

  const orders = getAllOrders();
  const customers = users
    .filter((user) => user.role === "user")
    .map((user) => ({
      ...user,
      orderCount: orders.filter((order) => order.userId === user.id).length,
      totalSpend: orders
        .filter((order) => order.userId === user.id)
        .reduce((sum, order) => sum + order.total, 0),
    }));

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <OwnerNav active="customers" />
        <section className="rounded-2xl border bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800">Customers</h1>
          <p className="mt-1 text-sm text-gray-500">Real customer profiles and order counts from Firestore.</p>

          <div className="mt-6 overflow-hidden rounded-xl border">
            {customers.map((customer) => (
              <div key={customer.id} className="flex flex-col gap-4 border-b p-4 last:border-b-0 lg:flex-row lg:items-center lg:justify-between">
                <div className="min-w-0">
                  <p className="font-semibold text-gray-800">{customer.name}</p>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                    {customer.email && <span className="inline-flex items-center gap-1"><Mail className="h-3.5 w-3.5" />{customer.email}</span>}
                    <span className="inline-flex items-center gap-1"><Phone className="h-3.5 w-3.5" />{customer.mobile}</span>
                    <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{customer.address?.district || "No district"}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge>{customer.orderCount} orders</Badge>
                  <Badge variant="outline">Rs. {customer.totalSpend.toLocaleString("en-IN")} spent</Badge>
                </div>
              </div>
            ))}
            {customers.length === 0 && (
              <div className="p-8 text-center text-sm text-gray-400">No customers found in Firestore.</div>
            )}
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

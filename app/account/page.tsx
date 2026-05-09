"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Bell,
  ChevronRight,
  CreditCard,
  Edit,
  Heart,
  LogOut,
  MapPin,
  Package,
  Settings,
  Shield,
  ShoppingBag,
  User,
} from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useWishlistStore } from "@/lib/store";
import { useAuthStore } from "@/store/useAuthStore";

const emptyUser = {
  name: "",
  email: "",
  phone: "",
  memberSince: "",
  district: "",
};

const menuItems = [
  { icon: Package, label: "My Orders", href: "/account/orders", countKey: "orders" },
  { icon: Heart, label: "Wishlist", href: "/account/wishlist", countKey: "wishlist" },
  { icon: MapPin, label: "Addresses", href: "/account/addresses" },
  { icon: CreditCard, label: "Payment Methods", href: "/account/payments" },
  { icon: Bell, label: "Notifications", href: "/account/notifications" },
  { icon: Shield, label: "Security", href: "/account/security" },
  { icon: Settings, label: "Settings", href: "/account/settings" },
];

const statusColors: Record<string, string> = {
  delivered: "bg-green-100 text-green-700",
  shipped: "bg-blue-100 text-blue-700",
  processing: "bg-yellow-100 text-yellow-700",
  pending: "bg-orange-100 text-orange-700",
  confirmed: "bg-cyan-100 text-cyan-700",
  cancelled: "bg-red-100 text-red-700",
};

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export default function AccountPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(emptyUser);
  const wishlistCount = useWishlistStore((state) => state.items.length);
  const currentUser = useAuthStore((state) => state.currentUser);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const allOrders = useAuthStore((state) => state.orders);
  const logout = useAuthStore((state) => state.logout);
  const updateProfile = useAuthStore((state) => state.updateProfile);
  const fetchMyOrders = useAuthStore((state) => state.fetchMyOrders);
  const [profileMessage, setProfileMessage] = useState("");

  const userOrders = useMemo(
    () => (currentUser ? allOrders.filter((order) => order.userId === currentUser.id) : []),
    [allOrders, currentUser]
  );
  const recentOrders = userOrders.slice(0, 3);
  const orderCount = userOrders.length;
  const counts: Record<string, number> = {
    orders: orderCount,
    wishlist: wishlistCount,
  };

  useEffect(() => {
    if (isAuthenticated && currentUser) {
      fetchMyOrders();
      setIsLoggedIn(true);
      setUser({
        name: currentUser.name,
        email: currentUser.email ?? "",
        phone: currentUser.mobile,
        district: currentUser.address?.district ?? "",
        memberSince: new Date(currentUser.createdAt).toLocaleDateString("en-IN", {
          month: "long",
          year: "numeric",
        }),
      });
      return;
    }

    setIsLoggedIn(false);
    setUser(emptyUser);
  }, [currentUser, fetchMyOrders, isAuthenticated]);

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-background">
        <Navigation />

        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-md text-center"
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary">
              <User className="h-10 w-10 text-white" />
            </div>

            <h1 className="mb-2 text-2xl font-bold">Welcome to Rainbow Aqua</h1>
            <p className="mb-8 text-gray-500">
              Sign in to access your account, track orders, and manage your wishlist.
            </p>

            <div className="space-y-3">
              <Link href="/auth/signin" className="block">
                <Button className="w-full bg-primary hover:bg-primary/90" size="lg">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/register" className="block">
                <Button variant="outline" className="w-full" size="lg">
                  Create Account
                </Button>
              </Link>
            </div>

            <div className="mt-8 rounded-xl border border-orange-200 bg-orange-50 p-4">
              <p className="text-sm text-orange-700">
                <strong>New members</strong> get 10% off their first order.
              </p>
            </div>
          </motion.div>
        </div>

        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-4">
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="rounded-2xl border bg-white p-6 shadow-sm"
              >
                <div className="mb-6 text-center">
                  <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-2xl font-bold text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <h2 className="font-semibold text-gray-800">{user.name}</h2>
                  <p className="text-sm text-gray-500">{user.email || user.phone}</p>
                  <Badge variant="secondary" className="mt-2 text-xs">
                    Member since {user.memberSince}
                  </Badge>
                </div>

                <nav className="space-y-1">
                  {menuItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                    >
                      <span className="flex items-center gap-3">
                        <item.icon className="h-4 w-4 text-gray-400" />
                        {item.label}
                      </span>
                      {item.countKey && counts[item.countKey] > 0 ? (
                        <Badge className="bg-primary text-xs text-white">{counts[item.countKey]}</Badge>
                      ) : (
                        <ChevronRight className="h-4 w-4 text-gray-300" />
                      )}
                    </Link>
                  ))}
                </nav>

                <button
                  onClick={async () => {
                    await logout();
                    setIsLoggedIn(false);
                  }}
                  className="mt-4 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-500 transition-colors hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </motion.div>
            </div>

            <div className="space-y-6 lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl bg-gradient-to-r from-primary to-secondary p-6 text-white"
              >
                <h1 className="mb-2 text-2xl font-bold">Welcome back, {user.name.split(" ")[0]}!</h1>
                <p className="text-white/80">
                  Track your orders, manage wishlist, and explore our premium collection.
                </p>
              </motion.div>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  { label: "Orders", value: orderCount.toString(), icon: Package },
                  { label: "Wishlist", value: wishlistCount.toString(), icon: Heart },
                  { label: "Reviews", value: "0", icon: Edit },
                  { label: "Points", value: "0", icon: ShoppingBag },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="rounded-xl border bg-white p-4 shadow-sm"
                  >
                    <stat.icon className="mb-2 h-5 w-5 text-primary" />
                    <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                    <p className="text-xs text-gray-500">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-2xl border bg-white shadow-sm"
              >
                <div className="flex items-center justify-between border-b p-5">
                  <h2 className="font-semibold text-gray-800">Recent Orders</h2>
                  <Link href="/account/orders" className="text-sm text-primary hover:underline">
                    View All
                  </Link>
                </div>
                <div className="divide-y">
                  {recentOrders.length > 0 ? (
                    recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                        <div>
                          <p className="font-medium text-gray-800">{order.items[0]?.productName ?? "Order"}</p>
                          <p className="text-xs text-gray-500">
                            {order.id} - {formatDate(order.createdAt)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-800">Rs. {order.total.toLocaleString("en-IN")}</p>
                          <span className={`rounded-full px-2 py-0.5 text-xs ${statusColors[order.status] ?? "bg-gray-100 text-gray-700"}`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center">
                      <p className="font-medium text-gray-800">No orders yet</p>
                      <p className="mt-1 text-sm text-gray-500">
                        Your new account starts fresh. Orders will appear here after checkout.
                      </p>
                      <Button asChild className="mt-4 bg-primary">
                        <Link href="/shop">Start Shopping</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-2xl border bg-white p-6 shadow-sm"
              >
                <h2 className="mb-4 font-semibold text-gray-800">Profile Information</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="name" className="text-sm">Full Name</Label>
                    <Input id="name" value={user.name} onChange={(event) => setUser((current) => ({ ...current, name: event.target.value }))} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm">Email</Label>
                    <Input id="email" type="email" value={user.email} onChange={(event) => setUser((current) => ({ ...current, email: event.target.value }))} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-sm">Phone</Label>
                    <Input id="phone" value={user.phone} onChange={(event) => setUser((current) => ({ ...current, phone: event.target.value }))} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="district" className="text-sm">District</Label>
                    <Input id="district" value={user.district} onChange={(event) => setUser((current) => ({ ...current, district: event.target.value }))} className="mt-1" />
                  </div>
                </div>
                <Button
                  className="mt-4 bg-primary"
                  onClick={async () => {
                    await updateProfile({
                      name: user.name.trim(),
                      email: user.email.trim() || undefined,
                      mobile: user.phone.trim(),
                      address: {
                        addressLine1: currentUser?.address?.addressLine1 ?? "",
                        addressLine2: currentUser?.address?.addressLine2,
                        area: currentUser?.address?.area ?? "",
                        city: currentUser?.address?.city ?? "",
                        district: user.district.trim(),
                        pincode: currentUser?.address?.pincode ?? "",
                        state: "Tamil Nadu",
                        country: "India",
                      },
                    });
                    setProfileMessage("Profile updated successfully.");
                  }}
                >
                  Save Changes
                </Button>
                {profileMessage && <p className="mt-2 text-sm text-green-600">{profileMessage}</p>}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

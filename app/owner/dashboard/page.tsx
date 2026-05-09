"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Fish,
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  DollarSign,
  Plus,
  Search,
  Bell,
  Settings,
  LogOut,
  BarChart3,
  Eye,
  Edit,
  Trash2,
  Menu,
  X,
  Home,
  Layers,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// Sample data
const stats = [
  { label: "Total Sales", value: "₹2,45,890", change: "+12.5%", icon: DollarSign, color: "bg-green-500" },
  { label: "Total Orders", value: "1,234", change: "+8.2%", icon: ShoppingCart, color: "bg-blue-500" },
  { label: "Products", value: "156", change: "+5", icon: Package, color: "bg-purple-500" },
  { label: "Customers", value: "892", change: "+23", icon: Users, color: "bg-orange-500" },
];

const recentOrders = [
  { id: "ORD-001", customer: "Rajesh Kumar", product: "Betta Fish - Halfmoon", amount: "₹1,499", status: "Delivered", date: "Today" },
  { id: "ORD-002", customer: "Priya S.", product: "Goldfish - Oranda", amount: "₹899", status: "Shipped", date: "Today" },
  { id: "ORD-003", customer: "Mohammed Ali", product: "Budgerigar - Blue", amount: "₹2,499", status: "Processing", date: "Yesterday" },
  { id: "ORD-004", customer: "Lakshmi N.", product: "Aquarium Tank 50L", amount: "₹4,999", status: "Pending", date: "Yesterday" },
  { id: "ORD-005", customer: "Arun P.", product: "Guppy Fish Set", amount: "₹599", status: "Delivered", date: "2 days ago" },
];

const topProducts = [
  { name: "Betta Fish - Halfmoon", sales: 145, revenue: "₹2,17,355", stock: 23 },
  { name: "Goldfish - Oranda", sales: 98, revenue: "₹88,102", stock: 45 },
  { name: "Budgerigar - Blue", sales: 67, revenue: "₹1,67,433", stock: 12 },
  { name: "Guppy Fish Set", sales: 234, revenue: "₹1,40,166", stock: 89 },
  { name: "Aquarium Tank 50L", sales: 45, revenue: "₹2,24,955", stock: 8 },
];

const statusColors: Record<string, string> = {
  "Delivered": "bg-green-100 text-green-700",
  "Shipped": "bg-blue-100 text-blue-700",
  "Processing": "bg-yellow-100 text-yellow-700",
  "Pending": "bg-gray-100 text-gray-700",
};

export default function OwnerDashboard() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication
    const auth = localStorage.getItem("ownerAuth");
    if (!auth) {
      router.push("/owner/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("ownerAuth");
    router.push("/owner/login");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-3 p-4 border-b border-white/10">
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-2 rounded-lg">
              <Fish className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-white">Rainbow Aqua</h1>
              <p className="text-xs text-white/50">Admin Panel</p>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden ml-auto text-white/50">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            <Link href="/owner/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/10 text-white">
              <Home className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
            <Link href="/owner/products" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/70 hover:bg-white/5 hover:text-white">
              <Package className="w-5 h-5" />
              <span>Products</span>
            </Link>
            <Link href="/owner/orders" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/70 hover:bg-white/5 hover:text-white">
              <ShoppingCart className="w-5 h-5" />
              <span>Orders</span>
              <Badge className="ml-auto bg-red-500 text-white text-xs">12</Badge>
            </Link>
            <Link href="/owner/customers" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/70 hover:bg-white/5 hover:text-white">
              <Users className="w-5 h-5" />
              <span>Customers</span>
            </Link>
            <Link href="/owner/reports" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/70 hover:bg-white/5 hover:text-white">
              <BarChart3 className="w-5 h-5" />
              <span>Reports</span>
            </Link>
          </nav>

          {/* Bottom */}
          <div className="p-4 border-t border-white/10">
            <Link href="/owner/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/70 hover:bg-white/5 hover:text-white">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </Link>
            <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10 w-full">
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white border-b px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
                <p className="text-sm text-gray-500">Welcome back, Admin!</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:block relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input placeholder="Search..." className="pl-10 w-64" />
              </div>
              <Button variant="outline" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
              </Button>
              <Link href="/owner/products/add">
                <Button className="bg-cyan-500 hover:bg-cyan-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 sm:p-6">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                    <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {stat.change}
                    </p>
                  </div>
                  <div className={`${stat.color} p-2.5 rounded-lg`}>
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Recent Orders */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border">
              <div className="p-4 sm:p-5 border-b flex items-center justify-between">
                <h2 className="font-semibold text-gray-800">Recent Orders</h2>
                <Link href="/owner/orders" className="text-sm text-cyan-600 hover:underline">View All</Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                    <tr>
                      <th className="px-4 py-3 text-left">Order ID</th>
                      <th className="px-4 py-3 text-left">Customer</th>
                      <th className="px-4 py-3 text-left hidden sm:table-cell">Product</th>
                      <th className="px-4 py-3 text-left">Amount</th>
                      <th className="px-4 py-3 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-gray-800">{order.id}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{order.customer}</td>
                        <td className="px-4 py-3 text-sm text-gray-600 hidden sm:table-cell truncate max-w-[150px]">{order.product}</td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-800">{order.amount}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-white rounded-xl shadow-sm border">
              <div className="p-4 sm:p-5 border-b flex items-center justify-between">
                <h2 className="font-semibold text-gray-800">Top Products</h2>
                <Link href="/owner/products" className="text-sm text-cyan-600 hover:underline">View All</Link>
              </div>
              <div className="p-4 space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.sales} sales • Stock: {product.stock}</p>
                    </div>
                    <p className="text-sm font-semibold text-gray-800 ml-4">{product.revenue}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl p-5 text-white">
            <h3 className="font-semibold mb-3">Quick Actions</h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/owner/products/add">
                <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-0">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </Link>
              <Link href="/owner/orders">
                <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-0">
                  <FileText className="w-4 h-4 mr-2" />
                  View Orders
                </Button>
              </Link>
              <Link href="/" target="_blank">
                <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-0">
                  <Eye className="w-4 h-4 mr-2" />
                  View Store
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  );
}


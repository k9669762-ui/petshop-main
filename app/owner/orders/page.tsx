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
  Search,
  Bell,
  Settings,
  LogOut,
  BarChart3,
  Eye,
  Menu,
  X,
  Home,
  Filter,
  Clock,
  Truck,
  CheckCircle,
  XCircle,
  MapPin,
  Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// Sample orders data
const sampleOrders = [
  { 
    id: "ORD-2024-001", 
    customer: "Rajesh Kumar", 
    phone: "+91 98765 43210",
    address: "Chennai, Tamil Nadu",
    products: [{ name: "Betta Fish - Halfmoon", qty: 2, price: 1499 }],
    total: 2998,
    status: "Delivered",
    paymentStatus: "Paid",
    date: "2024-12-03",
    time: "10:30 AM"
  },
  { 
    id: "ORD-2024-002", 
    customer: "Priya Sharma", 
    phone: "+91 87654 32109",
    address: "Coimbatore, Tamil Nadu",
    products: [
      { name: "Goldfish - Oranda", qty: 3, price: 899 },
      { name: "Fish Food - Premium", qty: 1, price: 299 }
    ],
    total: 2996,
    status: "Shipped",
    paymentStatus: "Paid",
    date: "2024-12-03",
    time: "09:15 AM"
  },
  { 
    id: "ORD-2024-003", 
    customer: "Mohammed Ali", 
    phone: "+91 76543 21098",
    address: "Madurai, Tamil Nadu",
    products: [{ name: "Budgerigar - Blue", qty: 1, price: 2499 }],
    total: 2499,
    status: "Processing",
    paymentStatus: "Paid",
    date: "2024-12-02",
    time: "04:45 PM"
  },
  { 
    id: "ORD-2024-004", 
    customer: "Lakshmi N.", 
    phone: "+91 65432 10987",
    address: "Salem, Tamil Nadu",
    products: [{ name: "Aquarium Tank 50L", qty: 1, price: 4999 }],
    total: 4999,
    status: "Pending",
    paymentStatus: "COD",
    date: "2024-12-02",
    time: "02:30 PM"
  },
  { 
    id: "ORD-2024-005", 
    customer: "Arun Prakash", 
    phone: "+91 54321 09876",
    address: "Tirunelveli, Tamil Nadu",
    products: [
      { name: "Guppy Fish Set", qty: 5, price: 599 },
      { name: "Air Pump", qty: 1, price: 699 }
    ],
    total: 3694,
    status: "Delivered",
    paymentStatus: "Paid",
    date: "2024-12-01",
    time: "11:00 AM"
  },
  { 
    id: "ORD-2024-006", 
    customer: "Kavitha R.", 
    phone: "+91 43210 98765",
    address: "Thanjavur, Tamil Nadu",
    products: [{ name: "Discus Fish - Blue Diamond", qty: 1, price: 3999 }],
    total: 3999,
    status: "Cancelled",
    paymentStatus: "Refunded",
    date: "2024-12-01",
    time: "09:00 AM"
  },
];

const statusConfig: Record<string, { color: string; icon: any; bgColor: string }> = {
  "Pending": { color: "text-gray-700", icon: Clock, bgColor: "bg-gray-100" },
  "Processing": { color: "text-yellow-700", icon: Package, bgColor: "bg-yellow-100" },
  "Shipped": { color: "text-blue-700", icon: Truck, bgColor: "bg-blue-100" },
  "Delivered": { color: "text-green-700", icon: CheckCircle, bgColor: "bg-green-100" },
  "Cancelled": { color: "text-red-700", icon: XCircle, bgColor: "bg-red-100" },
};

export default function OrdersPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState<typeof sampleOrders[0] | null>(null);
  const [orders, setOrders] = useState(sampleOrders);

  useEffect(() => {
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

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    setSelectedOrder(null);
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === "All" || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

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

          <nav className="flex-1 p-4 space-y-1">
            <Link href="/owner/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/70 hover:bg-white/5 hover:text-white">
              <Home className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
            <Link href="/owner/products" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/70 hover:bg-white/5 hover:text-white">
              <Package className="w-5 h-5" />
              <span>Products</span>
            </Link>
            <Link href="/owner/orders" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/10 text-white">
              <ShoppingCart className="w-5 h-5" />
              <span>Orders</span>
              <Badge className="ml-auto bg-red-500 text-white text-xs">{orders.filter(o => o.status === "Pending" || o.status === "Processing").length}</Badge>
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
                <h1 className="text-xl font-bold text-gray-800">Orders</h1>
                <p className="text-sm text-gray-500">Manage customer orders</p>
              </div>
            </div>

            <Button variant="outline" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 sm:p-6">
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Pending", count: orders.filter(o => o.status === "Pending").length, color: "bg-gray-500" },
              { label: "Processing", count: orders.filter(o => o.status === "Processing").length, color: "bg-yellow-500" },
              { label: "Shipped", count: orders.filter(o => o.status === "Shipped").length, color: "bg-blue-500" },
              { label: "Delivered", count: orders.filter(o => o.status === "Delivered").length, color: "bg-green-500" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{stat.label}</span>
                  <span className={`w-2 h-2 rounded-full ${stat.color}`}></span>
                </div>
                <p className="text-2xl font-bold text-gray-800 mt-1">{stat.count}</p>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input 
                  placeholder="Search by Order ID or Customer..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <select 
                  className="px-4 py-2 border rounded-lg text-sm"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="All">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>

          {/* Orders List */}
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                  <tr>
                    <th className="px-4 py-3 text-left">Order ID</th>
                    <th className="px-4 py-3 text-left">Customer</th>
                    <th className="px-4 py-3 text-left hidden md:table-cell">Location</th>
                    <th className="px-4 py-3 text-left">Total</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left hidden sm:table-cell">Date</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredOrders.map((order) => {
                    const StatusIcon = statusConfig[order.status].icon;
                    return (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-gray-800">{order.id}</td>
                        <td className="px-4 py-3">
                          <div>
                            <p className="text-sm font-medium text-gray-800">{order.customer}</p>
                            <p className="text-xs text-gray-500">{order.phone}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 hidden md:table-cell">{order.address}</td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-800">₹{order.total.toLocaleString()}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig[order.status].bgColor} ${statusConfig[order.status].color}`}>
                            <StatusIcon className="w-3 h-3" />
                            {order.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500 hidden sm:table-cell">{order.date}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => setSelectedOrder(order)}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedOrder(null)}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-gray-800">{selectedOrder.id}</h2>
                <p className="text-sm text-gray-500">{selectedOrder.date} at {selectedOrder.time}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              {/* Customer Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-sm text-gray-800 mb-2">Customer Details</h3>
                <div className="space-y-2 text-sm">
                  <p className="flex items-center gap-2 text-gray-600">
                    <Users className="w-4 h-4" />
                    {selectedOrder.customer}
                  </p>
                  <p className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    {selectedOrder.phone}
                  </p>
                  <p className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    {selectedOrder.address}
                  </p>
                </div>
              </div>

              {/* Products */}
              <div>
                <h3 className="font-medium text-sm text-gray-800 mb-2">Products</h3>
                <div className="space-y-2">
                  {selectedOrder.products.map((product, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b">
                      <div>
                        <p className="text-sm text-gray-800">{product.name}</p>
                        <p className="text-xs text-gray-500">Qty: {product.qty}</p>
                      </div>
                      <p className="font-medium text-gray-800">₹{(product.price * product.qty).toLocaleString()}</p>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-2">
                    <p className="font-semibold text-gray-800">Total</p>
                    <p className="font-bold text-lg text-gray-800">₹{selectedOrder.total.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Status Update */}
              {selectedOrder.status !== "Delivered" && selectedOrder.status !== "Cancelled" && (
                <div>
                  <h3 className="font-medium text-sm text-gray-800 mb-2">Update Status</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedOrder.status === "Pending" && (
                      <Button size="sm" onClick={() => updateOrderStatus(selectedOrder.id, "Processing")} className="bg-yellow-500 hover:bg-yellow-600">
                        Mark Processing
                      </Button>
                    )}
                    {selectedOrder.status === "Processing" && (
                      <Button size="sm" onClick={() => updateOrderStatus(selectedOrder.id, "Shipped")} className="bg-blue-500 hover:bg-blue-600">
                        Mark Shipped
                      </Button>
                    )}
                    {selectedOrder.status === "Shipped" && (
                      <Button size="sm" onClick={() => updateOrderStatus(selectedOrder.id, "Delivered")} className="bg-green-500 hover:bg-green-600">
                        Mark Delivered
                      </Button>
                    )}
                    <Button size="sm" variant="outline" onClick={() => updateOrderStatus(selectedOrder.id, "Cancelled")} className="text-red-500 border-red-500 hover:bg-red-50">
                      Cancel Order
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  );
}


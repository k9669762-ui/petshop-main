"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, Fish, ArrowRight, Shield, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { useAuthStore } from "@/store/useAuthStore";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { isAdminEmail } from "@/lib/authConfig";

export default function OwnerLoginPage() {
  const router = useRouter();
  const loginWithPassword = useAuthStore((s) => s.loginWithPassword);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const trimmedEmail = formData.email.trim().toLowerCase();

    if (!isAdminEmail(trimmedEmail)) {
      setError("Access denied. Invalid owner account.");
      setIsLoading(false);
      return;
    }

    const result = await loginWithPassword(trimmedEmail, formData.password);

    if (!result.success) {
      setError(result.message);
      setIsLoading(false);
      return;
    }

    const user = useAuthStore.getState().currentUser;
    if (user?.role !== "owner" || !isAdminEmail(user.email)) {
      setError("Access denied. Owner account required.");
      await useAuthStore.getState().logout();
      setIsLoading(false);
      return;
    }

    // Seed owner profile in Firestore if not exists
    try {
      const ref = doc(db, "users", user.id);
      const snap = await getDoc(ref);
      if (!snap.exists()) {
        await setDoc(ref, {
          id: user.id,
          name: user.name,
          email: user.email,
          mobile: user.mobile,
          role: "owner",
          status: "active",
          createdAt: new Date().toISOString(),
        });
      }
    } catch {}

    toast({ title: "Welcome back! 👋", description: "Redirecting to dashboard..." });
    router.push("/owner/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle at 25% 25%, #0ea5e9 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative"
      >
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-3 rounded-xl">
              <Fish className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-white">Rainbow Aqua</h1>
              <p className="text-xs text-white/60">Owner Dashboard</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 mb-6 text-white/60">
            <Shield className="w-4 h-4" />
            <span className="text-sm">Secure Owner Access</span>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/20 border border-red-500/40 text-red-300 px-4 py-3 rounded-xl mb-5 text-sm"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="email" className="text-white/80 text-sm">Email Address</Label>
              <div className="relative mt-1.5">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 pl-10"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="text-white/80 text-sm">Password</Label>
              <div className="relative mt-1.5">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 pl-10 pr-10"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-3"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                  />
                  Signing In...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Access Dashboard <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <a href="/" className="text-sm text-white/50 hover:text-white/80 transition-colors">
              ← Back to Store
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

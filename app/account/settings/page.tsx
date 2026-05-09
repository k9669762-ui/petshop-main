"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Settings } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAuthStore } from "@/store/useAuthStore";

export default function AccountSettingsPage() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const updateProfile = useAuthStore((state) => state.updateProfile);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [compactMode, setCompactMode] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setName(currentUser?.name ?? "");
    setEmail(currentUser?.email ?? "");
    setMobile(currentUser?.mobile ?? "");
    setCompactMode(localStorage.getItem("rainbow-compact-account") === "true");
  }, [currentUser]);

  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />
      <section className="container mx-auto px-4 py-10">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Account Settings</h1>
              <p className="text-muted-foreground">Manage profile details and account preferences.</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/account"><ArrowLeft className="mr-2 h-4 w-4" />Back to Account</Link>
            </Button>
          </div>

          {!isAuthenticated ? (
            <div className="rounded-xl border bg-white p-8 text-center shadow-sm">
              <p className="font-semibold text-gray-800">Please sign in to manage settings.</p>
              <Button asChild className="mt-4 bg-primary"><Link href="/auth/signin">Sign In</Link></Button>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="rounded-xl border bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-center gap-3">
                  <Settings className="h-5 w-5 text-primary" />
                  <h2 className="font-semibold text-gray-800">Profile Details</h2>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="settingsName">Full Name</Label>
                    <Input id="settingsName" value={name} onChange={(event) => setName(event.target.value)} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="settingsEmail">Email</Label>
                    <Input id="settingsEmail" type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="settingsMobile">Mobile</Label>
                    <Input id="settingsMobile" value={mobile} onChange={(event) => setMobile(event.target.value)} className="mt-1" />
                  </div>
                </div>
                <Button
                  className="mt-5 bg-primary"
                  onClick={() => {
                    updateProfile({ name: name.trim(), email: email.trim() || undefined, mobile: mobile.trim() });
                    setMessage("Settings saved successfully.");
                  }}
                >
                  Save Settings
                </Button>
                {message && <p className="mt-3 text-sm text-green-600">{message}</p>}
              </div>

              <div className="flex items-center justify-between gap-4 rounded-xl border bg-white p-6 shadow-sm">
                <div>
                  <h2 className="font-semibold text-gray-800">Compact account view</h2>
                  <p className="text-sm text-gray-500">Remember a simpler profile view preference for this browser.</p>
                </div>
                <Switch
                  checked={compactMode}
                  onCheckedChange={(value) => {
                    setCompactMode(value);
                    localStorage.setItem("rainbow-compact-account", String(value));
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}

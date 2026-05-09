"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Bell } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useAuthStore } from "@/store/useAuthStore";

const notificationOptions = [
  { key: "orders", label: "Order updates", description: "Delivery status, invoices, and order changes" },
  { key: "offers", label: "Offers and deals", description: "Discounts, new arrivals, and seasonal offers" },
  { key: "care", label: "Pet care reminders", description: "Helpful care tips and product reminders" },
  { key: "account", label: "Account activity", description: "Security and profile activity alerts" },
];

export default function AccountNotificationsPage() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [prefs, setPrefs] = useState<Record<string, boolean>>({
    orders: true,
    offers: true,
    care: false,
    account: true,
  });

  useEffect(() => {
    const saved = localStorage.getItem("rainbow-notification-prefs");
    if (saved) setPrefs(JSON.parse(saved));
  }, []);

  const updatePreference = (key: string, value: boolean) => {
    const nextPrefs = { ...prefs, [key]: value };
    setPrefs(nextPrefs);
    localStorage.setItem("rainbow-notification-prefs", JSON.stringify(nextPrefs));
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />
      <section className="container mx-auto px-4 py-10">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>
              <p className="text-muted-foreground">Manage updates about orders, offers, and account activity.</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/account"><ArrowLeft className="mr-2 h-4 w-4" />Back to Account</Link>
            </Button>
          </div>

          {!isAuthenticated ? (
            <div className="rounded-xl border bg-white p-8 text-center shadow-sm">
              <p className="font-semibold text-gray-800">Please sign in to manage notifications.</p>
              <Button asChild className="mt-4 bg-primary"><Link href="/auth/signin">Sign In</Link></Button>
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
              {notificationOptions.map((option) => (
                <div key={option.key} className="flex items-center justify-between gap-4 border-b p-5 last:border-b-0">
                  <div className="flex items-start gap-3">
                    <Bell className="mt-0.5 h-5 w-5 text-primary" />
                    <div>
                      <p className="font-semibold text-gray-800">{option.label}</p>
                      <p className="text-sm text-gray-500">{option.description}</p>
                    </div>
                  </div>
                  <Switch checked={prefs[option.key]} onCheckedChange={(value) => updatePreference(option.key, value)} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}

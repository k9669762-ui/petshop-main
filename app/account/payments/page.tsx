"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CreditCard, IndianRupee, Smartphone } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/store/useAuthStore";

const methods = [
  { id: "upi", label: "UPI", description: "Google Pay, PhonePe, Paytm, or any UPI app", icon: Smartphone },
  { id: "card", label: "Debit / Credit Card", description: "Pay securely using cards at checkout", icon: CreditCard },
  { id: "cod", label: "Cash on Delivery", description: "Pay when your order arrives where available", icon: IndianRupee },
];

export default function AccountPaymentsPage() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [preferredMethod, setPreferredMethod] = useState("upi");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setPreferredMethod(localStorage.getItem("rainbow-preferred-payment") ?? "upi");
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />
      <section className="container mx-auto px-4 py-10">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Payment Methods</h1>
              <p className="text-muted-foreground">Choose your preferred checkout payment option.</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/account"><ArrowLeft className="mr-2 h-4 w-4" />Back to Account</Link>
            </Button>
          </div>

          {!isAuthenticated ? (
            <div className="rounded-xl border bg-white p-8 text-center shadow-sm">
              <p className="font-semibold text-gray-800">Please sign in to manage payment preferences.</p>
              <Button asChild className="mt-4 bg-primary"><Link href="/auth/signin">Sign In</Link></Button>
            </div>
          ) : (
            <div className="space-y-4">
              {methods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => {
                    setPreferredMethod(method.id);
                    localStorage.setItem("rainbow-preferred-payment", method.id);
                    setMessage(`${method.label} set as preferred payment method.`);
                  }}
                  className="flex w-full items-center justify-between rounded-xl border bg-white p-5 text-left shadow-sm transition-colors hover:bg-gray-50"
                >
                  <span className="flex items-center gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                      <method.icon className="h-5 w-5 text-primary" />
                    </span>
                    <span>
                      <span className="block font-semibold text-gray-800">{method.label}</span>
                      <span className="text-sm text-gray-500">{method.description}</span>
                    </span>
                  </span>
                  {preferredMethod === method.id && <Badge className="bg-primary text-white">Preferred</Badge>}
                </button>
              ))}
              {message && <p className="text-sm text-green-600">{message}</p>}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore, UserAddress } from "@/store/useAuthStore";

const emptyAddress: UserAddress = {
  addressLine1: "",
  addressLine2: "",
  area: "",
  city: "",
  district: "",
  pincode: "",
  state: "Tamil Nadu",
  country: "India",
};

export default function AccountAddressesPage() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const updateProfile = useAuthStore((state) => state.updateProfile);
  const [address, setAddress] = useState<UserAddress>(emptyAddress);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setAddress({ ...emptyAddress, ...currentUser?.address });
  }, [currentUser]);

  const updateField = (field: keyof UserAddress, value: string) => {
    setAddress((current) => ({ ...current, [field]: value }));
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />
      <section className="container mx-auto px-4 py-10">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Saved Addresses</h1>
              <p className="text-muted-foreground">Manage your default delivery address.</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/account"><ArrowLeft className="mr-2 h-4 w-4" />Back to Account</Link>
            </Button>
          </div>

          {!isAuthenticated ? (
            <div className="rounded-xl border bg-white p-8 text-center shadow-sm">
              <p className="font-semibold text-gray-800">Please sign in to manage addresses.</p>
              <Button asChild className="mt-4 bg-primary"><Link href="/auth/signin">Sign In</Link></Button>
            </div>
          ) : (
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-800">Default Address</h2>
                  <p className="text-sm text-gray-500">Used during checkout and delivery confirmation.</p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Label htmlFor="addressLine1">Address Line 1</Label>
                  <Input id="addressLine1" value={address.addressLine1} onChange={(event) => updateField("addressLine1", event.target.value)} className="mt-1" />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="addressLine2">Address Line 2</Label>
                  <Input id="addressLine2" value={address.addressLine2 ?? ""} onChange={(event) => updateField("addressLine2", event.target.value)} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="area">Area</Label>
                  <Input id="area" value={address.area} onChange={(event) => updateField("area", event.target.value)} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" value={address.city} onChange={(event) => updateField("city", event.target.value)} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="district">District</Label>
                  <Input id="district" value={address.district} onChange={(event) => updateField("district", event.target.value)} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input id="pincode" value={address.pincode} onChange={(event) => updateField("pincode", event.target.value)} className="mt-1" />
                </div>
              </div>

              <Button
                className="mt-5 bg-primary"
                onClick={() => {
                  updateProfile({ address });
                  setMessage("Address saved successfully.");
                }}
              >
                Save Address
              </Button>
              {message && <p className="mt-3 text-sm text-green-600">{message}</p>}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}

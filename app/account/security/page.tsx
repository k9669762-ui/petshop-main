"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/useAuthStore";

export default function AccountSecurityPage() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const updatePassword = useAuthStore((state) => state.updatePassword);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSave = async () => {
    if (newPassword !== confirmPassword) {
      setIsError(true);
      setMessage("New passwords do not match.");
      return;
    }

    const result = await updatePassword(currentPassword, newPassword);
    setIsError(!result.success);
    setMessage(result.message);
    if (result.success) {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />
      <section className="container mx-auto px-4 py-10">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Account Security</h1>
              <p className="text-muted-foreground">Update your password and review login details.</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/account"><ArrowLeft className="mr-2 h-4 w-4" />Back to Account</Link>
            </Button>
          </div>

          {!isAuthenticated ? (
            <div className="rounded-xl border bg-white p-8 text-center shadow-sm">
              <p className="font-semibold text-gray-800">Please sign in to manage security.</p>
              <Button asChild className="mt-4 bg-primary"><Link href="/auth/signin">Sign In</Link></Button>
            </div>
          ) : (
            <div className="grid gap-5 lg:grid-cols-[1fr_280px]">
              <div className="rounded-xl border bg-white p-6 shadow-sm">
                <h2 className="mb-4 font-semibold text-gray-800">Change Password</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="mt-1" />
                  </div>
                </div>
                <Button className="mt-5 bg-primary" onClick={handleSave}>Update Password</Button>
                {message && <p className={`mt-3 text-sm ${isError ? "text-red-600" : "text-green-600"}`}>{message}</p>}
              </div>

              <div className="rounded-xl border bg-white p-6 shadow-sm">
                <Shield className="mb-3 h-6 w-6 text-primary" />
                <h2 className="font-semibold text-gray-800">Login Details</h2>
                <p className="mt-2 text-sm text-gray-500">Signed in as {currentUser?.email || currentUser?.mobile}.</p>
                <p className="mt-3 text-sm text-gray-500">Use a password with at least 6 characters for this demo account.</p>
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}

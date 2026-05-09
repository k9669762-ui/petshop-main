"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Fish,
  Loader2,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedEmail = email.trim();
    if (!trimmedEmail) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));

    setIsSubmitted(true);
    setIsLoading(false);

    toast({
      title: "Reset instructions sent",
      description: "Check your email for the next steps to reset your password.",
    });
  };

  return (
    <div className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-br from-orange-50 via-white to-green-50">
      <div className="absolute left-0 right-0 top-0 h-1.5 bg-gradient-to-r from-orange-500 via-white to-green-600" />
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-green-600 via-white to-orange-500" />

      <div className="absolute left-10 top-20 hidden text-8xl opacity-5 lg:block">
        &#128274;
      </div>
      <div className="absolute bottom-20 right-10 hidden text-8xl opacity-5 lg:block">
        &#128031;
      </div>
      <div className="absolute right-20 top-1/3 hidden text-6xl opacity-5 lg:block">
        &#128233;
      </div>

      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="mx-auto max-w-5xl">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="hidden lg:block"
            >
              <Link href="/" className="mb-8 flex items-center gap-2">
                <div className="rounded-full bg-gradient-to-br from-orange-500 to-green-600 p-2">
                  <Fish className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="font-display text-2xl font-bold text-gray-800">
                    Rainbow Aqua
                  </h1>
                  <p className="text-xs text-gray-500">Premium Fish & Pets</p>
                </div>
              </Link>

              <h2 className="mb-4 text-3xl font-bold text-gray-800 sm:text-4xl">
                Get Back Into Your <span className="text-orange-500">Account</span>
              </h2>

              <p className="mb-8 text-gray-600">
                Enter the email connected to your Rainbow Aqua account and we will
                send reset instructions. Your saved orders, wishlist, and delivery
                details stay protected.
              </p>

              <div className="space-y-4">
                {[
                  {
                    icon: ShieldCheck,
                    title: "Secure reset",
                    text: "Reset instructions are sent only to your registered email.",
                  },
                  {
                    icon: LockKeyhole,
                    title: "Account protected",
                    text: "You can return to sign in as soon as the reset is complete.",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="rounded-xl bg-white p-4 shadow-sm"
                  >
                    <div className="flex gap-3">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-500">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{item.title}</p>
                        <p className="text-sm text-gray-600">{item.text}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xl sm:p-8">
                <div className="mb-6 flex items-center justify-center gap-2 lg:hidden">
                  <div className="rounded-full bg-gradient-to-br from-orange-500 to-green-600 p-2">
                    <Fish className="h-6 w-6 text-white" />
                  </div>
                  <span className="font-display text-xl font-bold">Rainbow Aqua</span>
                </div>

                <div className="mb-6 text-center">
                  <Badge className="mb-2 bg-gradient-to-r from-orange-500 to-green-600 text-white">
                    PASSWORD HELP
                  </Badge>
                  <h3 className="text-xl font-bold text-gray-800 sm:text-2xl">
                    Forgot Password?
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    No problem. We&apos;ll help you reset it.
                  </p>
                </div>

                {isSubmitted ? (
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-green-600">
                      <CheckCircle2 className="h-7 w-7" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800">
                      Check your inbox
                    </h4>
                    <p className="mt-2 text-sm text-gray-600">
                      If an account exists for <span className="font-medium">{email}</span>,
                      reset instructions have been sent.
                    </p>
                    <div className="mt-6 space-y-3">
                      <Button className="w-full bg-gradient-to-r from-orange-500 to-green-600 text-white hover:from-orange-600 hover:to-green-700" asChild>
                        <Link href="/auth/signin">
                          Back to Sign In
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={() => setIsSubmitted(false)}
                      >
                        Try Another Email
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email Address
                      </Label>
                      <div className="relative mt-1">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          className="pl-10"
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-orange-500 to-green-600 py-3 text-white hover:from-orange-600 hover:to-green-700"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Reset Link
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                )}

                <div className="mt-6 border-t border-gray-100 pt-6 text-center">
                  <Link
                    href="/auth/signin"
                    className="inline-flex items-center text-sm font-medium text-orange-500 hover:underline"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Return to Sign In
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

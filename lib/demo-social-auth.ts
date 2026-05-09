"use client";

export const USER_AUTH_STORAGE_KEY = "userAuth";

export interface DemoSocialAuthUser {
  name: string;
  email: string;
  phone: string;
  district: string;
  authProvider: "google";
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function signInWithDemoGoogle() {
  await wait(650);

  const suffix = Date.now().toString().slice(-4);
  const user: DemoSocialAuthUser = {
    name: "Google User",
    email: `google.user${suffix}@example.com`,
    phone: "+91 98765 43210",
    district: "Chennai",
    authProvider: "google",
  };

  localStorage.setItem(USER_AUTH_STORAGE_KEY, JSON.stringify(user));

  return user;
}

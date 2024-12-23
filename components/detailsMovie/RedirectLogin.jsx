"use client";

import { useRouter } from "next/navigation";

export default function RedirectToLogin() {
  const router = useRouter();
  // Client-side navigation
  console.log("called redirect");
  router.push("/login");

  return null; // Prevents rendering while redirecting
}

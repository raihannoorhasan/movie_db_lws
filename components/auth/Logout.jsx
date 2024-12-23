"use client";

import { performLogout } from "@/actions";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  const logoutHandler = async () => {
    await performLogout();
    router.push("/login");
  };

  return (
    <button
      onClick={logoutHandler}
      className="text-white hover:text-red-500 transition"
    >
      Logout
    </button>
  );
}

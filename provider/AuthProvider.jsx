"use client";

import { AuthContext } from "@/context";
import { useState } from "react";

export default function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

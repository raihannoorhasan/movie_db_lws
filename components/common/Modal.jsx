"use client";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

export default function Modal({ children }) {
  const overlay = useRef(null);
  const wrapper = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const onClick = useCallback(
    (e) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        onDismiss();
      }
    },
    [onDismiss]
  );

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onDismiss();
    },
    [onDismiss]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  if (!pathname.includes("/login" || "/register")) {
    return null;
  }

  return (
    <div
      ref={overlay}
      className="z-50 fixed inset-0 bg-black/60 flex items-center justify-center p-4"
      onClick={onClick}
    >
      <div
        ref={wrapper}
        className="relative w-full max-w-screen-lg bg-color-bg rounded-xl shadow-lg overflow-hidden max-h-screen p-6 flex flex-col gap-6"
      >
        <button
          className="absolute top-4 right-4 text-white rounded-full p-2"
          aria-label="Close Modal"
          onClick={onDismiss}
        >
          ✕
        </button>

        <div className="overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

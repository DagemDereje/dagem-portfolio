"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  // Forces the browser to reset scroll position to the top
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, [pathname]);

  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto max-w-5xl px-6 text-sm text-muted flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
        <p>© {new Date().getFullYear()} Dagem Dereje. All rights reserved.</p>
        <p className="opacity-80 hover:opacity-100 transition-opacity">
          Glitch in the matrix? Try{" "}
          <button 
            onClick={() => window.location.href = "/"} 
            className="underline hover:text-foreground font-medium transition-colors"
          >
            returning home
          </button>.
        </p>
      </div>
    </footer>
  );
}

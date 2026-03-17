"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function getOrCreateId(key: string, storage: Storage): string {
  let id = storage.getItem(key);
  if (!id) {
    id = Math.random().toString(36).slice(2) + Date.now().toString(36);
    storage.setItem(key, id);
  }
  return id;
}

export default function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname.startsWith("/admin") || pathname.startsWith("/api")) return;

    let cancelled = false;
    const timer = setTimeout(() => {
      if (cancelled) return;

      const vid = getOrCreateId("_lp_vid", localStorage);
      const sid = getOrCreateId("_lp_sid", sessionStorage);

      const utm: Record<string, string> = {};
      for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]) {
        const val = searchParams.get(key);
        if (val) utm[key] = val;
      }

      fetch("/api/analytics/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: pathname,
          referrer: document.referrer,
          vid,
          sid,
          ...utm,
        }),
      }).catch(() => {});
    }, 100);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [pathname, searchParams]);

  return null;
}

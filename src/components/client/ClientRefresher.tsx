"use client";

import { useEffect } from "react";
import { setSession } from "@/app/actions";
import { useRouter } from "next/navigation";

export default function ClientRefresher({children}: {children?: React.ReactNode}) {
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch('/account/refresh_session', {
          method: 'POST',
          cache: 'no-store',
          credentials: 'include'
        });
        if (!res.ok) {
          throw new Error("Failed to fetch session");
        }
        const session = await res.json() as { access_token?: string; refresh_token?: string, expires_at?: number };
        if (session.access_token && session.refresh_token && typeof session.expires_at === "number") {
          await setSession(session.access_token, session.refresh_token, session.expires_at);
          router.refresh();
        } else {
          console.error("Invalid session data:", session);
        }
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };

    fetchSession();
  }, []);

  return children;
}

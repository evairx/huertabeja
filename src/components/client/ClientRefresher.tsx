"use client";

import { useEffect } from "react";
import { setSession } from "@/app/actions";
import { useRouter } from "next/navigation";

type ClientRefresherProps = {
  children?: React.ReactNode;
  onSuccess?: () => void;
};

export default function ClientRefresher({ children, onSuccess }: ClientRefresherProps) {
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch("/api/refresh_session", {
          method: "POST",
          cache: "no-store",
          credentials: "include",
        });

        if (!res.ok) {
          router.refresh();
          console.error("Failed to refresh session:", res.statusText);
          return;
        }

        const session = (await res.json()) as {
          access_token?: string;
          refresh_token?: string;
          expires_at?: number;
        };

        if (session.access_token && session.refresh_token && typeof session.expires_at === "number") {
          await setSession(session.access_token, session.refresh_token, session.expires_at);

          if (onSuccess) {
            onSuccess();
          } else {
            router.refresh();
          }
        } else {
          router.refresh();
          console.error("Invalid session data:", session);
        }
      } catch (error) {
        router.refresh();
        console.error("Error fetching session:", error);
      }
    };

    fetchSession();
  }, [onSuccess, router]);

  return <>{children}</>;
}

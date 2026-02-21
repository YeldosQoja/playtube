"use client";

import type { PropsWithChildren } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/api";

export function ProtectedRoute({ children }: PropsWithChildren) {
  const router = useRouter();
  const { isLoading, isError } = useAuth();

  useEffect(() => {
    if (isError) {
      router.replace("/auth/signin");
    }
  }, [isError, router]);

  if (isLoading) {
    return <div>Loading user</div>;
  }

  if (isError) {
    return null;
  }

  return children;
}

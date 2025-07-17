"use client";

import { useAuth } from "@/hook/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function AuthGuardWrapper({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) return null;
  return <>{children}</>;
}

export function GuestGuardWrapper({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/");
    }
  }, [user, loading, router]);

  if (loading || user) return null;
  return <>{children}</>;
}

export function EmailVerificationGuardWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isEmailVerified, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace("/login");
        return;
      }
      if (isEmailVerified) {
        router.replace("/");
        return;
      }
    }
  }, [user, isEmailVerified, loading, router]);

  if (loading) return null;
  if (!user) return null;
  if (isEmailVerified) return null;
  return <>{children}</>;
}

"use client";

import { useAuth } from "@/hook/useAuth";
import { useCamera } from "@/hook/useCamera";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoadingScreen, { LoadingcheckAuth } from "@/components/LoadingScreen";

export function AuthGuardWrapper({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) return <LoadingcheckAuth loading={loading} />;
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

  if (loading || user) return <LoadingcheckAuth loading={loading} />;
  return <>{children}</>;
}

export function MaxPhotoCountWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { photosArr } = useCamera();
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      return router.replace("/login");
    }
    if (!loading && user && photosArr.length >= 4) {
      return router.replace("/customize");
    }
  }, [photosArr.length, router, user, loading]);

  if (loading || user) return <LoadingcheckAuth loading={loading} />;

  if (photosArr.length >= 4) {
    return (
      <LoadingScreen
        title="You already have enough photos!"
        subtitle="Redirecting to customize page..."
        showSpinner
      />
    );
  }

  return <>{children}</>;
}

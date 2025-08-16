"use client";

import { useAuth } from "@/hook/useAuth";
import { useCamera } from "@/hook/useCamera";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoadingScreen, { LoadingcheckAuth } from "@/components/LoadingScreen";

export function AuthGuardWrapper({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) return <LoadingcheckAuth loading={true} />;
  if (!isAuthenticated)
    return <LoadingcheckAuth loading={false} noAccess={true} />;
  return <>{children}</>;
}

export function GuestGuardWrapper({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, loading, router]);

  if (loading || isAuthenticated) return <LoadingcheckAuth loading={loading} />;
  return <>{children}</>;
}

export function MaxPhotoCountWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { photosArr } = useCamera();
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      return router.replace("/login");
    }
    if (!loading && isAuthenticated && photosArr.length >= 4) {
      return router.replace("/customize");
    }
  }, [photosArr.length, router, isAuthenticated, loading]);

  if (loading) {
    return <LoadingScreen title="Checking authentication..." showSpinner />;
  }

  if (!isAuthenticated) {
    return (
      <LoadingScreen
        title="You need to be logged in!"
        subtitle="Redirecting to login page..."
        showSpinner
      />
    );
  }

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

export function NoPhotosWrapper({ children }: { children: React.ReactNode }) {
  const { photosArr } = useCamera();
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/login");
      return;
    }
    if (!loading && isAuthenticated && photosArr.length === 0) {
      router.replace("/session");
      return;
    }
  }, [photosArr.length, router, isAuthenticated, loading]);

  if (loading) {
    return <LoadingScreen title="Checking authentication..." showSpinner />;
  }

  if (!isAuthenticated) {
    return (
      <LoadingScreen
        title="You need to be logged in!"
        subtitle="Redirecting to login page..."
        showSpinner
      />
    );
  }

  if (photosArr.length === 0) {
    return (
      <LoadingScreen
        title="No photos found!"
        subtitle="Redirecting to session page..."
        showSpinner
      />
    );
  }

  return <>{children}</>;
}

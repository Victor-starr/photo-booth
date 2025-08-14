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

  if (loading) return <LoadingcheckAuth loading={true} />;
  if (!user) return <LoadingcheckAuth loading={false} noAccess={true} />;
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

  if (loading) {
    return <LoadingScreen title="Checking authentication..." showSpinner />;
  }

  if (!user) {
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
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
      return;
    }
    if (!loading && user && photosArr.length === 0) {
      router.replace("/session");
      return;
    }
  }, [photosArr.length, router, user, loading]);

  if (loading) {
    return <LoadingScreen title="Checking authentication..." showSpinner />;
  }

  if (!user) {
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

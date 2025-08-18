"use client";

import { useAuth } from "@/hook/useAuth";
import { useCamera } from "@/hook/useCamera";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoadingScreen from "@/components/LoadingScreen";

export function AuthGuardWrapper({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, loading, router]);
  if (loading)
    return (
      <LoadingScreen
        type="spinner"
        title="Loading your profile..."
        subtitle="Please wait while we check your authentication."
        showSpinner={true}
      />
    );
  if (!isAuthenticated)
    return (
      <LoadingScreen
        type="no-access"
        title="Access Denied"
        subtitle="You must be logged in to view this page. Redirecting to login..."
        showSpinner={true}
      />
    );
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

  if (loading)
    return (
      <LoadingScreen
        type="spinner"
        title="Checking authentication..."
        subtitle="Please wait while we verify your session."
        showSpinner={true}
      />
    );
  if (isAuthenticated)
    return (
      <LoadingScreen
        type="no-access"
        title="Already logged in"
        subtitle="Redirecting to home page..."
        showSpinner={true}
      />
    );
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
    return (
      <LoadingScreen
        type="spinner"
        title="Loading your photos..."
        subtitle="Please wait while we load your photos."
        showSpinner={true}
      />
    );
  }

  if (!isAuthenticated) {
    return (
      <LoadingScreen
        type="no-access"
        title="Login Required"
        subtitle="You need to be logged in to continue. Redirecting to login page..."
        showSpinner={true}
      />
    );
  }

  if (photosArr.length >= 4) {
    return (
      <LoadingScreen
        type="error"
        title="Maximum Photo Limit Reached"
        subtitle="You already have enough photos. Redirecting to customize page..."
        showSpinner={true}
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
    return (
      <LoadingScreen
        type="spinner"
        title="Loading your photos..."
        subtitle="Please wait while we load your photos."
        showSpinner={true}
      />
    );
  }

  if (!isAuthenticated) {
    return (
      <LoadingScreen
        type="no-access"
        title="Login Required"
        subtitle="You need to be logged in to view your photos. Redirecting to login page..."
        showSpinner={true}
      />
    );
  }

  if (photosArr.length === 0) {
    return (
      <LoadingScreen
        type="error"
        title="No Photos Found"
        subtitle="You have not taken any photos yet. Redirecting to session page..."
        showSpinner={true}
      />
    );
  }

  return <>{children}</>;
}

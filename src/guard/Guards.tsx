"use client";

import { useAuth } from "@/hook/useAuth";
import { useCamera } from "@/hook/useCamera";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoadingScreen from "@/components/LoadingScreen";

export function AuthGuardWrapper({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);
  if (loading)
    return (
      <LoadingScreen
        type="spinner"
        title="Loading your profile..."
        subtitle="Please wait while we check your authentication."
        showSpinner={true}
      />
    );
  if (!user)
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
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/");
    }
  }, [user, loading, router]);

  if (loading)
    return (
      <LoadingScreen
        type="spinner"
        title="Checking authentication..."
        subtitle="Please wait while we verify your session."
        showSpinner={true}
      />
    );
  if (user)
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
    return (
      <LoadingScreen
        type="spinner"
        title="Loading your photos..."
        subtitle="Please wait while we load your photos."
        showSpinner={true}
      />
    );
  }
  if (!user) {
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
    return (
      <LoadingScreen
        type="spinner"
        title="Loading your photos..."
        subtitle="Please wait while we load your photos."
        showSpinner={true}
      />
    );
  }
  if (!user) {
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

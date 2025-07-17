import { useAuth } from "@/hook/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, ComponentType } from "react";

function withAuthGuard<T extends object>(Component: ComponentType<T>) {
  return function AuthGuard(props: T) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.replace("/login");
      }
    }, [user, loading, router]);

    if (loading || !user) return null;
    return <Component {...props} />;
  };
}

function withGuestGuard<T extends object>(Component: ComponentType<T>) {
  return function GuestGuard(props: T) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && user) {
        router.replace("/");
      }
    }, [user, loading, router]);

    if (loading || user) return null;
    return <Component {...props} />;
  };
}

function isEmailVerified<T extends object>(Component: ComponentType<T>) {
  return function EmailVerifiedGuard(props: T) {
    const { isEmailVerified, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !isEmailVerified) {
        router.replace("/verify-email");
      }
    }, [isEmailVerified, loading, router]);

    if (loading || !isEmailVerified) return null;
    return <Component {...props} />;
  };
}

function requiresEmailVerification<T extends object>(
  Component: ComponentType<T>
) {
  return function RequiresEmailVerificationGuard(props: T) {
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
    return <Component {...props} />;
  };
}

export const Protected = withAuthGuard;
export const GuestOnly = withGuestGuard;
export const EmailVerified = isEmailVerified;
export const NeedsEmailVerification = requiresEmailVerification;

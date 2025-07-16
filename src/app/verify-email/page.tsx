"use client";

import { useAuth } from "@/hook/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Footer from "@/components/_Footer";
import Nav from "@/components/_Nav";

export default function VerifyEmail() {
  const { user, loading, isEmailVerified } = useAuth();
  const router = useRouter();
  const [isResending, setIsResending] = useState(false);
  const [resendMessage, setResendMessage] = useState<string | null>(null);

  useEffect(() => {
    // Redirect to home if user is authenticated and email is confirmed
    if (user && isEmailVerified && !loading) {
      router.push("/");
    }
  }, [user, isEmailVerified, loading, router]);

  const handleResendEmail = async () => {
    if (!user?.email) return;

    setIsResending(true);
    setResendMessage(null);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: user.email,
      });

      if (error) {
        setResendMessage("Failed to resend email. Please try again.");
      } else {
        setResendMessage("Verification email sent! Please check your inbox.");
      }
    } catch {
      setResendMessage("Failed to resend email. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  // Show loading state while checking auth
  if (loading) {
    return (
      <>
        <Nav />
        <section className="flex flex-col justify-center items-center px-4 min-h-screen">
          <div className="bg-blue-2 shadow-lg p-8 rounded-2xl w-full max-w-md text-center">
            <div className="mx-auto mb-4 border-b-2 border-blue-8 rounded-full w-12 h-12 animate-spin"></div>
            <p className="text-blue-9 text-lg">
              Checking verification status...
            </p>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Nav />
      <section className="flex flex-col justify-center items-center px-4 min-h-screen">
        <div className="bg-blue-2 shadow-lg p-8 rounded-2xl w-full max-w-md text-center">
          <h1 className="mb-6 font-bold text-blue-9 text-cst text-3xl">
            Check Your Email
          </h1>

          <div className="mb-6">
            <svg
              className="mx-auto mb-4 w-16 h-16 text-blue-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>

          <p className="mb-4 text-blue-9 text-lg">
            We&apos;ve sent you a verification email!
          </p>

          <p className="mb-6 text-blue-7 text-base">
            Please check your email inbox and click the verification link to
            activate your account.
          </p>

          <div className="bg-blue-1 mb-6 p-4 border border-blue-3 rounded-lg">
            <h3 className="mb-2 font-semibold text-blue-9">
              Can&apos;t find the email?
            </h3>
            <ul className="space-y-1 mb-4 text-blue-7 text-sm text-left">
              <li>• Check your spam or junk folder</li>
              <li>• Make sure you entered the correct email address</li>
              <li>• Wait a few minutes - emails can take time to arrive</li>
            </ul>

            <button
              onClick={handleResendEmail}
              disabled={isResending || !user?.email}
              className="bg-blue-8 hover:bg-blue-9 disabled:bg-blue-4 px-4 py-2 rounded-lg w-full font-semibold text-white text-sm transition disabled:cursor-not-allowed"
            >
              {isResending ? "Sending..." : "Resend Verification Email"}
            </button>

            {resendMessage && (
              <p
                className={`text-sm mt-2 ${
                  resendMessage.includes("Failed")
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {resendMessage}
              </p>
            )}
          </div>

          <p className="text-blue-6 text-sm">
            Once verified, you&apos;ll be automatically redirected to your
            dashboard.
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}

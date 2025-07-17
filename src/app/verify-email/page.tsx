"use client";

import { useAuth } from "@/hook/useAuth";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Footer from "@/components/_Footer";
import Nav from "@/components/_Nav";
import { FaCheck } from "react-icons/fa";
import { NeedsEmailVerification } from "@/guard/Guards";

function VerifyEmail() {
  const { user, loading } = useAuth();
  const [isResending, setIsResending] = useState(false);
  const [resendMessage, setResendMessage] = useState<string | null>(null);

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
            <p className="text-blue-8 text-xl">
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
      <section className="flex flex-col items-center px-4 min-h-screen">
        <div className="flex flex-col justify-center items-center bg-blue-2 shadow-lg mt-30 mb-8 p-8 rounded-2xl w-full max-w-md text-center">
          <div className="inline-flex justify-center items-center bg-green-500 mb-6 rounded-full">
            <FaCheck className="mx-4 my-4 text-white" size={32} />
          </div>
          <h2 className="shadow-blue-9 mb-2 font-bold text-cst text-3xl md:text-4xl lg:text-5xl text-center">
            Check Your Email
          </h2>
          <p className="mt-1 mb-6 px-2 text-gray-700 text-base md:text-lg text-center">
            Please check your inbox and click the verification link to activate
            your account.
          </p>

          <div className="bg-blue-1 mb-6 p-4 border border-blue-3 rounded-lg">
            <h3 className="shadow-blue-9 mb-2 text-cst text-lg">
              Can&apos;t find the email?
            </h3>
            <ul className="space-y-1 mb-4 text-gray-500 text-sm text-left">
              <li>• Check your spam or junk folder</li>
              <li>• Make sure you entered the correct email address</li>
              <li>• Wait a few minutes - emails can take time to arrive</li>
            </ul>

            <button
              onClick={handleResendEmail}
              disabled={isResending || !user?.email}
              className="bg-blue-8 hover:bg-blue-9 disabled:bg-blue-4 px-4 py-2 rounded-lg w-full text-white text-sm transition disabled:cursor-not-allowed"
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
        </div>
      </section>
      <Footer />
    </>
  );
}

export default NeedsEmailVerification(VerifyEmail);

"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useAuthReturn, User } from "@/lib/types/auth";
import { createClient } from "@/utils/supabase/client";
import { validateEmail } from "@/utils/validation";

export function useAuth(): useAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isResending, setIsResending] = useState(false);
  const [resendMessage, setResendMessage] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    // Get initial user
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getUser();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  async function login(formData: FormData) {
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    if (!data.email || !data.password) {
      return { error: "All fields are required" };
    }
    if (data.password.length < 6) {
      return { error: "Password must be at least 6 characters long" };
    }
    const isValidEmail = validateEmail(data.email);
    if (!isValidEmail) {
      return { error: "Please enter a valid email address." };
    }

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
      return { error: error.message };
    }

    redirect("/");
  }

  async function signup(formData: FormData) {
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    // Validation checks - return errors instead of throwing
    if (!username || !email || !password || !confirmPassword) {
      return { error: "All fields are required." };
    }

    if (password !== confirmPassword) {
      return { error: "Passwords do not match" };
    }

    if (password.length < 6) {
      return { error: "Password must be at least 6 characters long" };
    }

    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      return { error: "Please enter a valid email address." };
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    });

    if (error) {
      return { error: error.message };
    }

    // Create profile for newly registered users
    if (data.user && !data.user.email_confirmed_at) {
      try {
        const { error: profileError } = await supabase.from("profiles").insert([
          {
            id: data.user.id,
            username: username,
            avatar_url: null,
          },
        ]);

        if (profileError && !profileError.message.includes("duplicate key")) {
          console.error("Profile creation error:", profileError);
        }
      } catch (profileErr) {
        console.error("Fallback profile creation failed:", profileErr);
      }
    }

    redirect("/verify-email");
  }

  const logout = async () => {
    setLoading(true);
    localStorage.removeItem("photos");
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

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

  return {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    handleResendEmail,
    isResending,
    resendMessage,
  };
}

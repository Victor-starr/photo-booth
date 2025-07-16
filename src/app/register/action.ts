"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { validateEmail } from "@/utils/validation";

export async function signup(formData: FormData) {
  const supabase = await createClient();

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

  revalidatePath("/", "layout");

  // Redirect based on email verification status
  if (!data.user?.email_confirmed_at) {
    redirect("/verify-email");
  } else {
    redirect("/");
  }
}

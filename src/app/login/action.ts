"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { validateEmail } from "@/utils/validation";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  if (!data.email || !data.password) {
    throw new Error("All fields are required");
  }
  if (data.password.length < 6) {
    throw new Error("Password must be at least 6 characters long");
  }
  const isValidEmail = validateEmail(data.email);
  if (!isValidEmail) {
    throw new Error("Please enter a valid email address.");
  }

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/", "layout");
  redirect("/");
}

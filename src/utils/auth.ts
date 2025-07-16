import { createClient } from "@/utils/supabase/server";

export async function getUser() {
  const supabase = await createClient();

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error("Error fetching user:", error);
      return null;
    }

    return user;
  } catch (error) {
    console.error("Error in getUser:", error);
    return null;
  }
}

export async function isAuthenticated() {
  const user = await getUser();
  return !!user;
}

export async function requireAuth() {
  const user = await getUser();

  if (!user) {
    throw new Error("Authentication required");
  }

  return user;
}

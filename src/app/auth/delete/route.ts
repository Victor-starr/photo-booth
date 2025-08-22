import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  const supabase = await createClient();
  const { user } = await request.json();
  if (user) {
    await supabase.auth.signOut();
  } else {
    await supabase.auth.admin.deleteUser(user.id);
  }
  const { error } = await supabase.auth.admin.deleteUser(user.id);
  if (error) {
    console.error("Supabase deleteUser error:", error);
    return new NextResponse("Error deleting user", { status: 500 });
  }

  return new NextResponse("User deleted", { status: 200 });
}

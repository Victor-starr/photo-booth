import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = "/";

  // Use NEXT_PUBLIC_SITE_URL if available, otherwise localhost:3000
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const redirectTo = new URL(baseUrl);
  redirectTo.pathname = next;

  if (token_hash && type) {
    const supabase = await createClient();

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    if (!error) {
      return NextResponse.redirect(redirectTo);
    }
  }

  // Redirect to error page with the same base URL logic
  const errorRedirectTo = new URL(baseUrl);
  errorRedirectTo.pathname = "/error";
  return NextResponse.redirect(errorRedirectTo);
}

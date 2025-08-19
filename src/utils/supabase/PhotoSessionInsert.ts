import { createClient } from "@/utils/supabase/client";
import { FrameType } from "@/lib/types/camera";

export async function photoSessionInsert({
  profile_id,
  frame_style,
  frame_custom,
  photo_urls,
}: {
  profile_id: string;
  frame_style: FrameType;
  frame_custom?: string | null;
  photo_urls: string[];
}) {
  const supabase = createClient();

  const { error } = await supabase.from("photo_sessions").insert({
    profile_id,
    frame_style: frame_style as string,
    frame_custom: frame_custom ?? null,
    photo_urls,
  });

  if (error) throw error;
}

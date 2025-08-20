import { createClient } from "@/utils/supabase/client";
import { PhotosSession, FrameType } from "@/lib/types/customize";

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

export async function fetchUserPhotoSessions(
  profileId: string
): Promise<PhotosSession[] | null> {
  try {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("photo_sessions")
      .select("*")
      .eq("profile_id", profileId);

    if (error) {
      console.error("Error fetching user saved sessions:", error);
      return null;
    }

    return data || [];
  } catch (error) {
    console.error("Failed to fetch user saved sessions:", error);
    return null;
  }
}

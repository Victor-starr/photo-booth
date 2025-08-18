import { createClient } from "@/utils/supabase/client";

export async function storageUpload({
  file,
  storageName,
  filePath,
}: {
  file: Blob | File;
  storageName: "photos" | "frame_bg";
  filePath: string;
}) {
  const supabase = createClient();

  const { error: uploadError } = await supabase.storage
    .from(storageName)
    .upload(filePath, file, {
      contentType: "image/jpeg",
    });

  if (uploadError) throw uploadError;

  const { data: signedData, error: signError } = await supabase.storage
    .from(storageName)
    .createSignedUrl(filePath, 60 * 60 * 24 * 365);

  if (signError) throw signError;

  return signedData.signedUrl;
}

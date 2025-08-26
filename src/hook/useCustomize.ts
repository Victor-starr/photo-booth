"use client";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "./useAuth";
import { useRouter } from "next/navigation";
import { exportPhotoStrip } from "@/utils/imageExport";
import { storageUpload } from "@/utils/supabase/StorageUpload";
import {
  FrameType,
  PhotosSession,
  useCustomizeReturn,
} from "@/lib/types/customize";
import {
  fetchUserPhotoSessions,
  photoSessionInsert,
  photoSessionDelete,
} from "@/utils/supabase/PhotoSession";

export function useCustomize(): useCustomizeReturn {
  const exportRef = useRef<HTMLDivElement | null>(null);
  const [photosArr, setPhotosArr] = useState<string[]>([]);
  const [customFrame, setCustomFrame] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [listOfSavedSessions, setListOfSavedSessions] = useState<
    PhotosSession[]
  >([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user?.id) {
      (async () => {
        try {
          setLoading(true);
          const data = await fetchUserPhotoSessions(user.id);
          setListOfSavedSessions(data || []);
        } catch (error) {
          console.error("Failed to fetch user saved sessions:", error);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [user?.id]);

  useEffect(() => {
    setLoading(true);
    const storedPhotos = localStorage.getItem("photos");
    const parsedPhotos = storedPhotos ? JSON.parse(storedPhotos) : [];
    if (parsedPhotos) {
      setPhotosArr(parsedPhotos);
    }
    setLoading(false);
  }, []);

  const savePhotos = async (frame_style: FrameType) => {
    const photoArr = localStorage.getItem("photos")
      ? JSON.parse(localStorage.getItem("photos")!)
      : [];

    if (photoArr.length < 4) {
      console.warn("Not enough photos to save.");
      return;
    }

    try {
      setLoading(true);
      const uploadedUrls: string[] = [];

      for (const photo of photoArr) {
        const base64Data = photo.split(",")[1];
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let j = 0; j < byteCharacters.length; j++) {
          byteNumbers[j] = byteCharacters.charCodeAt(j);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "image/jpeg" });

        const filePath = `${user?.id}/${crypto.randomUUID()}.jpg`;

        const signedUrl = await storageUpload({
          file: blob,
          storageName: "photos",
          filePath,
        });

        uploadedUrls.push(signedUrl);
      }

      let frameCustomUrl: string | null = null;
      if (frame_style === "custom" && customFrame) {
        // Upload custom frame
        const base64Data = customFrame.split(",")[1];
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let j = 0; j < byteCharacters.length; j++) {
          byteNumbers[j] = byteCharacters.charCodeAt(j);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "image/jpeg" });

        const framePath = `${user?.id}/frame_${crypto.randomUUID()}.jpg`;

        frameCustomUrl = await storageUpload({
          file: blob,
          storageName: "frame_bg",
          filePath: framePath,
        });
      }

      if (user?.id) {
        await photoSessionInsert({
          profile_id: user?.id,
          frame_style,
          frame_custom: frameCustomUrl,
          photo_urls: uploadedUrls,
        });
      }

      localStorage.removeItem("photos");
      setPhotosArr([]);
      router.replace("/profile");
    } catch (err) {
      console.error("Failed to save photos:", err);
    } finally {
      setLoading(false);
    }
  };
  const handleExport = async (frameType: FrameType) => {
    if (!exportRef.current) return;

    try {
      setLoading(true);
      await exportPhotoStrip(exportRef.current, frameType);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to export image";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setCustomFrame(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoSessionDelete = async (id: string) => {
    try {
      setLoading(true);
      await photoSessionDelete(id);
      router.push("/profile");
    } catch (error) {
      console.error("Failed to delete photo session:", error);
    } finally {
      setLoading(false);
    }
  };
  return {
    exportRef,
    loading,
    photosArr,
    customFrame,
    savePhotos,
    listOfSavedSessions,
    handleExport,
    handleFileChange,
    handlePhotoSessionDelete,
  };
}

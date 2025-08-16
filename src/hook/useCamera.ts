"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import type {
  PermissionState,
  CameraRef,
  UseCameraReturn,
  PhotosSession,
} from "@/lib/types/camera";
import { createClient } from "@/utils/supabase/client";
import { useAuth } from "./useAuth";

export const useCamera = (): UseCameraReturn => {
  const cameraRef = useRef<CameraRef>(null!);
  const router = useRouter();

  // TODO: GROUPED STATE THEM
  const [permissionStatus, setPermissionStatus] =
    useState<PermissionState>("prompt");
  const [isRequestingPermission, setIsRequestingPermission] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | undefined>();
  const [isCapturing, setIsCapturing] = useState(false);
  const [isCountdownActive, setIsCountdownActive] = useState(false);
  const [countdownValue, setCountdownValue] = useState(3);
  const [numberOfCameras, setNumberOfCameras] = useState(0);
  const [isWideAspectRatio, setIsWideAspectRatio] = useState(false);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [numOfTakenPhotos, setNumOfTakenPhotos] = useState(4);
  const [photosArr, setPhotosArr] = useState<string[]>([]);
  const [listOfSavedSessions, setListOfSavedSessions] = useState<
    PhotosSession[]
  >([]);
  const supabase = createClient();
  const { user } = useAuth();

  // Automatically fetch user sessions when user is available
  useEffect(() => {
    if (user?.id) {
      (async () => {
        try {
          const { data, error } = await supabase
            .from("photo_sessions")
            .select("*")
            .eq("profile_id", user.id);
          setListOfSavedSessions(data || []);
          if (error) {
            console.error("Error fetching user saved sessions:", error);
          }
        } catch (error) {
          console.error("Failed to fetch user saved sessions:", error);
        }
      })();
    }
  }, [user?.id]);

  useEffect(() => {
    const initializePhotos = () => {
      try {
        const storedPhotos = localStorage.getItem("photos");
        const parsedPhotos = storedPhotos ? JSON.parse(storedPhotos) : [];
        setPhotosArr(parsedPhotos);
        setNumOfTakenPhotos(4 - parsedPhotos.length);
      } catch (error) {
        console.error("Failed to parse localStorage photos:", error);
      }
    };

    initializePhotos();

    navigator.permissions
      ?.query({ name: "camera" as PermissionName })
      .then((result) => {
        setPermissionStatus(result.state);
        result.onchange = () => setPermissionStatus(result.state);
      })
      .catch(() => setPermissionStatus("prompt"));
  }, []);

  useEffect(() => {
    if (!isCountdownActive) return;

    if (countdownValue > 1) {
      const timer = setTimeout(
        () => setCountdownValue(countdownValue - 1),
        1000
      );
      return () => clearTimeout(timer);
    } else {
      if (cameraRef.current) {
        const photo = cameraRef.current.takePhoto();
        console.log("Photo captured:", photo ? "Success" : "Failed");
        setCapturedImage(photo);
        const existingPhotos = JSON.parse(
          localStorage.getItem("photos") || "[]"
        );
        const updatedPhotos = [...existingPhotos, photo];

        localStorage.setItem("photos", JSON.stringify(updatedPhotos));
        setPhotosArr(updatedPhotos);
        setNumOfTakenPhotos(4 - updatedPhotos.length);

        if (updatedPhotos.length >= 4) {
          localStorage.setItem("showNavSuggestion", "true");
          setTimeout(() => {
            setIsSessionActive(false);
            setIsCountdownActive(false);
            setIsCapturing(false);
            setCountdownValue(3);
            setCapturedImage(undefined);
            router.replace("/customize");
          }, 3000);
          return;
        }
      }

      const hideTimer = setTimeout(() => {
        setIsCountdownActive(false);
        setIsCapturing(false);
        setCountdownValue(3);
        setCapturedImage(undefined);
      }, 3000);

      return () => clearTimeout(hideTimer);
    }
  }, [isCountdownActive, countdownValue, router]);

  const requestPermission = async (): Promise<boolean> => {
    if (permissionStatus === "granted") return true;

    setIsRequestingPermission(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach((track) => track.stop());
      setPermissionStatus("granted");
      return true;
    } catch (error) {
      console.error("Camera permission denied:", error);
      if (error instanceof DOMException && error.name === "NotAllowedError") {
        setPermissionStatus("denied");
      }
      return false;
    } finally {
      setIsRequestingPermission(false);
    }
  };

  const takePhoto = () => {
    if (isCapturing || !cameraRef.current) return;
    setIsCapturing(true);
    setIsCountdownActive(true);
  };

  const switchCamera = () => {
    cameraRef.current?.switchCamera?.();
  };

  const toggleAspectRatio = () => {
    setIsWideAspectRatio(!isWideAspectRatio);
  };
  const savePhotos = async (frameType: string) => {
    const photoArr = localStorage.getItem("photos")
      ? JSON.parse(localStorage.getItem("photos")!)
      : [];

    if (photoArr.length < 4) {
      console.warn("Not enough photos to save.");
      return;
    }

    try {
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

        const { error: uploadError } = await supabase.storage
          .from("photos")
          .upload(filePath, blob, {
            contentType: "image/jpeg",
          });

        if (uploadError) throw uploadError;

        const { data: signedData, error: signError } = await supabase.storage
          .from("photos")
          .createSignedUrl(filePath, 60 * 60 * 24 * 365);

        if (signError) throw signError;

        uploadedUrls.push(signedData.signedUrl);
      }

      const { error: dbError } = await supabase.from("photo_sessions").insert({
        profile_id: user?.id,
        frame_style: frameType || "default",
        photo_urls: uploadedUrls,
      });

      if (dbError) throw dbError;

      localStorage.removeItem("photos");
      setPhotosArr([]);
      router.replace("/profile");
    } catch (err) {
      console.error("Failed to save photos:", err);
    }
  };

  const userSavedSessionsList = async () => {
    try {
      const { data, error } = await supabase
        .from("photo_sessions")
        .select("*")
        .eq("profile_id", user?.id);
      setListOfSavedSessions(data || []);

      if (error) {
        console.error("Error fetching user saved sessions:", error);
      }
    } catch (error) {
      console.error("Failed to fetch user saved sessions:", error);
    }
  };

  const startSession = () => {
    localStorage.removeItem("photos");
    setPhotosArr([]);
    setNumOfTakenPhotos(4);
    setCapturedImage(undefined);
    setIsSessionActive(true);
  };

  const endSession = () => {
    setIsSessionActive(false);
    setCapturedImage(undefined);
    setIsCountdownActive(false);
    setIsCapturing(false);
  };

  const startOverAgain = () => {
    endSession();
    startSession();
    router.replace("/session");
  };

  return {
    cameraRef,
    permissionStatus,
    isRequestingPermission,
    requestPermission,
    capturedImage,
    numOfTakenPhotos,
    photosArr,
    isCapturing,
    takePhoto,
    isCountdownActive,
    countdownValue,
    numberOfCameras,
    switchCamera,
    setCameraCount: setNumberOfCameras,
    isWideAspectRatio,
    toggleAspectRatio,
    isSessionActive,
    startSession,
    endSession,
    startOverAgain,
    savePhotos,
    userSavedSessionsList,
    listOfSavedSessions,
  };
};

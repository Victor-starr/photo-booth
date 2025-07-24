"use client";
import { useState, useRef, useEffect } from "react";
import type {
  PermissionState,
  CameraRef,
  UseCameraReturn,
} from "@/lib/types/camera";

export const useCamera = (): UseCameraReturn => {
  const cameraRef = useRef<CameraRef>(null!);

  // Simplified state
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

  // Check permissions once on mount
  useEffect(() => {
    navigator.permissions
      ?.query({ name: "camera" as PermissionName })
      .then((result) => {
        setPermissionStatus(result.state);
        result.onchange = () => setPermissionStatus(result.state);
      })
      .catch(() => setPermissionStatus("prompt"));
  }, []);

  // Handle countdown and photo capture
  useEffect(() => {
    if (!isCountdownActive) return;

    if (countdownValue > 1) {
      const timer = setTimeout(
        () => setCountdownValue(countdownValue - 1),
        1000
      );
      return () => clearTimeout(timer);
    } else {
      // Take photo when countdown reaches 0
      if (cameraRef.current) {
        const photo = cameraRef.current.takePhoto();
        console.log("Photo captured:", photo ? "Success" : "Failed");
        setCapturedImage(photo);
      }

      // Auto-hide after 4 seconds to show the photo longer
      const hideTimer = setTimeout(() => {
        setIsCountdownActive(false);
        setIsCapturing(false);
        setCountdownValue(3);
        setCapturedImage(undefined); // Clear the image when hiding
      }, 3000);

      return () => clearTimeout(hideTimer);
    }
  }, [isCountdownActive, countdownValue]);

  // Simplified functions
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

  const startSession = () => {
    setIsSessionActive(true);
  };

  const endSession = () => {
    setIsSessionActive(false);
    setCapturedImage(undefined);
    setIsCountdownActive(false);
    setIsCapturing(false);
  };

  const clearPhoto = () => {
    setCapturedImage(undefined);
  };

  return {
    cameraRef,
    permissionStatus,
    isRequestingPermission,
    requestPermission,
    hasPermission: permissionStatus === "granted",
    capturedImage,
    isCapturing,
    takePhoto,
    clearPhoto,
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
  };
};

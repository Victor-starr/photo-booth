"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import type {
  PermissionState,
  CameraRef,
  UseCameraReturn,
} from "@/lib/types/camera";

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
          setTimeout(() => {
            setIsSessionActive(false);
            setIsCountdownActive(false);
            setIsCapturing(false);
            setCountdownValue(3);
            setCapturedImage(undefined);
            router.push("/customize");
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
  };
};

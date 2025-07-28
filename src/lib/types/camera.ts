import { RefObject } from "react";

// Permission types
export type PermissionState = "granted" | "denied" | "prompt";

// Camera ref interface for react-camera-pro
export interface CameraRef {
  takePhoto: () => string;
  switchCamera?: () => void;
  getNumberOfCameras?: () => number;
}

// Main camera hook return type
export interface UseCameraReturn {
  // Camera ref
  cameraRef: RefObject<CameraRef>;

  // Permission handling
  permissionStatus: PermissionState;
  isRequestingPermission: boolean;
  requestPermission: () => Promise<boolean>;
  hasPermission: boolean;

  // Photo capture
  capturedImage: string | undefined;
  numOfTakenPhotos: number;
  photosArr: string[];
  isCapturing: boolean;
  takePhoto: () => void;
  clearPhoto: () => void;

  // Countdown
  isCountdownActive: boolean;
  countdownValue: number;

  // Camera controls
  numberOfCameras: number;
  switchCamera: () => void;
  setCameraCount: (count: number) => void;

  // Aspect ratio
  isWideAspectRatio: boolean;
  toggleAspectRatio: () => void;

  // Session management
  isSessionActive: boolean;
  startSession: () => void;
  endSession: () => void;
}

export interface PhotoFramesProps {
  photoArr: string[];
  type: "classic" | "dark" | "retro" | "moon" | "party";
}

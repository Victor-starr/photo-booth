import { RefObject } from "react";

// Permission types
export type PermissionState = "granted" | "denied" | "prompt";

// Camera ref interface for react-camera-pro
export interface CameraRef {
  takePhoto: () => string;
  switchCamera?: () => void;
  getNumberOfCameras?: () => number;
}
export interface PhotosSession {
  id: string;
  profile_id: string;
  created_at: string;
  frame_style: string;
  photo_urls: string[];
}

// Main camera hook return type
export interface UseCameraReturn {
  //loading status
  loading: boolean;
  // Camera ref
  cameraRef: RefObject<CameraRef>;
  // Export ref
  exportRef: RefObject<HTMLDivElement | null>;

  // Permission handling
  permissionStatus: PermissionState;
  isRequestingPermission: boolean;
  requestPermission: () => Promise<boolean>;

  // Photo capture
  capturedImage: string | undefined;
  numOfTakenPhotos: number;
  photosArr: string[];
  isCapturing: boolean;
  takePhoto: () => void;

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
  startOverAgain: () => void;
  userSavedSessionsList: () => Promise<void>;
  listOfSavedSessions: PhotosSession[];

  //customize management
  handleExport: (frameType: PhotoFramesProps["type"]) => Promise<void>;
  savePhotos: (frameType: string) => Promise<void>;
}

export interface PhotoFramesProps {
  photoArr: string[];
  type: "classic" | "dark" | "retro" | "moon" | "party";
  onImageClick: (imageUrl: string) => void;
}

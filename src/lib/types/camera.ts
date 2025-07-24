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

// Component props interfaces
export interface CameraControlsProps {
  cameraRef: RefObject<CameraRef>;
  onTakePhoto: () => void;
  onToggleAspectRatio: () => void;
  onSwitchCamera: () => void;
  cameraCount: number;
  loading: boolean;
  setCameraCount: (count: number) => void;
}

export interface PhotoCountDownProps {
  image: string | undefined;
  triggerCountdown: boolean;
  count?: number;
}

// Camera error messages interface
export interface CameraErrorMessages {
  noCameraAccessible: string;
  permissionDenied: string;
  switchCamera: string;
  canvas: string;
}

// Session related types
export interface SessionState {
  isActive: boolean;
  photosCount: number;
  maxPhotos: number;
  currentPhoto: number;
}

// Photo data interface
export interface PhotoData {
  id: string;
  imageUrl: string;
  timestamp: Date;
  metadata?: {
    width: number;
    height: number;
    aspectRatio: string;
    cameraUsed?: string;
  };
}

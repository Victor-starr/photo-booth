export interface useCustomizeReturn {
  photosArr: string[];
  loading: boolean;
  listOfSavedSessions: PhotosSession[];
  exportRef: React.RefObject<HTMLDivElement | null>;
  customFrame: string | undefined;
  handleExport: (frameType: FrameType) => Promise<void>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  savePhotos: (frameType: FrameType) => Promise<void>;
  handlePhotoSessionDelete: (id: string) => Promise<void>;
}
export interface FrameControllerProps {
  loading: boolean;
  frameType: FrameType;
  customFrame?: string;
  stickerType: StickerTheme;
  setStickerType: (type: StickerTheme) => void;
  setFrameType: (type: FrameType) => void;
  startOverAgain: () => void;
  handleExport: (frameType: FrameType) => Promise<void>;
  handleSave: () => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePhotoDelete?: () => void;
  controllerType: "customize" | "session";
}

export interface PhotoFramesProps {
  photoArr: string[];
  type: FrameType;
  stickerType: StickerTheme;
  bgCustom?: string;

  onImageClick: (imageUrl: string) => void;
}
export type FrameType =
  | "classic"
  | "dark"
  | "retro"
  | "moon"
  | "party"
  | "summer"
  | "custom";

export type StickerTheme =
  | "none"
  | "food"
  | "summer"
  | "winter"
  | "halloween"
  | "party"
  | "school"
  | "night";

export interface PhotosSession {
  id: string;
  profile_id: string;
  created_at: string;
  frame_style: string;
  frame_custom: string | null;
  photo_urls: string[];
}

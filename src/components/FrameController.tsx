import { PhotoFramesProps } from "@/lib/types/camera";
import { exportPhotoStrip } from "@/utils/imageExport";
import { VscDebugRestart } from "react-icons/vsc";
import { FaDownload } from "react-icons/fa";
import { FaSave } from "react-icons/fa";

interface FrameControllerProps {
  frameType: PhotoFramesProps["type"];
  setFrameType: (type: PhotoFramesProps["type"]) => void;
  startOverAgain: () => void;
  savePhotos: (frameType: string) => Promise<void>;
  exportRef: React.RefObject<HTMLDivElement | null>;
  controllerType: "customize" | "session";
}
function FrameController({
  frameType,
  setFrameType,
  startOverAgain,
  savePhotos,
  exportRef,
  controllerType,
}: FrameControllerProps) {
  const handleExport = async () => {
    if (!exportRef.current) return;

    try {
      await exportPhotoStrip(exportRef.current, frameType);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to export image";
      alert(errorMessage);
    }
  };

  const handleSave = async () => {
    try {
      await savePhotos(frameType);
      alert("Photos saved successfully!");
    } catch {
      alert("Failed to save photos.");
    }
  };
  const frameOptions: PhotoFramesProps["type"][] = [
    "classic",
    "dark",
    "retro",
    "moon",
    "party",
  ];
  return (
    <aside className="flex flex-col gap-4 lg:gap-6 bg-blue-2 p-4 lg:p-8 border border-black rounded-3xl w-full max-w-sm lg:max-w-md">
      <h2 className="shadow-blue-9 text-cst text-xl lg:text-2xl xl:text-3xl lg:text-left text-center">
        Photo Strip Theme
      </h2>

      <div className="flex flex-wrap gap-2 lg:gap-3 xl:gap-4">
        {frameOptions.map((t) => (
          <button
            key={t}
            onClick={() => setFrameType(t)}
            className={`px-3 lg:px-5 py-2 rounded-md border border-black shadow-custom-position bg-white hover:bg-blue-5 hover:text-white text-sm lg:text-base transition-colors ${
              frameType === t ? "shadow-pink-8" : "shadow-black"
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>
      <div className="flex lg:flex-row flex-col gap-3 lg:gap-4">
        {controllerType === "customize" && (
          <>
            <button
              onClick={() => handleSave()}
              className="flex justify-center items-center gap-2 bg-blue-8 hover:bg-white shadow-blue-950 shadow-custom-position px-4 lg:px-6 py-2 border border-black rounded-lg text-white hover:text-blue-500 text-sm lg:text-base transition-colors"
            >
              <FaSave /> Save
            </button>
            <button
              onClick={startOverAgain}
              className="flex justify-center items-center gap-2 bg-gray-100 hover:bg-pink-8 shadow-custom-position px-4 lg:px-6 py-2 border border-black rounded-lg hover:text-white text-sm lg:text-base transition-colors"
            >
              <VscDebugRestart /> Start Over
            </button>
          </>
        )}
        <button
          onClick={handleExport}
          className="flex justify-center items-center gap-2 bg-blue-9 hover:bg-white shadow-custom-position px-4 lg:px-6 py-2 border border-black rounded-lg text-white hover:text-blue-9 text-sm lg:text-base transition-colors"
        >
          <FaDownload /> Export
        </button>
      </div>
    </aside>
  );
}

export default FrameController;

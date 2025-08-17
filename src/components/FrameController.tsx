import { PhotoFramesProps } from "@/lib/types/camera";
import { VscDebugRestart } from "react-icons/vsc";
import { FaDownload } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { Spinner } from "./LoadingScreen";
interface FrameControllerProps {
  loading: boolean;
  frameType: PhotoFramesProps["type"];
  setFrameType: (type: PhotoFramesProps["type"]) => void;
  startOverAgain: () => void;
  handleExport: (frameType: PhotoFramesProps["type"]) => Promise<void>;
  handleSave: (frameType: PhotoFramesProps["type"]) => Promise<void>;
  controllerType: "customize" | "session";
}
function FrameController({
  frameType,
  setFrameType,
  startOverAgain,
  controllerType,
  handleExport,
  handleSave,
  loading,
}: FrameControllerProps) {
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
              onClick={async () => await handleSave(frameType)}
              className="flex justify-center items-center gap-2 bg-blue-8 hover:bg-white shadow-blue-950 shadow-custom-position px-4 lg:px-6 py-2 border border-black rounded-lg text-white hover:text-blue-500 text-sm lg:text-base transition-colors"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="small" /> Save
                </>
              ) : (
                <>
                  <FaSave /> Save
                </>
              )}
            </button>
            <button
              onClick={() => startOverAgain()}
              className="flex justify-center items-center gap-2 bg-gray-300 hover:bg-pink-8 shadow-custom-position px-4 lg:px-6 py-2 border border-black rounded-lg hover:text-white text-sm lg:text-base transition-colors"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="small" /> Restart
                </>
              ) : (
                <>
                  <VscDebugRestart /> Restart
                </>
              )}
            </button>
          </>
        )}
        <button
          onClick={async () => await handleExport(frameType)}
          className="flex justify-center items-center gap-2 bg-blue-9 hover:bg-white shadow-custom-position px-4 lg:px-6 py-2 border border-black rounded-lg text-white hover:text-blue-9 text-sm lg:text-base transition-colors"
          disabled={loading}
        >
          {loading ? (
            <>
              <Spinner size="small" /> Export
            </>
          ) : (
            <>
              <FaDownload /> Export
            </>
          )}
        </button>
      </div>
    </aside>
  );
}

export default FrameController;

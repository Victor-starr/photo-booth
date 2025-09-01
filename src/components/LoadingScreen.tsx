import Footer from "@/components/_Footer";
import Nav from "@/components/_Nav";

type LoadingScreenType =
  | "default"
  | "spinner"
  | "error"
  | "success"
  | "no-access";

interface LoadingScreenProps {
  title: string;
  subtitle?: string;
  showSpinner?: boolean;
  type?: LoadingScreenType;
}

export default function LoadingScreen({
  title,
  subtitle,
  showSpinner = false,
  type = "default",
}: LoadingScreenProps) {
  let color = "text-black";
  let spinner = showSpinner;
  let displayTitle = title;
  let displaySubtitle = subtitle;

  switch (type) {
    case "spinner":
      spinner = true;
      break;
    case "error":
      color = "text-red-600";
      break;
    case "success":
      color = "text-green-600";
      break;
    case "no-access":
      color = "text-yellow-600";
      if (!title) displayTitle = "You do not have access.";
      if (!subtitle) displaySubtitle = "Redirecting to login page...";
      spinner = true;
      break;
    default:
      break;
  }

  return (
    <>
      <Nav />
      <div className="flex flex-col justify-center items-center h-[85vh]">
        <div className="text-center">
          {spinner && (
            <div className="mx-auto mb-4 border-gray-900 border-b-2 rounded-full w-8 h-8 animate-spin"></div>
          )}
          <h2 className={`mb-4 text-2xl ${color}`}>{displayTitle}</h2>
          {displaySubtitle && <p>{displaySubtitle}</p>}
        </div>
      </div>
      <Footer />
    </>
  );
}

export const Spinner = ({
  text,
  size,
}: {
  text?: string;
  size?: "small" | "medium" | "large";
}) => (
  <div className="flex flex-col justify-center items-center w-auto h-full">
    <div
      className={`mx-auto mb-2 border-white border-b-2 rounded-full ${
        size === "small"
          ? "w-4 h-4"
          : size === "large"
          ? "w-24 h-24"
          : "w-20 h-20"
      } animate-spin`}
    ></div>
    {text && <span className="mt-1 text-white text-xl">{text}</span>}
  </div>
);

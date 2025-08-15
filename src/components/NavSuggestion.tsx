import { useAuth } from "@/hook/useAuth";
import { useCamera } from "@/hook/useCamera";
import useLocalStorageBoolean from "@/hook/useLocalStorageBoolean";
import Link from "next/link";
import { IoClose } from "react-icons/io5";
import { MdAdsClick } from "react-icons/md";
import { redirect } from "next/navigation";

function NavSuggestion() {
  const { photosArr } = useCamera();
  const { isAuthenticated } = useAuth();
  const [visible, setVisible] = useLocalStorageBoolean(
    "showNavSuggestion",
    true
  );

  if (!visible || photosArr.length !== 4 || !isAuthenticated) {
    return null;
  }

  return (
    <div className="relative flex flex-row justify-center items-center gap-5 bg-pink-300 py-2 pr-15 pl-5 text-white text-sm md:text-lg lg:text-xl text-center">
      <IoClose
        onClick={() => setVisible(false)}
        className="right-5 lg:right-10 absolute"
        aria-label="Close"
        size={25}
      />
      <p>We still have your photos from last session you had!</p>
      <MdAdsClick
        size={25}
        className="lg:hidden inline-block flex-shrink-0 text-red-800 hover:text-red-600 active:text-red-600"
        onClick={() => redirect("/customize")}
      />
      <Link
        href="/customize"
        className="hidden lg:flex flex-shrink-0 justify-center items-center text-red-800 hover:text-red-600 active:text-red-600 underline"
      >
        CLICK HERE !!
      </Link>
    </div>
  );
}

export default NavSuggestion;

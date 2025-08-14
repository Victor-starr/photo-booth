"use client";

import { useAuth } from "@/hook/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoCamera, IoPersonSharp } from "react-icons/io5";
import { LuLogOut, LuLogIn } from "react-icons/lu";
import { FaGithub } from "react-icons/fa";
import NavSuggestion from "./NavSuggestion";

const Nav = () => {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const handleRoute = async (navigate: "/login" | "/logout") => {
    switch (navigate) {
      case "/login":
        router.push("/login");
        break;
      case "/logout":
        try {
          router.push("/");
          await logout();
        } catch (error) {
          console.error("Error logging out:", error);
        }
    }
  };

  return (
    <>
      <nav className="z-3 flex justify-around bg-pink-2 px-6 md:px-10 py-4 md:py-6 w-full h-auto overflow-hidden">
        <Link
          className="relative flex items-center shadow-red-500 h-auto text-cst"
          href={"/"}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl">Photo Booth</h2>
          <IoCamera className="hidden md:inline relative ml-2 size-7 sm:size-8 md:size-9 lg:size-10 rotate-25" />
        </Link>
        <div className="flex flex-row flex-shrink-0 items-center gap-2 lg:gap-6">
          {isAuthenticated ? (
            <>
              <Link
                href="/profile"
                className="flex justify-center items-center bg-pink-400 hover:bg-pink-8 disabled:bg-gray-400 md:px-4 md:py-2 rounded-2xl text-white text-xl md:text-2xl transition-colors duration-200"
              >
                <span className="hidden md:inline">Profile</span>
                <IoPersonSharp className="md:hidden block size-6" />
              </Link>
              <button
                onClick={() => handleRoute("/logout")}
                className="flex justify-center items-center bg-pink-400 hover:bg-pink-8 disabled:bg-gray-400 md:px-4 md:py-2 rounded-2xl text-white text-xl md:text-2xl transition-colors duration-200"
              >
                <LuLogOut className="md:hidden block size-6" />
                <span className="hidden md:inline">Log Out</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => handleRoute("/login")}
              className="flex justify-center items-center bg-pink-400 hover:bg-pink-8 disabled:bg-gray-400 md:px-4 md:py-2 rounded-2xl text-white text-xl md:text-2xl transition-colors duration-200"
            >
              <LuLogIn className="md:hidden block size-6" />
              <span className="hidden md:inline">Log In</span>
            </button>
          )}

          <Link
            href="https://github.com/Victor-starr/photo-booth"
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center items-center bg-pink-400 hover:bg-pink-8 rounded-2xl w-8 sm:w-9 md:w-11 h-8 sm:h-9 md:h-11"
          >
            <FaGithub className="size-6 text-white" />
          </Link>
        </div>
      </nav>
      <NavSuggestion />
    </>
  );
};

export default Nav;

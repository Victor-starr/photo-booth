import Image from "next/image";
import Link from "next/link";
const Nav = () => {
  // TEMP user auth nav displayer
  const isAuthenticated = false;
  return (
    <nav className="flex justify-between items-end bg-pink-2 px-4 sm:px-8 md:px-10 pt-2 pb-4 sm:pb-6 w-full h-auto overflow-hidden">
      <Link className="flex-shrink-0" href={"/"}>
        <Image
          src="/svg/NavLogo.svg"
          alt="Photo Booth Logo"
          width={180}
          height={40}
          priority
          className="w-[120px] sm:w-[180px] md:w-[270px] h-auto"
        />
      </Link>
      <div className="flex flex-row flex-shrink-0 items-center gap-6">
        <Link
          href={isAuthenticated ? "/logout" : "/login"}
          className="bg-pink-400 hover:bg-pink-8 shadow-red-600 px-4 pt-1 pb-2 rounded-lg text-cst text-white text-lg sm:text-xl md:text-2xl transition-colors duration-200"
        >
          {isAuthenticated ? "Log Out" : "Log In"}
        </Link>
        {!isAuthenticated && (
          <Link
            href="/signup"
            className="bg-purple-500 hover:bg-purple-700 shadow-purple-700 px-4 pt-1 pb-2 rounded-lg text-cst text-white text-lg sm:text-xl md:text-2xl transition-colors duration-200"
          >
            Sign Up
          </Link>
        )}

        <Link
          href="https://github.com/Victor-starr/photo-booth"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/svg/github.svg"
            alt="github Icon"
            width={36}
            height={36}
            className="w-8 sm:w-10 md:w-[50px] h-8 sm:h-10 md:h-[50px]"
          />
        </Link>
      </div>
    </nav>
  );
};

export default Nav;

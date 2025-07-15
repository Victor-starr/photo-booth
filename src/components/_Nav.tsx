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
      <div className="flex flex-row flex-shrink-0 items-end gap-3 sm:gap-6">
        <Link
          href={isAuthenticated ? "/logout" : "/login"}
          className="bg-pink-400 hover:bg-pink-8 shadow-red-600 px-2 sm:px-4 pt-0.5 sm:pt-1 pb-1 sm:pb-2 rounded-lg text-cst text-white text-base sm:text-lg md:text-xl transition-colors duration-200"
        >
          {isAuthenticated ? "Log Out" : "Log In"}
        </Link>

        <Link
          href="https://github.com/Victor-starr/photo-booth"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-end"
        >
          <Image
            src="/svg/github.svg"
            alt="github Icon"
            width={36}
            height={36}
            className="w-7 sm:w-8 md:w-10 h-7 sm:h-8 md:h-10"
          />
        </Link>
      </div>
    </nav>
  );
};

export default Nav;

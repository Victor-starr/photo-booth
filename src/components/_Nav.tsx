import Image from "next/image";
import Link from "next/link";
const Nav = () => {
  return (
    <nav className="flex justify-between items-end bg-pink-2 px-4 sm:px-8 md:px-10 pt-2 pb-4 sm:pb-6 w-full h-auto overflow-hidden">
      <div className="flex-shrink-0">
        <Image
          src="/svg/NavLogo.svg"
          alt="Photo Booth Logo"
          width={180}
          height={40}
          priority
          className="w-[120px] sm:w-[180px] md:w-[270px] h-auto"
        />
      </div>
      <div className="flex-shrink-0">
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

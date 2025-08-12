import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex justify-center items-center bg-pink-2 mt-auto px-4 sm:px-8 py-3 sm:py-4 w-full">
      <div className="text-white text-xs sm:text-sm text-center">
        <p>
          &copy; {new Date().getFullYear()} Photo Booth |{" "}
          <Link
            href={"https://www.linkedin.com/in/victor-starr"}
            target="_blank"
            className="hover:underline"
          >
            Victor Starr
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

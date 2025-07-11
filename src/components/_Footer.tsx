import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex justify-center items-center bg-pink-2 px-8 pt-2 pb-4 w-full h-auto">
      <div className="text-white text-sm sm:text-base text-center">
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

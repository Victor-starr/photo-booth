import Link from "next/link";
import Footer from "@/components/_Footer";
import Nav from "@/components/_Nav";

export default function ErrorPage() {
  return (
    <>
      <Nav />
      <section className="flex flex-col justify-center items-center w-full h-[84vh]">
        <h2 className="shadow-red-500 mb-4 text-cst text-4xl md:text-5xl lg:text-8xl text-center">
          Oops!
        </h2>
        <p className="mt-2 mb-8 px-10 text-gray-600 text-sm md:text-lg text-center">
          Sorry, something went wrong. This could be due to an invalid login
          attempt, expired token, or authentication error.
        </p>
        <div className="flex gap-4">
          <Link
            href="/login"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md text-white transition-colors"
          >
            Try Again
          </Link>
          <Link
            href="/"
            className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-md text-white transition-colors"
          >
            Go Home
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
}

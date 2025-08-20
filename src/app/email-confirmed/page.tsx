import Link from "next/link";
import { GuestGuardWrapper } from "@/guard/Guards";
import Footer from "@/components/_Footer";
import Nav from "@/components/_Nav";
import { FaCheck } from "react-icons/fa";

export default function EmailVerifiedThankYou() {
  return (
    <GuestGuardWrapper>
      <Nav />
      <section className="flex flex-col items-center px-4 min-h-[calc(100vh-140px)]">
        <div className="flex flex-col justify-center items-center bg-blue-2 shadow-lg mt-30 mb-8 p-8 rounded-2xl w-full max-w-md text-center">
          <div className="inline-flex justify-center items-center bg-green-500 mb-6 rounded-full">
            <FaCheck className="mx-4 my-4 text-white" size={32} />
          </div>
          <h2 className="shadow-blue-9 mb-2 font-bold text-cst text-3xl md:text-4xl lg:text-5xl text-center">
            Thank You for Verifying!
          </h2>
          <p className="mt-1 mb-6 px-2 text-gray-700 text-base md:text-lg text-center">
            Your email has been successfully verified.
            <br />
            This is a burner page—please return to your previous page to
            continue.
            <br />
            If you need to log in again, you can do so below.
          </p>
          <Link
            href="/login"
            className="bg-blue-8 hover:bg-blue-9 px-4 py-2 rounded-lg w-full text-white text-sm transition"
          >
            Login Page
          </Link>
        </div>
      </section>
      <Footer />
    </GuestGuardWrapper>
  );
}

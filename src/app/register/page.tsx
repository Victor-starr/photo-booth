import { GuestGuardWrapper } from "@/guard/Guards";
import SingUpForm from "@/components/SingUpForm";
import Footer from "@/components/_Footer";
import Nav from "@/components/_Nav";

export default function RegisterPage() {
  return (
    <GuestGuardWrapper>
      <Nav />
      <section className="flex flex-col items-center px-4 py-8 w-full min-h-[calc(100vh-140px)]">
        <h2 className="shadow-red-500 text-cst text-3xl sm:text-4xl md:text-5xl lg:text-8xl text-center">
          Create Account
        </h2>
        <p className="mt-2 mb-6 px-4 sm:px-10 text-gray-600 text-sm sm:text-base md:text-lg text-center">
          Sign up to start your personalized photo booth experience and manage
          your photos.
        </p>
        <SingUpForm />
      </section>
      <Footer />
    </GuestGuardWrapper>
  );
}

import { GuestGuardWrapper } from "@/guard/Guards";
import Footer from "@/components/_Footer";
import Nav from "@/components/_Nav";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <GuestGuardWrapper>
      <Nav />
      <section className="flex flex-col items-center px-4 py-8 w-full min-h-[calc(100vh-140px)]">
        <h2 className="shadow-red-500 text-cst text-3xl sm:text-4xl md:text-5xl lg:text-8xl text-center">
          Welcome Back
        </h2>
        <p className="mt-2 mb-6 px-4 sm:px-10 text-gray-600 text-sm sm:text-base md:text-lg text-center">
          Log in to access your personalized photo booth experience and manage
          your photos.
        </p>
        <LoginForm />
      </section>
      <Footer />
    </GuestGuardWrapper>
  );
}

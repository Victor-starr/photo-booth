import Footer from "@/components/_Footer";
import Nav from "@/components/_Nav";
import SingUpForm from "@/components/SingUpForm";

export default function RegisterPage() {
  return (
    <>
      <Nav />
      <section className="flex flex-col items-center w-screen h-screen">
        <h2 className="shadow-red-500 text-cst text-4xl md:text-5xl lg:text-8xl text-center">
          Create Account
        </h2>
        <p className="mt-2 px-10 text-gray-600 text-sm md:text-lg text-center">
          Sign up to start your personalized photo booth experience and manage
          your photos.
        </p>
        <SingUpForm />
      </section>
      <Footer />
    </>
  );
}

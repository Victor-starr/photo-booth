import Footer from "@/components/_Footer";
import Nav from "@/components/_Nav";
import LoginForm from "@/components/LoginForm";

export default function Login() {
  return (
    <>
      <Nav />
      <section className="flex flex-col justify-center items-center w-full h-[84vh]">
        <h2 className="shadow-red-500 text-cst text-4xl md:text-5xl lg:text-8xl text-center">
          Welcome Back
        </h2>
        <p className="mt-2 px-10 text-gray-600 text-sm md:text-lg text-center">
          Log in to access your personalized photo booth experience and manage
          your photos.
        </p>
        <LoginForm />
      </section>
      <Footer />
    </>
  );
}

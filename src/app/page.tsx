import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/_Nav";
import FormFeedBack from "@/components/FormFeedBack";
import Footer from "@/components/_Footer";
import { FaLocationDot } from "react-icons/fa6";
import { FaPaintBrush } from "react-icons/fa";
import { IoTimer } from "react-icons/io5";

const features = [
  {
    icon: (
      <FaLocationDot
        color="00B2FF"
        size={48}
        className="sm:size-10 md:size-15 lg:size-20"
      />
    ),
    title: "Use It Anywhere",
    description:
      "Take photos with anyone, anytime — no matter where they are in the world.",
  },
  {
    icon: (
      <FaPaintBrush
        color="00B2FF"
        size={48}
        className="sm:size-10 md:size-15 lg:size-20"
      />
    ),
    title: "Make It Yours",
    description:
      "Pick your background, frame, and layout to match your vibe and style.",
  },
  {
    icon: (
      <IoTimer
        color="00B2FF"
        size={48}
        className="sm:size-10 md:size-15 lg:size-20"
      />
    ),
    title: "Quick & Easy",
    description:
      "Jump in, snap a photo, and share it — all in just a few taps.",
  },
];
export default function Home() {
  return (
    <>
      <Nav />
      <header className="z-2 relative flex flex-col justify-center items-center sm:h-[40vh] md:h-[50vh] lg:h-[60vh] min-h-[50vh] overflow-hidden hero_bg_img">
        <div className="z-3 flex flex-col justify-center items-center bg-black/35 shadow-red-600 px-4 w-full sm:h-[40vh] md:h-[50vh] lg:h-[60vh] min-h-[50vh] text-cst text-white">
          <div className="relative flex justify-center items-center mx-auto w-auto max-w-4xl">
            <h2 className="mt-6 sm:mt-10 px-2 font-genty text-3xl sm:text-4xl md:text-6xl lg:text-8xl text-center">
              Photo Booth
            </h2>
            <div className="-top-3 sm:-top-5 lg:-top-8 -right-8 sm:-right-10 md:-right-15 lg:-right-20 absolute">
              <Image
                src={"/svg/camera-icon.svg"}
                alt="Camera Icon"
                width={60}
                height={60}
                className="w-8 sm:w-12 md:w-16 lg:w-20 h-8 sm:h-12 md:h-16 lg:h-20"
              />
            </div>
          </div>
          <p className="my-2 px-2 w-full max-w-xl text-sm sm:text-base md:text-xl lg:text-3xl text-center">
            Snap photos with friends and family no matter where they are. Choose
            your own background, frame, and style.
          </p>
          <Link
            href="/session"
            className="bg-pink-8 hover:bg-pink-400 mt-3 sm:mt-4 mb-6 sm:mb-10 px-3 sm:px-4 py-2 sm:pt-1 lg:pt-3 sm:pb-2 lg:pb-4 rounded-2xl sm:text-md text-lg md:text-2xl lg:text-3xl xl:text-4xl active:scale-110 transition-all duration-200"
          >
            Give it a Try
          </Link>
        </div>
      </header>
      <section className="relative flex flex-col justify-center overflow-hidden itemc-center">
        <Image
          src={"/svg/pink-line.svg"}
          alt="Pink Line Decoration"
          width={1}
          height={1}
          className="top-0 left-0 z-2 absolute w-full h-full md:h-[120vh] lg:h-[200vh] scale-200 sm:scale-0 md:scale-100 lg:scale-100"
        />
        <Image
          src={"/svg/camera.svg"}
          alt="Camera Icon"
          width={1}
          height={1}
          className="top-7 md:top-15 lg:top-20 right-7 md:right-15 lg:right-20 z-4 absolute w-25 md:w-55 lg:w-75 h-25 md:h-55 lg:h-75 rotate-12 hover:rotate-25 active:rotate-25 hover:scale-110 transition-transform duration-200"
        />
        <div className="relative w-[100vw] h-[50vh] sm:h-[45vh] md:h-[60vh] lg:h-[100vh]">
          <Image
            src={"/svg/retro-photo-2.svg"}
            alt="Retro Photo Background"
            width={1}
            height={1}
            className="-top-15 md:left-0 lg:-left-18 z-1 relative w-full sm:h-[45vh] md:h-[60vh] lg:h-full lg:scale-110"
          />

          <article className="top-45 sm:top-60 md:top-100 lg:top-180 md:left-4 lg:left-8 z-10 absolute mr-20 sm:mr-0 pl-10 w-auto max-w-auto sm:max-w-[80vw] md:max-w-[70vw] lg:max-w-[60vw]">
            <h2 className="shadow-pink-8 mb-3 text-cst sm:text-3xl md:text-5xl lg:text-8xl">
              About
            </h2>
            <p className="shadow-pink-8 w-full text-cst sm:text-xl md:text-2xl lg:text-4xl">
              This app lets you and your friends take photos together no matter
              where you are in the world. You don’t need to look for a photo
              booth or worry about plain backgrounds and limited frame designs.
              Just open the app, choose how you want your photo to look, and
              create something fun and personal in seconds.
            </p>
          </article>
        </div>
        <Image
          src={"/svg/retro-photo-1.svg"}
          alt="Rretro Photo Background"
          width={0}
          height={0}
          className="z-1 relative w-full md:h-[60vh] lg:h-full lg:scale-100"
        />
      </section>
      <section className="flex flex-col justify-center items-center bg-pink-5 shadow-blue-5 my-8 sm:my-12 md:my-16 lg:my-20 px-4 sm:px-8 md:px-16 lg:px-24 py-5 text-cst">
        <h2 className="mt-5 mb-8 sm:mb-10 text-3xl sm:text-4xl md:text-5xl">
          Why Use This App
        </h2>
        <div className="flex lg:flex-row flex-col md:flex-wrap justify-center items-center gap-6 sm:gap-10 md:gap-12 lg:gap-16 w-full">
          {features.map(({ icon, title, description }, idx) => (
            <div
              key={title}
              className={`flex flex-col justify-center items-center bg-white shadow-blue-5 shadow-custom-position ${
                idx < 2 ? "mb-6 md:mb-0" : ""
              } px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10 rounded-2xl w-full sm:w-[350px] md:w-[350px] lg:w-[400px] lg:min-h-[300px] text-center`}
            >
              {icon}
              <h3 className="my-3 sm:my-4 text-xl sm:text-2xl md:text-3xl">
                {title}
              </h3>
              <p className="text-base sm:text-lg">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="flex justify-center items-center mb-8 px-4 min-h-screen">
        <div className="flex md:flex-row flex-col gap-6 bg-blue-2 shadow-2xl p-6 md:p-10 rounded-3xl w-full max-w-7xl">
          <div className="flex justify-center items-center order-last md:order-first lg:order-first w-full md:w-1/2">
            <FormFeedBack />
          </div>
          <div className="flex flex-col justify-center items-center px-4 w-full md:w-1/2 text-center">
            <h2 className="mb-6 font-bold text-white text-3xl sm:text-4xl md:text-5xl">
              Send Us Your Feedback
            </h2>
            <Image
              src="/svg/idea-chart.svg"
              alt="Feedback Illustration"
              width={220}
              height={220}
              className="w-40 sm:w-56 md:w-64 lg:w-72 h-auto"
            />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

import Image from "next/image";
import Nav from "../components/_Nav";
import Link from "next/link";
import Footer from "../components/_Footer";
import FormFeedBack from "../components/FormFeedBack";
import { FaLocationDot } from "react-icons/fa6";
import { FaPaintBrush } from "react-icons/fa";
import { IoTimer } from "react-icons/io5";

export default function Home() {
  return (
    <>
      <Nav />
      <header className="z-2 relative flex flex-col justify-center items-center sm:h-[40vh] md:h-[50vh] lg:h-[60vh] overflow-hidden hero_bg_img">
        <div className="z-3 flex flex-col justify-center items-center shadow-red-600 px-4 w-full h-full text-cst text-white opp-0">
          <div className="relative flex justify-center items-center mx-auto w-auto max-w-4xl">
            <h2 className="mt-10 px-2 font-genty text-4xl sm:text-6xl lg:text-8xl text-center">
              Photo Booth
            </h2>
            <div className="-top-5 sm:-top-5 lg:-top-8 -right-10 sm:-right-15 md:-right-20 absolute">
              <Image
                src={"/svg/camera-icon.svg"}
                alt="Camera Icon"
                width={60}
                height={60}
                className="w-12 sm:w-16 lg:w-20 h-12 sm:h-16 lg:h-20"
              />
            </div>
          </div>
          <p className="my-2 px-2 w-full max-w-xl text-base sm:text-xl lg:text-3xl text-center">
            Snap photos with friends and family no matter where they are. Choose
            your own background, frame, and style.
          </p>
          <Link
            href="/"
            className="bg-pink-8 hover:bg-pink-400 mt-4 mb-10 px-4 pt-1 lg:pt-3 pb-2 lg:pb-4 rounded-2xl text-md sm:text-2xl md:text-3xl lg:text-4xl active:scale-110 transition-all duration-200"
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
      <section className="flex flex-col justify-center items-center bg-pink-5 shadow-blue-5 my-15 px-25 py-5 text-cst">
        <h2 className="mt-5 mb-10 text-5xl">Why Use This App</h2>
        <div className="flex md:flex-row lg:flex-row flex-col justify-center items-center gap-15 w-full">
          <div className="flex flex-col justify-center items-center bg-white shadow-blue-5 shadow-custom-position px-5 py-10 rounded-2xl w-[400px] text-center">
            <FaLocationDot color="00B2FF" size={65} />
            <h3 className="my-4 text-3xl">Use It Anywhere</h3>
            <p className="text-lg">
              Take photos with anyone, anytime — no matter where they are in the
              world.
            </p>
          </div>
          <div className="flex flex-col justify-center items-center bg-white shadow-blue-5 shadow-custom-position px-5 py-10 rounded-2xl w-[400px] text-center">
            <FaPaintBrush color="00B2FF" size={65} />
            <h3 className="my-4 text-3xl">Make It Yours</h3>
            <p className="text-lg">
              Pick your background, frame, and layout to match your vibe and
              style.
            </p>
          </div>
          <div className="flex flex-col justify-center items-center bg-white shadow-blue-5 shadow-custom-position px-5 py-10 rounded-2xl w-[400px] text-center">
            <IoTimer color="00B2FF" size={65} />
            <h3 className="my-4 text-3xl">Quick & Easy</h3>
            <p className="text-lg">
              Jump in, snap a photo, and share it — all in just a few taps.
            </p>
          </div>
        </div>
      </section>
      <section className="flex justify-center items-center">
        <div className="flex flex-row items-center bg-blue-2 shadow-lg mx-5 my-10 px-25 py-15 rounded-2xl w-[60vw] h-[60vh]">
          <FormFeedBack />
          <div className="flex flex-col flex-1 justify-center items-center h-[100%]">
            <h2 className="py-5 text-white text-5xl text-center">
              Send Us Your Feedback
            </h2>
            <Image
              src={"/svg/idea-chart.svg"}
              alt="Feedback Image"
              width={0}
              height={0}
              className="w-full h-[90%]"
            />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

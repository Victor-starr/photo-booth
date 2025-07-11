import Image from "next/image";
import Nav from "../components/_Nav";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Nav />
      <header className="z-2 relative flex flex-col justify-center items-center h-[70vh] min-h-[60vh] overflow-hidden hero_bg_img">
        <div className="z-3 flex flex-col justify-center items-center gap-4 sm:gap-6 shadow-red-600 px-4 w-full h-full text-cst text-white opp-0">
          <div className="relative flex justify-center items-center mx-auto w-auto max-w-4xl">
            <h2 className="font-genty text-4xl sm:text-6xl lg:text-8xl text-center">
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
          <p className="px-2 w-full max-w-xl text-base sm:text-xl lg:text-3xl text-center">
            Snap photos with friends and family no matter where they are. Choose
            your own background, frame, and style.
          </p>
          <Link
            href="/"
            className="bg-pink-8 hover:bg-pink-400 px-4 pt-1 pb-2 rounded-2xl text-2xl active:scale-110 transition-all duration-200"
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
          className="top-0 left-0 z-2 absolute w-full h-[200vh]"
        />
        <Image
          src={"/svg/camera.svg"}
          alt="Camera Icon"
          width={250}
          height={250}
          className="top-20 right-20 z-3 absolute rotate-12 hover:rotate-25 active:rotate-25 hover:scale-110 transition-transform duration-200"
        />
        <div className="relative w-[100vw] h-[100vh]">
          <Image
            src={"/svg/retro-photo-2.svg"}
            alt="Retro Photo Background"
            width={1}
            height={1}
            className="-top-15 -left-25 z-3 relative w-full h-full scale-110"
          />

          <article className="-bottom-35 left-25 z-10 absolute pl-10 w-auto max-w-[60vw]">
            <h2 className="shadow-pink-8 mb-3 text-cst text-8xl">About</h2>
            <p className="shadow-pink-8 w-full text-cst text-4xl">
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
          className="-right-15 z-1 relative w-[100vw] h-[100vh] scale-120"
        />
      </section>
    </>
  );
}

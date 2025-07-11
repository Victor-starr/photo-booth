import Image from "next/image";
import Nav from "../components/_Nav";

export default function Home() {
  return (
    <>
      <Nav />
      <header className="z-1 relative flex flex-col justify-center items-center h-[70vh] min-h-[60vh] overflow-hidden hero_bg_img">
        <div className="z-2 flex flex-col justify-center items-center gap-4 sm:gap-6 shadow-custom-position shadow-red-600 px-4 w-full h-full font-genty text-white opp-0">
          <div className="relative flex justify-center items-center mx-auto w-auto max-w-4xl">
            <h2 className="text-4xl sm:text-6xl lg:text-8xl text-center">
              Photo Booth
            </h2>
            <div className="-top-5 sm:-top-5 lg:-top-8 -right-10 sm:-right-15 md:-right-20 absolute">
              <Image
                src={"/svg/camera.svg"}
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
        </div>
      </header>
    </>
  );
}

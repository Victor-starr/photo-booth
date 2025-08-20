import Image from "next/image";
import { MaxPhotoCountWrapper } from "@/guard/Guards";
import Footer from "@/components/_Footer";
import SessionLauncher from "@/components/SessionLauncher";
import Nav from "@/components/_Nav";

export default function SessionPage() {
  return (
    <MaxPhotoCountWrapper>
      <Nav currentPage="session" />
      <section className="z-1 relative flex flex-col justify-center items-center px-4 py-8 w-full h-[90vh] overflow-hidden">
        <Image
          src={"/svg/retro_photo_3.svg"}
          alt="Retro Photo Background"
          width={1}
          height={1}
          className="lg:top-15 -left-15 md:left-0 lg:left-0 z-0 absolute w-82 h-full max-h-full object-contain lg:scale-140"
        />
        <h2 className="top-4 lg:top-5 left-1/2 z-10 absolute shadow-pink-8 px-4 w-full text-[clamp(1.25rem,4vw,1.5rem)] text-cst sm:text-2xl md:text-3xl lg:text-4xl text-center -translate-x-1/2">
          Capture 4 photos * Customize * Share
        </h2>
        <div className="z-10 flex justify-center mt-16 lg:mt-20 w-full">
          <SessionLauncher />
        </div>
        <Image
          src={"/svg/retro_photo_4.svg"}
          alt="Retro Photo Background"
          width={1}
          height={1}
          className="lg:top-15 -right-15 md:right-0 lg:right-0 z-0 absolute w-82 h-full max-h-full object-contain lg:scale-140"
        />
      </section>
      <Footer />
    </MaxPhotoCountWrapper>
  );
}

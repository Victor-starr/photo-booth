import Footer from "@/components/_Footer";
import Nav from "@/components/_Nav";
import { AuthGuardWrapper } from "@/guard/Guards";
import Image from "next/image";
import SessionStartContainer from "@/components/SessionLauncher";

export default function SessionPag() {
  return (
    <AuthGuardWrapper>
      <Nav />
      <section className="z-1 relative flex flex-col items-center w-screen overflow-hidden">
        <Image
          src={"/svg/retro_photo_3.svg"}
          alt="Retro Photo Background"
          width={1}
          height={1}
          className="lg:top-15 left-0 z-1 absolute w-82 h-screen lg:scale-140"
        />
        <h2 className="shadow-pink-8 mt-10 mb-15 text-cst text-5xl">
          Capture 4 photos * Customize * Share
        </h2>
        <SessionStartContainer />
        <Image
          src={"/svg/retro_photo_4.svg"}
          alt="Retro Photo Background"
          width={1}
          height={1}
          className="lg:top-15 right-10 z-1 absolute w-82 h-screen lg:scale-140"
        />
      </section>
      <Footer />
    </AuthGuardWrapper>
  );
}

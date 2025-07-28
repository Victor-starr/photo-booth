"use client";
import Footer from "@/components/_Footer";
import Nav from "@/components/_Nav";
import SessionLauncher from "@/components/SessionLauncher";
import { AuthGuardWrapper } from "@/guard/Guards";
import Image from "next/image";
import { useCamera } from "@/hook/useCamera";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SessionPage() {
  const router = useRouter();
  const camera = useCamera();

  useEffect(() => {
    if (camera.photosArr.length >= 4) {
      router.push("/customize");
    }
  }, [camera.photosArr.length, router]);

  if (camera.photosArr.length >= 4) {
    return (
      <AuthGuardWrapper>
        <Nav />
        <div className="flex flex-col justify-center items-center h-[85vh]">
          <div className="text-center">
            <h2 className="mb-4 text-2xl">You already have enough photos!</h2>
            <p>Redirecting to customize page...</p>
          </div>
        </div>
        <Footer />
      </AuthGuardWrapper>
    );
  }

  return (
    <AuthGuardWrapper>
      <Nav />
      <section className="z-1 relative flex flex-col items-center w-screen h-screen overflow-x-hidden">
        <Image
          src={"/svg/retro_photo_3.svg"}
          alt="Retro Photo Background"
          width={1}
          height={1}
          className="lg:top-15 -left-15 md:left-0 lg:left-0 z-1 absolute w-82 h-screen lg:scale-140"
        />
        <h2 className="z-2 shadow-pink-8 my-4 text-[clamp(1.25rem,2.5vw,3rem)] text-cst sm:text-[clamp(2rem,2.5vw,3rem)] text-center">
          Capture 4 photos * Customize * Share
        </h2>
        <SessionLauncher camera={camera} />
        <Image
          src={"/svg/retro_photo_4.svg"}
          alt="Retro Photo Background"
          width={1}
          height={1}
          className="lg:top-15 -right-15 md:right-0 lg:right-0 z-1 absolute w-82 h-screen lg:scale-140"
        />
      </section>
      <Footer />
    </AuthGuardWrapper>
  );
}

"use client";

import { PhotoFramesProps, PhotosSession } from "@/lib/types/camera";
import { useEffect, useRef, useState } from "react";
import PhotoFrames from "@/components/PhotoFrames";
import FrameController from "@/components/FrameController";
import { useCamera } from "@/hook/useCamera";
import Nav from "@/components/_Nav";
import { AuthGuardWrapper } from "@/guard/Guards";
import Footer from "@/components/_Footer";
import ImagePopUp from "@/components/ImagePopUp";
import Link from "next/link";
import { FaBackspace } from "react-icons/fa";
import { useParams } from "next/navigation";

function CustomizePage() {
  const params = useParams<{ session: string }>();
  const [sessionData, setSessionData] = useState<PhotosSession | null>(null);
  const [frameType, setFrameType] =
    useState<PhotoFramesProps["type"]>("classic");
  const { startOverAgain, savePhotos } = useCamera();
  const exportRef = useRef<HTMLDivElement | null>(null);
  const [imageDisplay, setImageDisplay] = useState<string | null>(null);

  useEffect(() => {
    const selectedSession = localStorage.getItem("selectedSession");
    if (selectedSession && params.session === JSON.parse(selectedSession).id) {
      setSessionData(JSON.parse(selectedSession));
    }
  }, [params.session]);

  const handleImagePopup = (imageUrl: string) => {
    setImageDisplay(imageUrl);
  };

  if (!sessionData) {
    return (
      <AuthGuardWrapper>
        <Nav currentPage="customize" />
        <div className="flex flex-col justify-center items-center bg-gradient-to-b from-[#f8f4fa] to-[#e9e2ee] px-4 py-12 min-h-[calc(100vh-140px)]">
          <div className="flex flex-col items-center bg-white shadow-lg p-8 rounded-xl w-full max-w-md">
            <h2 className="mb-3 font-semibold text-pink-700 text-2xl text-center">
              No Session Data Found
            </h2>
            <p className="mb-6 text-gray-600 text-center">
              It looks like you haven&apos;t started a photo session yet.
              <br />
              Begin a new session to customize your photos!
            </p>
            <div className="flex justify-center gap-4 w-full">
              <Link
                href="/session"
                className="bg-pink-500 hover:bg-pink-600 shadow px-6 py-3 rounded-lg font-medium text-white transition-colors"
              >
                Start New Session
              </Link>
              <Link
                href="/profile"
                className="bg-gray-200 hover:bg-gray-300 shadow px-6 py-3 rounded-lg font-medium text-pink-700 transition-colors"
              >
                Go to Profile
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </AuthGuardWrapper>
    );
  }

  return (
    <AuthGuardWrapper>
      <Nav currentPage="customize" />
      <section className="relative flex lg:flex-row flex-col lg:justify-center items-center gap-6 lg:gap-10 bg-[#F2EDF1] px-4 py-0 lg:py-18 min-h-[calc(100vh-140px)] overflow-y-auto">
        <h2 className="lg:top-5 lg:left-1/2 static lg:absolute shadow-pink-8 px-4 pt-5 lg:pt-0 small-text-cst text-[clamp(1.25rem,4vw,2rem)] md:text-cst lg:text-[clamp(2rem,2vw,3rem)] text-center lg:-translate-x-1/2">
          {sessionData?.created_at
            ? new Date(sessionData.created_at).toLocaleDateString()
            : ""}
        </h2>
        <Link
          href={"/profile"}
          className="top-6 left-4 md:left-1/4 lg:left-1/4 absolute flex items-center gap-2 bg-pink-600 hover:bg-pink-700 shadow-lg px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 text-white transition-all duration-200"
          aria-label="Back to Session"
        >
          <FaBackspace className="text-xl" />
          <span className="hidden md:inline">Back</span>
        </Link>
        {imageDisplay && (
          <ImagePopUp
            imageUrl={imageDisplay}
            onClose={() => setImageDisplay(null)}
          />
        )}
        <div ref={exportRef}>
          <PhotoFrames
            photoArr={(sessionData?.photo_urls as string[]) || []}
            type={frameType}
            onImageClick={handleImagePopup}
          />
        </div>
        <FrameController
          frameType={frameType}
          setFrameType={setFrameType}
          startOverAgain={startOverAgain}
          savePhotos={savePhotos}
          exportRef={exportRef}
          controllerType={"session"}
        />
      </section>
      <Footer />
    </AuthGuardWrapper>
  );
}

export default CustomizePage;

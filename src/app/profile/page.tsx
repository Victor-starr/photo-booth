"use client";
import { useAuth } from "@/hook/useAuth";
import Nav from "@/components/_Nav";
import Footer from "@/components/_Footer";
import { AuthGuardWrapper } from "@/guard/Guards";
import Image from "next/image";
import { useState } from "react";
import { useCamera } from "@/hook/useCamera";
import SessionPhotos from "@/components/SessionPhotos";

function ProfilePage() {
  const { user, loading } = useAuth();
  const [invalidImage, setInvalidImage] = useState(false);
  const { listOfSavedSessions } = useCamera();

  if (loading) {
    return (
      <>
        <Nav currentPage="profile" />
        <section className="flex flex-col justify-center items-center bg-[#F2EDF1] px-4 py-8 lg:py-18 min-h-[calc(100vh-140px)]">
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-center">
            Checking profile information...
          </h2>
        </section>
        <Footer />
      </>
    );
  }
  return (
    <AuthGuardWrapper>
      <Nav currentPage="profile" />
      <section className="flex flex-col items-center min-h-screen">
        <header className="flex lg:flex-row flex-col flex-1 justify-center items-center gap-6 lg:gap-12 shadow-md px-6 py-10 rounded-xl w-full text-center">
          <div className="group relative flex flex-col items-center gap-3 mb-4 lg:mb-0">
            {invalidImage || !user?.user_metadata.avatar_url ? (
              <Image
                src="/img/default_avatar.png"
                alt="Default Avatar"
                width={120}
                height={120}
                className="shadow-lg saturate-150 border-4 border-white rounded-full object-cover"
              />
            ) : (
              <Image
                src={user.user_metadata.avatar_url}
                alt="User Avatar"
                width={120}
                height={120}
                className="shadow-lg saturate-150 border-4 border-white rounded-full object-cover"
                onError={() => setInvalidImage(true)}
              />
            )}
            <div className="z-10 absolute flex justify-center items-center bg-blue-2 opacity-0 group-hover:opacity-100 rounded-full w-[124px] h-[120px] transition-colors duration-300 cursor-pointer">
              <p className="text-white">Change Image</p>
            </div>
          </div>
          <div className="flex flex-col items-center lg:items-start gap-2 text-gray-600">
            <h2 className="shadow-pink-2 mb-1 text-cst text-2xl md:text-3xl lg:text-4xl">
              {user?.user_metadata.username ?? "User"}
            </h2>
            <p className="text-base md:text-lg">
              Email:{" "}
              <span className="shadow-pink-2 small-text-cst text-white">
                {user?.email}
              </span>
            </p>
            <p className="text-base md:text-lg">
              Created At:
              <span className="shadow-pink-2 small-text-cst text-white">
                {" "}
                {user?.created_at
                  ? new Date(user.created_at).toLocaleDateString()
                  : ""}
              </span>
            </p>
          </div>
        </header>
        <SessionPhotos listOfSavedSessions={listOfSavedSessions} />
      </section>
      <Footer />
    </AuthGuardWrapper>
  );
}

export default ProfilePage;

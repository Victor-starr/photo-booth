"use client";
import { useAuth } from "@/hook/useAuth";
import Nav from "@/components/_Nav";
import Footer from "@/components/_Footer";
import { AuthGuardWrapper } from "@/guard/Guards";
import Image from "next/image";
import { useCamera } from "@/hook/useCamera";
import SessionPhotos from "@/components/SessionPhotos";
import { useRouter } from "next/navigation";
import { PhotosSession } from "@/lib/types/camera";

function ProfilePage() {
  const { user } = useAuth();
  const { listOfSavedSessions, loading } = useCamera();
  const router = useRouter();

  const handleRedirectionToCustomize = (session: PhotosSession) => {
    localStorage.removeItem("selectedSession");
    localStorage.setItem("selectedSession", JSON.stringify(session));
    router.push(`/customize/${session.id}`);
  };

  return (
    <AuthGuardWrapper>
      <Nav currentPage="profile" />
      <section className="flex flex-col items-center min-h-screen">
        <header className="flex lg:flex-row flex-col flex-1 justify-center items-center gap-6 lg:gap-12 shadow-md px-6 py-10 rounded-xl w-full text-center">
          <div className="group relative flex flex-col items-center gap-3 mb-4 lg:mb-0">
            <Image
              src="/img/default_avatar.png"
              alt="Default Avatar"
              width={120}
              height={120}
              className="shadow-lg saturate-150 border-4 border-white rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col items-center lg:items-start gap-2 text-gray-600">
            <h2 className="shadow-pink-2 mb-1 text-cst text-2xl md:text-3xl lg:text-4xl">
              {user?.user_metadata?.username}
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
        <SessionPhotos
          listOfSavedSessions={listOfSavedSessions}
          onEdit={handleRedirectionToCustomize}
          loading={loading}
        />
      </section>
      <Footer />
    </AuthGuardWrapper>
  );
}

export default ProfilePage;

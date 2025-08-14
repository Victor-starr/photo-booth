"use client";
import { useAuth } from "@/hook/useAuth";
import Nav from "@/components/_Nav";
import Footer from "@/components/_Footer";
import { AuthGuardWrapper } from "@/guard/Guards";
function ProfilePage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <>
        <Nav />
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
      <Nav />
      <section className="flex flex-col items-center px-4 min-h-screen">
        <h2>
          Hello,
          {user?.user_metadata.username} with Email: {user?.email}
        </h2>
      </section>
      <Footer />
    </AuthGuardWrapper>
  );
}

export default ProfilePage;

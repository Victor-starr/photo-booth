import Footer from "@/components/_Footer";
import Nav from "@/components/_Nav";

interface LoadingScreenProps {
  title: string;
  subtitle?: string;
  showSpinner?: boolean;
}

export default function LoadingScreen({
  title,
  subtitle,
  showSpinner = false,
}: LoadingScreenProps) {
  return (
    <>
      <Nav />
      <div className="flex flex-col justify-center items-center h-[85vh]">
        <div className="text-center">
          {showSpinner && (
            <div className="mx-auto mb-4 border-gray-900 border-b-2 rounded-full w-8 h-8 animate-spin"></div>
          )}
          <h2 className="mb-4 text-2xl">{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
      </div>
      <Footer />
    </>
  );
}

export const LoadingcheckAuth = ({
  loading,
  noAccess,
}: {
  loading: boolean;
  noAccess?: boolean;
}) => {
  if (loading) {
    return <LoadingScreen title="Checking authentication..." showSpinner />;
  }
  if (noAccess) {
    return (
      <LoadingScreen
        title="You do not have access."
        subtitle="Redirecting to login page..."
        showSpinner
      />
    );
  }
  return null;
};

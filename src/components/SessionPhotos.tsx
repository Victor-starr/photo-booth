import Image from "next/image";
import { PhotosSession } from "@/lib/types/camera";

function SessionPhotos({
  listOfSavedSessions,
  onEdit,
}: {
  listOfSavedSessions: PhotosSession[];
  onEdit: (index: PhotosSession) => void;
}) {
  return (
    <section className="flex flex-col flex-7 items-center bg-[#F2EDF1] px-15 py-10 w-full text-center">
      <h2 className="shadow-red-500 mb-8 text-cst text-white text-2xl md:text-3xl lg:text-4xl">
        All Previously Saved Sessions
      </h2>
      {listOfSavedSessions.length === 0 ? (
        <p className="text-gray-500 text-lg">No sessions found.</p>
      ) : (
        <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl">
          {listOfSavedSessions.map((session) => (
            <div
              key={session.id}
              className="flex flex-col items-center bg-white shadow-lg hover:shadow-xl p-6 rounded-xl hover:scale-[1.02] transition"
              onClick={() => onEdit(session)}
            >
              <h3 className="mb-4 font-semibold text-blue-700 text-lg">
                {session.created_at
                  ? new Date(session.created_at).toLocaleDateString()
                  : ""}
              </h3>
              <div className="relative mt-25 lg:mt-10 mb-4 w-[140px] h-[120px]">
                {session.photo_urls.slice(0, 4).map((url, idx) => {
                  const offsets = [
                    { bottom: 0, left: 0, z: 40 },
                    { bottom: 16, left: 16, z: 30 },
                    { bottom: 32, left: 32, z: 20 },
                    { bottom: 48, left: 48, z: 10 },
                  ];
                  const style = {
                    bottom: offsets[idx].bottom,
                    left: offsets[idx].left,
                    zIndex: offsets[idx].z,
                  };
                  return (
                    <Image
                      key={url}
                      src={url}
                      alt={`Session ${session.id} Photo ${idx + 1}`}
                      width={140}
                      height={140}
                      className="absolute shadow-md border-4 border-white rounded-lg object-cover hover:scale-110 transition-transform duration-300"
                      style={style}
                      unoptimized
                    />
                  );
                })}
              </div>
              <span className="text-gray-400 text-sm">
                {session.photo_urls.length} photo
                {session.photo_urls.length !== 1 ? "s" : ""}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default SessionPhotos;

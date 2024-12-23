"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function VideoNotFoundPage() {
  const path = usePathname();
  console.log(path);

  const videoId = path.split("/")[2];
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">{`The movie you are searcing with ${videoId} id was not found!`}</h1>
      <p className="text-lg text-gray-500 mb-8">
        Sorry, the video you are looking for does not exist or has been removed.
      </p>
      <Link
        href="/"
        className="text-white bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Go Back to Videos
      </Link>
    </div>
  );
}

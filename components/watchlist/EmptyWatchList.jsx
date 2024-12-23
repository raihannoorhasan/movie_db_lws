import Link from "next/link";

export default function EmptyWatchList() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16">
      {/* Custom SVG */}
      <div className="bg-gray-700 p-6 rounded-full shadow-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-16 h-16 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 20l-5.447-2.724A2 2 0 013 15.382V6a2 2 0 011-1.732L9 2l5.447 2.724A2 2 0 0116 6v9.382a2 2 0 01-1 1.732L9 20z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12h6M9 8h6M9 16h6"
          />
        </svg>
      </div>

      {/* Text */}
      <h2 className="mt-6 text-2xl font-semibold text-white">
        Your Watchlist is Empty
      </h2>
      <p className="mt-2 text-light/70">
        Save movies you want to watch later, and they’ll appear here.
      </p>

      {/* Button */}
      <Link
        href="/"
        className="mt-6 px-6 py-3 bg-moviedb-red text-white font-medium rounded-lg shadow-md hover:bg-red-700 transition duration-300"
      >
        Browse Movies
      </Link>
    </div>
  );
}

import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      {/* Logo Section */}
      <div className="mb-8">
        <Link href="/" className="text-red-600 text-4xl font-bold">
          MOVIE DB
        </Link>
      </div>

      {/* Main Content */}
      <div className="text-center">
        <h1 className="text-6xl font-extrabold mb-4">404</h1>
        <p className="text-xl text-gray-300 mb-6">
          Oops! The page you’re looking for doesn’t exist.
        </p>

        {/* CTA Buttons */}
        <div className="flex justify-center space-x-4">
          <Link
            href="/"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full text-white font-medium shadow-lg transform hover:scale-105 transition-all"
          >
            Back to Home
          </Link>
        </div>
      </div>

      {/* Footer Section */}
      <div className="mt-8 text-gray-500 text-sm">
        Need help? Contact us at{" "}
        <a href="mailto:support@xstream.com" className="text-blue-400">
          support@moviedb.com
        </a>
      </div>
    </div>
  );
}

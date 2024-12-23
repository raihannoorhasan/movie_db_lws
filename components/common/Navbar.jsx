import { authenticateUser } from "@/actions";
import Image from "next/image";
import Link from "next/link";
import Logout from "../auth/Logout";
import SearchInput from "./SearchInput";

const isLoggedIn = true;

export default async function Navbar() {
  const user = await authenticateUser();
  return (
    <nav className="fixed w-full z-50 bg-gradient-to-b from-black to-transparent">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        {/* Left Section */}
        <div className="flex items-center">
          <Link href="/" className="text-red-600 text-4xl font-bold">
            MOVIE DB
          </Link>
          <div className="ml-8 space-x-4">
            <Link href="/" className="text-white hover:text-gray-300">
              Home
            </Link>
            <Link href="/compare" className="text-white hover:text-gray-300">
              Compare Movies
            </Link>
            <Link href="/watch_list" className="text-white hover:text-gray-300">
              Watch Later
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <SearchInput />
            <div
              id="searchResults"
              className="absolute w-full mt-2 bg-black bg-opacity-90 rounded-lg hidden"
            ></div>
          </div>
          {user ? (
            <div className="flex items-center space-x-3">
              <p className="text-white font-medium">{user.name}</p>
              <Image
                src="/avatar.png"
                alt="User Avatar"
                height={32}
                width={32}
                className="w-8 h-8 rounded-full"
              />

              <Logout />
            </div>
          ) : (
            <Link
              href="/login"
              className="text-white hover:text-gray-300 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

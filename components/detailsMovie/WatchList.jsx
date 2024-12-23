// // "use client";

// import { addToWatchlist, authenticateUser, checkWatchList } from "@/actions";
// import {
//   DefaultWatchListIcon,
//   SuccessWatchListIcon,
// } from "../svg/WatchListIcon";
// import RedirectToLogin from "./RedirectLogin";

// export default async function WatchList({ movie }) {
//   // Authenticate the user
//   const user = await authenticateUser();

//   // Redirect to login if the user is not authenticated

//   // Check if the movie is already in the watchlist
//   const isAlreadyInWatchlist =
//     user && (await checkWatchList(user?.id, movie?.id));

//   // Define server action for adding to the watchlist
//   const handleAddToWatchlist = async () => {
//     "use server"; // Mark this as a server action

//     if (!user?.id) {
//       // return redirect("/login");
//       console.log("redirecting...");

//       return <RedirectToLogin />;
//     }

//     if (isAlreadyInWatchlist) {
//       return;
//     }

//     try {
//       await addToWatchlist(user.id, movie);
//       console.log("Movie added successfully!");
//     } catch (error) {
//       console.error("Error adding movie to watchlist:", error.message);
//     }
//   };

//   return (
//     <div className="mb-6">
//       <div className="flex flex-wrap gap-4">
//         <div className="text-center">
//           <form action={handleAddToWatchlist}>
//             <button
//               type="submit"
//               className={`flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg ${
//                 isAlreadyInWatchlist && "text-green-600"
//               }`}
//             >
//               {!isAlreadyInWatchlist ? (
//                 <DefaultWatchListIcon />
//               ) : (
//                 <SuccessWatchListIcon />
//               )}
//               {!isAlreadyInWatchlist
//                 ? "Add to Watch List"
//                 : "Already in Watch List"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { addToWatchlist, authenticateUser, checkWatchList } from "@/actions";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import {
//   DefaultWatchListIcon,
//   SuccessWatchListIcon,
// } from "../svg/WatchListIcon";

// export default function WatchList({ movie }) {
//   const [isUser, setIsUser] = useState(null);
//   const [isAlreadyInWatchlist, setIsAlreadyInWatchList] = useState(false);

//   const router = useRouter();

//   useEffect(() => {
//     const check = async () => {
//       const user = await authenticateUser();
//       const isAvailable = await checkWatchList(user?.id, movie?.id);
//       setIsUser(user);
//       setIsAlreadyInWatchList(isAvailable);
//     };
//     check();
//   }, [movie?.id, isUser?.id]);

//   // Authenticate the user

//   // Redirect to login if the user is not authenticated

//   // // Check if the movie is already in the watchlist
//   // const isAlreadyInWatchlist =
//   //   user && (await checkWatchList(user?.id, movie?.id));

//   // Define server action for adding to the watchlist
//   const handleAddToWatchlist = async () => {
//     if (!isUser?.id) {
//       router.push(`/login?redirect=/movie/${movie?.id}`);
//       return;
//     }

//     if (isAlreadyInWatchlist) {
//       return;
//     }

//     try {
//       await addToWatchlist(isUser.id, movie);
//       console.log("Movie added successfully!");
//     } catch (error) {
//       console.error("Error adding movie to watchlist:", error.message);
//     }
//   };

//   return (
//     <div className="mb-6">
//       <div className="flex flex-wrap gap-4">
//         <div className="text-center">
//           <form action={handleAddToWatchlist}>
//             <button
//               type="submit"
//               className={`flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg ${
//                 isAlreadyInWatchlist && "text-green-600"
//               }`}
//             >
//               {!isAlreadyInWatchlist ? (
//                 <DefaultWatchListIcon />
//               ) : (
//                 <SuccessWatchListIcon />
//               )}
//               {!isAlreadyInWatchlist
//                 ? "Add to Watch List"
//                 : "Already in Watch List"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { addToWatchlist, authenticateUser, checkWatchList } from "@/actions";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  DefaultWatchListIcon,
  SuccessWatchListIcon,
} from "../svg/WatchListIcon";

export default function WatchList({ movie }) {
  const [isUser, setIsUser] = useState(null); // Tracks authenticated user
  const [isAlreadyInWatchlist, setIsAlreadyInWatchList] = useState(false); // Tracks if the movie is in the watchlist
  const [loading, setLoading] = useState(false); // Loading state for adding movie
  const router = useRouter();
  const pathname = usePathname();

  // Check authentication and watchlist status
  const checkAuthAndWatchlist = async () => {
    try {
      const user = await authenticateUser();
      if (!user) {
        setIsUser(null);
        setIsAlreadyInWatchList(false);
      } else {
        const isAvailable = await checkWatchList(user.id, movie?.id);
        setIsUser(user);
        setIsAlreadyInWatchList(isAvailable);
      }
    } catch (error) {
      console.error("Error checking authentication or watchlist:", error);
    }
  };

  // Run on initial load, after movie changes, or after redirection from login
  useEffect(() => {
    checkAuthAndWatchlist();
  }, [movie?.id]); // Include redirect parameter to trigger recheck

  const handleAddToWatchlist = async () => {
    if (!isUser) {
      // Redirect to login if not authenticated
      router.push(`/login?redirect=${pathname}`);
      return;
    }

    if (isAlreadyInWatchlist) return; // Prevent duplicate additions

    setLoading(true);
    try {
      await addToWatchlist(isUser.id, movie);
      setIsAlreadyInWatchList(true); // Update watchlist state
    } catch (error) {
      console.error("Error adding to watchlist:", error);
    } finally {
      setLoading(false);
    }
  };

  // if (checking) {
  //   // Show loader while fetching authentication or watchlist status
  //   return (
  //     <div className="mb-6">
  //       <p>Loading watchlist status...</p>
  //     </div>
  //   );
  // }

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-4">
        <div className="text-center">
          <button
            onClick={handleAddToWatchlist}
            disabled={loading}
            className={`flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg ${
              isAlreadyInWatchlist ? "text-green-600" : ""
            }`}
          >
            {loading ? (
              <span className="loader-spinner">Adding...</span>
            ) : isAlreadyInWatchlist ? (
              <>
                <SuccessWatchListIcon />
                Already in Watch List
              </>
            ) : (
              <>
                <DefaultWatchListIcon />
                Add to Watch List
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

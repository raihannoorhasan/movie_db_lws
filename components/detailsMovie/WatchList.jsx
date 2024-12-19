// "use client";

import { addToWatchlist, authenticateUser, checkWatchList } from "@/actions"; // Import server actions
import { redirect } from "next/navigation";
import {
  DefaultWatchListIcon,
  SuccessWatchListIcon,
} from "../svg/WatchListIcon";

// export default function WatchList({ movie }) {
//   const [movieInWatchList, setMovieInWatchList] = useState(false); // State to track if the movie is in the watchlist
//   const { auth } = useAuth(); // User authenticatione
//   const router = useRouter();

//   // // Check if the movie is already in the watchlist
//   // useEffect(() => {
//   //   if (!auth?.id || !movie?.id) return;

//   //   const checkMovieInWatchlist = async () => {
//   //     try {
//   //       const movieExists = await isMovieInWatchList(auth.id, movie.id);
//   //       if (movieExists) {
//   //         setMovieInWatchList(true);
//   //       }
//   //     } catch (error) {
//   //       console.error("Error checking movie in watchlist:", error);
//   //     }
//   //   };

//   //   checkMovieInWatchlist();
//   // }, [auth?.id, movie?.id]);

//   useEffect(() => {
//     if (!auth?.id) return;

//     console.log("Auth ID:", auth?.id, "Movie ID:", movie?.id);

//     const checkMovieInWatchlist = async () => {
//       try {
//         console.log("Checking movie in watchlist...");
//         const movieExists = await checkWatchList(auth.id, movie.id);
//         console.log("Movie exists:", movieExists);

//         if (movieExists) {
//           setMovieInWatchList(true);
//         }
//       } catch (error) {
//         console.error("Error checking watchlist:", error);
//       }
//     };

//     checkMovieInWatchlist();
//   }, [auth?.id, movie?.id]);

//   // Button click handler to add a movie to the watchlist
//   const buttonHandler = async () => {
//     if (!auth?.id) {
//       router.push("/login");
//       return;
//     }

//     if (movieInWatchList) {
//       console.log("Movie is already in the watchlist!");
//       return;
//     }

//     try {
//       // const addedMovieData = await addToWatchlist(auth.id, movie);
//       const user = await authenticateUser();
//       if (user?.id) {
//         const addedMovieData = await addToWatchlist(user?.id, movie);
//         console.log("Movie added:", addedMovieData);
//       }
//       setMovieInWatchList(true); // Update state after successfully adding the movie
//     } catch (err) {
//       console.error("Error adding movie to watchlist:", err.message);
//     }
//   };

//   return (
//     <div className="mb-6">
//       <div className="flex flex-wrap gap-4">
//         <div className="text-center">
//           <button
//             onClick={buttonHandler}
//             className={`flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg ${
//               movieInWatchList && "text-green-600"
//             }`}
//           >
//             {!movieInWatchList ? (
//               <DefaultWatchListIcon />
//             ) : (
//               <SuccessWatchListIcon />
//             )}
//             {!movieInWatchList
//               ? "Add to Watch List"
//               : "Already added in Watch List"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { authenticateUser, addToWatchlist, checkWatchList } from "@/actions";
// import { redirect } from "next/navigation";
// import {
//   DefaultWatchListIcon,
//   SuccessWatchListIcon,
// } from "../svg/WatchListIcon";

export default async function WatchList({ movie }) {
  // Authenticate the user
  const user = await authenticateUser();

  // Redirect to login if the user is not authenticated

  // Check if the movie is already in the watchlist
  const isAlreadyInWatchlist =
    user && (await checkWatchList(user?.id, movie?.id));

  // Define server action for adding to the watchlist
  const handleAddToWatchlist = async () => {
    "use server"; // Mark this as a server action

    if (!user?.id) {
      redirect("/login");
    }

    if (isAlreadyInWatchlist) {
      console.log("Movie is already in the watchlist!");
      return;
    }

    try {
      await addToWatchlist(user.id, movie);
      console.log("Movie added successfully!");
    } catch (error) {
      console.error("Error adding movie to watchlist:", error.message);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-4">
        <div className="text-center">
          <form action={handleAddToWatchlist}>
            <button
              type="submit"
              className={`flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg ${
                isAlreadyInWatchlist && "text-green-600"
              }`}
            >
              {!isAlreadyInWatchlist ? (
                <DefaultWatchListIcon />
              ) : (
                <SuccessWatchListIcon />
              )}
              {!isAlreadyInWatchlist
                ? "Add to Watch List"
                : "Already in Watch List"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

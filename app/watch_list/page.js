// import MovieCard from "@/components/watchlist/MovieCard";

// export default function WatchListPage() {
//   return (
//     <div className="container mx-auto pt-24 pb-8">
//       <header className="mb-8">
//         <h1 className="text-4xl font-bold text-white">Watch Later</h1>
//         <p className="text-light/70 mt-2">
//           Movies you{"'"}ve saved to watch in the future
//         </p>
//       </header>

//       <div
//         id="watchLaterList"
//         className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
//       >
//         <MovieCard />
//       </div>

//       {/* Empty State */}
//       {/* <div id="emptyState" className="hidden text-center py-16">
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         className="h-24 w-24 mx-auto text-moviedb-gray mb-4"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke="currentColor"
//       >
//         <path
//           stroke-linecap="round"
//           stroke-linejoin="round"
//           stroke-width="2"
//           d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
//         />
//       </svg>
//       <h2 className="text-2xl font-bold text-light mb-2">
//         Your Watch Later list is empty
//       </h2>
//       <p className="text-light/70 mb-6">
//         Explore movies and add them to your list to watch later
//       </p>
//       <a
//         href="#"
//         className="bg-primary text-dark px-6 py-2 rounded-full hover:bg-primary/80 transition"
//       >
//         Explore Movies
//       </a>
//     </div> */}
//     </div>
//   );
// }

import { authenticateUser, fetchWatchlist } from "@/actions";
import MovieCard from "@/components/watchlist/MovieCard";
import { redirect } from "next/navigation";

// Define your page component
export default async function WatchListPage() {
  const user = await authenticateUser();
  console.log(user);
  if (!user) {
    redirect("/login");
    return;
  }
  const watchListMovies = await fetchWatchlist(user?.id);

  // console.log(watchListMovies);

  return (
    <div className="container mx-auto pt-24 pb-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-white">Watch Later</h1>
        <p className="text-light/70 mt-2">
          Movies you{"'"}ve saved to watch in the future
        </p>
      </header>

      <div
        id="watchLaterList"
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {/* Pass the userId to MovieCard */}
        {watchListMovies.length > 0 ? (
          watchListMovies.map((movie) => (
            <MovieCard key={movie?.movieId} movie={movie} userId={user?.id} />
          ))
        ) : (
          <div> No Watch List Movies Found </div>
        )}
      </div>
    </div>
  );
}

// // Server-side rendering using getServerSideProps
// export async function getServerSideProps(context) {
//   try {
//     // Use the authenticateUser function to get the user info
//     const user = authenticateUser(context.req);
//     const userId = user.userId; // Assuming the userId is part of the decoded token

//     // Pass the userId to the page component as a prop
//     return {
//       props: { userId }, // Will be passed to the page component
//     };
//   } catch (error) {
//     console.error("Authentication error:", error);
//     return {
//       props: { userId: null }, // If authentication fails, send null for userId
//     };
//   }
// }

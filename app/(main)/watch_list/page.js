import { authenticateUser, fetchWatchlist } from "@/actions";
import EmptyWatchList from "@/components/watchlist/EmptyWatchList";
import MovieCard from "@/components/watchlist/MovieCard";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function WatchListPage() {
  const user = await authenticateUser();
  // console.log(user);
  if (!user) {
    redirect("/login");
  }
  const watchListMovies = await fetchWatchlist(user?.id);

  return (
    <div className="container mx-auto pt-24 pb-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-white">Watch Later</h1>
        <p className="text-light/70 mt-2">
          Movies you{"'"}ve saved to watch in the future
        </p>
      </header>

      {watchListMovies.length > 0 ? (
        <div
          id="watchLaterList"
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {watchListMovies.map((movie) => (
            <Link key={movie?.movieId} href={`/movie/${movie?.movieId}`}>
              <MovieCard movie={movie} userId={user?.id} />
            </Link>
          ))}
        </div>
      ) : (
        <EmptyWatchList />
      )}
    </div>
  );
}

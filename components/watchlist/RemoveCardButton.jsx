"use client";

import { removeFromWatchlist } from "@/actions";

export default function RemoveCardButton({ userId, movieId }) {
  // const user = authenticateUser();
  // console.log(user);

  const onRemoveHandler = async () => {
    try {
      const removedMovie = await removeFromWatchlist(userId, movieId);
      console.log("Movie removed:", removedMovie);

      // setMovieInWatchList(true); // Update state after successfully adding the movie
    } catch (err) {
      console.error("Error removing movie to watchlist:", err.message);
    }
  };
  return (
    <button
      onClick={onRemoveHandler}
      className="bg-moviedb-red text-light px-3 py-1 rounded-full hover:bg-moviedb-red/80 transition"
    >
      Remove
    </button>
  );
}

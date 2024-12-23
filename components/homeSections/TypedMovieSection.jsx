import { getMoviesByType } from "@/utils/data-utils";
import MovieCard from "./MovieCard";

const sectionHeadingText = {
  popular: "Popular on MOVIE DB",
  trending: "Trending Now",
  top_rated: "Top Rated",
};

export default async function TypedMovieSection({ type }) {
  const movies = await getMoviesByType(type);
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">
        {sectionHeadingText[type] || ""}
      </h2>
      <div id="trendingMovies" className="flex space-x-4 overflow-x-auto pb-4">
        {movies?.length > 0 ? (
          movies
            .filter((movie) => movie?.poster_path)
            .map((movie) => (
              <MovieCard key={movie.id} movie={movie} type={type} />
            ))
        ) : (
          <div className="bg-red-100 text-red-600 border-2 border-red-600 rounded-lg p-6 text-center text-lg font-semibold max-w-lg mx-auto mt-8 shadow-lg transition-all hover:bg-red-200 hover:scale-105">
            IN THIS TYPE NO MOVIES FOUND. TRY AGAIN LATER!
          </div>
        )}
      </div>
    </section>
  );
}

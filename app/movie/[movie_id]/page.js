import MovieDetail from "@/components/detailsMovie/MovieDetail";
import RelatedMovies from "@/components/detailsMovie/RelatedMovies";
import { getMovieById } from "@/utils/data-utils";

export default async function MovieDetailPage({ params }) {
  const { movie_id } = params || {};

  const movie = await getMovieById(movie_id);

  return (
    <>
      <MovieDetail movie={movie} />
      <RelatedMovies movieId={movie_id} />
    </>
  );
}

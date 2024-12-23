import Loader from "@/components/common/Loader";
import MovieDetail from "@/components/detailsMovie/MovieDetail";
import RelatedMovies from "@/components/detailsMovie/RelatedMovies";
import { getMovieById, getSimilarMovies } from "@/utils/data-utils";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateMetadata({ params: { movie_id } }) {
  const movie = await getMovieById(movie_id);
  return {
    title: movie?.title || "Movie - DB",
    description:
      movie?.overview ||
      "Best Resource for movies, where you can find all the movies in world!",
    openGraph: {
      title: movie?.title || "Movie - DB",
      description:
        movie?.overview ||
        "Best Resource for movies, where you can find all the movies in world!",
      images: [`https://image.tmdb.org/t/p/original${movie?.poster_path}`],
      url: `${process.env.NEXT_PUBLIC_APP_URL}movie/${movie_id}`,
    },
    twitter: {
      card: "summary_large_image",
      title: movie?.title || "Movie - DB",
      description:
        movie?.overview ||
        "Best Resource for movies, where you can find all the movies in world!",
      image: [`https://image.tmdb.org/t/p/original${movie?.poster_path}`],
      url: `${process.env.NEXT_PUBLIC_APP_URL}movie/${movie_id}`,
    },
  };
}

// export default async function MovieDetailPage({ params }) {
//   const { movie_id } = params || {};

//   const movie = await getMovieById(movie_id);
//   if (!movie) notFound();

//   return (
//     <>
//       <MovieDetail movie={movie} />
//         <RelatedMovies movieId={movie_id} />
//     </>
//   );
// }

export default async function MovieDetailPage({ params }) {
  const { movie_id } = params || {};

  const moviePromise = getMovieById(movie_id);
  const similarMoviesPromise = getSimilarMovies(movie_id);

  const movie = await moviePromise;
  if (!movie) notFound();

  return (
    <>
      <MovieDetail movie={movie} />
      <Suspense fallback={<Loader text={"Loading related movies..."} />}>
        <RelatedMovies similarMoviesPromise={similarMoviesPromise} />
      </Suspense>
    </>
  );
}

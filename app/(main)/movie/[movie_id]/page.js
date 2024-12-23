import MovieDetail from "@/components/detailsMovie/MovieDetail";
import RelatedMovies from "@/components/detailsMovie/RelatedMovies";
import { getMovieById } from "@/utils/data-utils";
import { notFound } from "next/navigation";

// export async function generateMetadata({ params: { movie_id } }) {
//   const movie = await getMovieById(movie_id);

//   return {
//     title: `${movie?.title} - MovieDB`,
//     description: movie?.overview,
//     openGraph: {
//       title: `${movie?.title}`,
//       description: movie?.overview,
//       images: [`https://image.tmdb.org/t/p/original${movie?.poster_path}`],
//     },
//   };
// }

// Assuming you're using Next.js 14 App Router and `generateMetadata` is in the page file

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

export default async function MovieDetailPage({ params }) {
  const { movie_id } = params || {};

  const movie = await getMovieById(movie_id);
  if (!movie) notFound();

  return (
    <>
      <MovieDetail movie={movie} />
      <RelatedMovies movieId={movie_id} />
    </>
  );
}

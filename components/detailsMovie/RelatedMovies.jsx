import RelatedCard from "./RelatedCard";

export default async function RelatedMovies({ similarMoviesPromise }) {
  // const similarMovies = await getSimilarMovies(movieId);
  const similarMovies = await similarMoviesPromise;
  // console.log(similarMovies);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">More Like This</h2>

      <div className="flex space-x-4 overflow-x-auto pb-4">
        {/* <div className="flex w-48 h-[288px] rounded-lg cursor-pointer hover:scale-105 transition-transform">
          <div className="w-48 h-[288px] rounded-lg bg-zinc-800 relative">
            <div className="absolute inset-0 w-full h-full rounded-lg overflow-hidden">
              <div className="animate-pulse w-full h-full bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 bg-[length:200%_100%] animate-[shimmer_.5s_infinite]"></div>
            </div>
          </div>
        </div> */}

        {similarMovies
          ?.filter((movie) => movie?.poster_path)
          ?.map((movie) => (
            // <div
            //   key={movie?.id}
            //   className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform"
            // >
            //   <Link href={`/movie/${movie?.id}`}>
            //     <Image
            //       width={1000}
            //       height={1000}
            //       src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
            //       alt="The Good German"
            //       className="w-full rounded-lg"
            //       placeholder="empty"
            //       loading="lazy"
            //     />
            //   </Link>
            // </div>
            <RelatedCard key={movie?.id} movie={movie} />
          ))}
      </div>
    </div>
  );
}

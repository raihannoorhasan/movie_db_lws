import RelatedCard from "./RelatedCard";

export default async function RelatedMovies({ similarMoviesPromise }) {
  const similarMovies = await similarMoviesPromise;
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">More Like This</h2>
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {similarMovies
          ?.filter((movie) => movie?.poster_path)
          ?.map((movie) => (
            <RelatedCard key={movie?.id} movie={movie} />
          ))}
      </div>
    </div>
  );
}

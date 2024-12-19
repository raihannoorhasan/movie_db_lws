import Image from "next/image";
import Cast from "./Cast";
import Genres from "./Genres";
import SocialShare from "./SocialShare";
import WatchList from "./WatchList";

export default function MovieDetail({ movie }) {
  const { title, backdrop_path, poster_path, overview, runtime, genres, id } =
    movie || {};
  return (
    <div id="movieDetails" className="min-h-screen pt-20 mb-8">
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <Image
            width={1000}
            height={1000}
            src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
            alt="Smile 2"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70"></div>
        </div>

        <div className="relative container mx-auto px-4 pt-32">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <Image
                width={1000}
                height={1000}
                src={`https://image.tmdb.org/t/p/original${poster_path}`}
                alt="Smile 2"
                className="w-full rounded-lg shadow-lg"
              />
            </div>

            <div className="md:w-2/3">
              <h1 className="text-4xl font-bold mb-4">{title}</h1>

              <div className="flex items-center mb-4 space-x-4">
                <span className="text-green-500"> 24 November 2024 </span>
                <span>| </span>
                <span>{runtime} min</span>
              </div>

              <p className="text-lg mb-6">{overview}</p>

              <Genres genres={genres} />
              <Cast movieId={id} />
              <WatchList movie={movie} />
              <SocialShare />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

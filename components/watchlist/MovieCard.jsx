import { getYearByDate } from "@/utils/date-utils";
import Image from "next/image";
import RemoveCardButton from "./RemoveCardButton";

export default function MovieCard({ movie, userId }) {
  const { title, releaseDate, posterPath, movieId } = movie || {};
  return (
    <div className="bg-moviedb-black rounded-lg overflow-hidden shadow-lg group relative">
      <Image
        src={`https://image.tmdb.org/t/p/original${posterPath}`}
        alt={title}
        width={700}
        height={450}
        className="w-full h-[450px] object-cover"
      />
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <h2 className="text-xl font-bold text-light mb-2">{title}</h2>
        <div className="flex justify-between items-center">
          <span className="text-primary">{getYearByDate(releaseDate)}</span>
          <RemoveCardButton movieId={movieId} userId={userId} />
        </div>
      </div>
    </div>
  );
}

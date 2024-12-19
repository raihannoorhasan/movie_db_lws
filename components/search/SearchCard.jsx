import { getYearByDate } from "@/utils/date-utils";
import Image from "next/image";

export default function SearchCard({ movie }) {
  const { poster_path, title, release_date, vote_average } = movie || {};
  return (
    <>
      <Image
        width={300}
        height={100}
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        alt="Avatar: The Way of Water"
        className="w-full aspect-[2/3] object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold mb-2">{title}</h3>
        <div className="flex justify-between text-sm text-gray-400">
          <span>{getYearByDate(release_date)}</span>
          <span>⭐ {vote_average}</span>
        </div>
      </div>
    </>
  );
}

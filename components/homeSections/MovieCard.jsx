import { getYearByDate } from "@/utils/date-utils";
import Image from "next/image";
import Link from "next/link";

export default function MovieCard({ movie }) {
  const { poster_path, title, release_date, id } = movie || {};

  return (
    <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
      <Link href={`/movie/${id}`}>
        <Image
          width={300}
          height={300}
          src={`https://image.tmdb.org/t/p/original${poster_path}`}
          alt="Smile 2"
          className=" w-full rounded-lg"
        />

        <div className="mt-2">
          <h3 className="text-light text-sm font-bold truncate">{title}</h3>
          <p className="text-primary text-xs">{getYearByDate(release_date)}</p>
        </div>
      </Link>
    </div>
  );
}

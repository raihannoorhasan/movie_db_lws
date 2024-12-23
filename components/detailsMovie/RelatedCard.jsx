import { getBlurData } from "@/utils/blur-generator";
import Image from "next/image";
import Link from "next/link";

export default async function RelatedCard({ movie }) {
  const { base64 } = await getBlurData(
    `https://image.tmdb.org/t/p/original${movie?.poster_path}`
  );
  return (
    <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
      <Link href={`/movie/${movie?.id}`}>
        <Image
          width={1000}
          height={1000}
          src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
          alt="The Good German"
          className="w-full rounded-lg"
          placeholder="blur"
          blurDataURL={base64}
          loading="lazy"
        />
      </Link>
    </div>
  );
}

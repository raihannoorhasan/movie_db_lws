import { getCastByMovieId } from "@/utils/data-utils";
import Image from "next/image";

export default async function Cast({ movieId }) {
  const casts = await getCastByMovieId(movieId);

  return (
    <div className="mb-6">
      <h3 className="text-gray-400 mb-2">Cast</h3>
      <div className="flex flex-wrap gap-4">
        {casts?.length > 0 ? (
          casts
            .filter((c) => c.profile_path)
            .slice(0, 5)
            .map((cast) => (
              <div key={cast?.id} className="text-center">
                <Image
                  width={96}
                  height={96}
                  src={`https://image.tmdb.org/t/p/original${cast?.profile_path}`}
                  alt="Naomi Scott"
                  className="w-24 h-24 rounded-full object-cover mb-2"
                />
                <p className="text-sm">{cast?.name}</p>
              </div>
            ))
        ) : (
          <div>No Cast Found</div>
        )}
      </div>
    </div>
  );
}

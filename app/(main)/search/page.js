import SearchCard from "@/components/search/SearchCard";
import { getMoviesByQuery } from "@/utils/data-utils";
import Link from "next/link";

export default async function SearchPage({ searchParams }) {
  const searchResults = await getMoviesByQuery(searchParams?.query || "");

  // console.log(searchResults?.length);

  return (
    <main className="container mx-auto px-4 pt-24 pb-8">
      {/* <!-- Search Stats --> */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{`Search Results for ${searchParams?.query}`}</h1>
        <p className="text-gray-400">
          {searchResults?.length > 0
            ? `Found ${searchResults?.length} results`
            : "Nothing "}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {searchResults?.length > 0 ? (
          searchResults
            ?.filter((r) => r.poster_path)
            ?.map((movie) => (
              <Link
                key={movie?.id}
                href={`/movie/${movie?.id}`}
                className="bg-zinc-900 rounded-lg overflow-hidden hover:scale-105 transition-transform"
              >
                <SearchCard movie={movie} />
              </Link>
            ))
        ) : (
          <div>UFFFS!!! No, Movies found with this query</div>
        )}
      </div>
    </main>
  );
}

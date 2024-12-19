import { removeSlot } from "@/actions/slot";
import Image from "next/image";

export default function FilledSlot({ movie, slotId }) {
  const { poster_path, title, vote_average } = movie || {};

  return (
    <div className="bg-zinc-900 rounded-lg p-4 flex flex-col">
      <div className="flex justify-end mb-4">
        <form action={removeSlot} className="flex justify-end mb-4">
          <input type="hidden" name="slotId" value={slotId} />
          <button className="text-gray-400 hover:text-white">✕</button>
        </form>
      </div>
      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-2 h-full">
          <Image
            width={300}
            height={100}
            src={`https://image.tmdb.org/t/p/original${poster_path}`}
            alt={title}
            className="w-full rounded-lg mb-4 object-contain max-h-full"
          />
          <h2 className="text-xl font-bold mb-2 text-center">{title}</h2>
        </div>
        <div className="w-full space-y-4 col-span-3">
          <div className="bg-zinc-800 p-3 rounded">
            <span className="text-gray-400">Rating:</span>
            <span className="float-right">{vote_average}/10</span>
          </div>
          <div className="bg-zinc-800 p-3 rounded">
            <span className="text-gray-400">Release Year:</span>
            <span className="float-right">2016</span>
          </div>
          <div className="bg-zinc-800 p-3 rounded">
            <span className="text-gray-400">Runtime:</span>
            <span className="float-right">134 min</span>
          </div>
          <div className="bg-zinc-800 p-3 rounded">
            <span className="text-gray-400">Budget:</span>
            <span className="float-right">$40.0M</span>
          </div>
          <div className="bg-zinc-800 p-3 rounded">
            <span className="text-gray-400">Revenue:</span>
            <span className="float-right">$37.4M</span>
          </div>
          <div className="bg-zinc-800 p-3 rounded">
            <span className="text-gray-400">Genres:</span>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="bg-zinc-700 px-2 py-1 rounded-full text-sm">
                Drama{" "}
              </span>
              <span className="bg-zinc-700 px-2 py-1 rounded-full text-sm">
                History{" "}
              </span>
              <span className="bg-zinc-700 px-2 py-1 rounded-full text-sm">
                Crime{" "}
              </span>
              <span className="bg-zinc-700 px-2 py-1 rounded-full text-sm">
                Thriller
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

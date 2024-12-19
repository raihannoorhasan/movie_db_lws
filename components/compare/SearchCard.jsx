"use client";
import { updateSlot } from "@/actions/slot";
import { getYearByDate } from "@/utils/date-utils";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchCard({ movie }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  //   console.log("params:");

  //   console.log(searchParams.get("slot"));

  const slotId = searchParams.get("slot");

  const handleMovieClick = async (movie) => {
    console.log("The slot id is : ");

    console.log(slotId);

    if (!slotId) {
      alert("No valid slot selected.");
      return;
    }

    const formData = new FormData();
    formData.append("slotId", slotId);
    formData.append("movieData", JSON.stringify(movie));

    await updateSlot(formData); // Update the slot with the selected movie

    const params = new URLSearchParams(searchParams.toString());
    params.delete("slot");
    params.delete("search");
    router.replace(`?${params.toString()}`); // Update the URL without 'slot'
  };

  return (
    <div
      key={movie?.id}
      className="flex items-center gap-4 p-2 hover:bg-zinc-800 cursor-pointer rounded"
      onClick={() => handleMovieClick(movie)}
    >
      <Image
        width={64}
        height={96}
        src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
        alt="The Social Network"
        className="w-16 h-24 object-cover rounded"
      />
      <div>
        <h3 className="font-bold">{movie?.title}</h3>
        <p className="text-sm text-gray-400">
          {getYearByDate(movie?.release_date)}
        </p>
      </div>
    </div>
  );
}

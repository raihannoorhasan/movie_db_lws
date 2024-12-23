import { getMoviesByQuery } from "@/utils/data-utils";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import SearchCard from "./SearchCard";

let modalData = [];

export default function SearchModal({ searchParams }) {
  const closeModal = async () => {
    "use server";
    redirect(`/compare`);
  };

  const serverAction = async (formData) => {
    "use server";
    const value = formData.get("searchValue");
    if (!value.trim()) return;
    try {
      const res = await getMoviesByQuery(value);
      modalData = res;
      revalidateTag("modalData");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-zinc-900 p-6 rounded-lg w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Search Movie</h2>
          <form action={closeModal}>
            <button type="submit" className="text-gray-400 hover:text-white">
              ✕
            </button>
          </form>
        </div>

        <form action={serverAction}>
          <input
            type="text"
            placeholder="Type movie name..."
            className="w-full bg-zinc-800 text-white px-4 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-red-600"
            name="searchValue"
          />
          <button type="submit" className="hidden">
            Submit
          </button>
        </form>

        <div className="max-h-96 overflow-y-auto">
          {modalData.length > 0 ? (
            modalData.map((d) => <SearchCard key={d?.id} movie={d} />)
          ) : (
            <div>No result!</div>
          )}
        </div>
      </div>
    </div>
  );
}

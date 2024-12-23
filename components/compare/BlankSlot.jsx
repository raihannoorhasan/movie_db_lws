import { removeSlot } from "@/actions/slot";
import { redirect } from "next/navigation";

export default function BlankSlot({ slotId }) {
  const openAction = async () => {
    "use server";
    redirect(`/compare?search=true&slot=${slotId}`);
  };

  return (
    <div className="bg-zinc-900 rounded-lg p-4 flex flex-col min-h-[400px]">
      <form action={removeSlot} className="flex justify-end mb-4">
        <input type="hidden" name="slotId" value={slotId} />
        <button type="submit" className="text-gray-400 hover:text-white">
          ✕
        </button>
      </form>

      <div className="flex-grow flex flex-col items-center justify-center">
        <form action={openAction}>
          <button className="bg-zinc-800 text-white px-6 py-3 rounded hover:bg-zinc-700 transition-colors cursor-pointer">
            Select Movie
          </button>
        </form>
      </div>
    </div>
  );
}

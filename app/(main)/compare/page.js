// import { fetchSlots } from "@/actions/slot";
// import BlankSlot from "@/components/compare/BlankSlot";
// import PageHeader from "@/components/compare/PageHeader";

// export default async function ComparePage() {
//   // Fetch slots directly from the server
//   const slots = await fetchSlots();

//   return (
//     <main className="container mx-auto px-4 pt-24 pb-8">
//       <PageHeader />

//       <div className="grid gap-6 md:grid-cols-2">
//         {slots.map((slotId) => (
//           <BlankSlot key={slotId} slotId={slotId} />
//         ))}
//       </div>
//     </main>
//   );
// }

// // return (
// //   <div>
// //     {/* Add Slot Button */}
// //     <form action={addSlot}>
// //       <button
// //         type="submit"
// //         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
// //       >
// //         Add Slot
// //       </button>
// //     </form>

// //     {/* Slots List */}
// //     <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
// //       {slots.map((slotId) => (
// //         <div
// //           key={slotId}
// //           className="bg-zinc-900 rounded-lg p-4 flex flex-col min-h-[400px]"
// //         >
// //           <div className="flex justify-end mb-4">
// //             <form action={removeSlot}>
// //               <input type="hidden" name="slotId" value={slotId} />
// //               <button
// //                 type="submit"
// //                 className="text-gray-400 hover:text-white"
// //               >
// //                 ✕
// //               </button>
// //             </form>
// //           </div>
// //           <div className="flex-grow flex flex-col items-center justify-center">
// //             <a
// //               href="./search.html"
// //               className="bg-zinc-800 text-white px-6 py-3 rounded hover:bg-zinc-700 transition-colors cursor-pointer"
// //             >
// //               Select Movie
// //             </a>
// //           </div>
// //         </div>
// //       ))}
// //     </div>
// //   </div>
// // );

import { fetchSlots } from "@/actions/slot";
import BlankSlot from "@/components/compare/BlankSlot";
import FilledSlot from "@/components/compare/FilledSlot";
import PageHeader from "@/components/compare/PageHeader";

export const revalidate = 0; //

export default async function ComparePage() {
  const slots = await fetchSlots();

  return (
    <main className="container mx-auto px-4 pt-24 pb-8">
      <PageHeader />

      <div className="grid gap-6 md:grid-cols-2">
        {slots.map((slot) =>
          slot.movie ? (
            <FilledSlot
              key={slot.id}
              movieId={slot.movie?.id}
              slotId={slot.id}
            />
          ) : (
            <BlankSlot key={slot.id} slotId={slot.id} />
          )
        )}
      </div>
    </main>
  );
}

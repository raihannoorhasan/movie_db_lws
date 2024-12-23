// server side
import { fetchSlots } from "@/actions/slot";
import BlankSlot from "@/components/compare/BlankSlot";
import FilledSlot from "@/components/compare/FilledSlot";
import PageHeader from "@/components/compare/PageHeader";

export const revalidate = 0;

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

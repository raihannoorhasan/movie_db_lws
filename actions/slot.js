"use server";

import { revalidateTag } from "next/cache";

let slots = [
  {
    id: crypto.randomUUID(),
    movie: null,
  },
];

export async function addSlot() {
  // const newSlotId = `slot-${slots.length + 1}`;
  slots.push({
    id: crypto.randomUUID(),
    movie: null,
  });

  // Trigger revalidation
  revalidateTag("slots");
}

export async function removeSlot(formData) {
  const slotId = formData.get("slotId"); // Get slotId from form data
  slots = slots.filter((slot) => slot.id !== slotId);

  // Revalidate components tagged with "slots"
  revalidateTag("slots");
}

export async function fetchSlots() {
  // revalidateTag("slots");
  return slots;
}

export async function updateSlot(formData) {
  const slotId = formData.get("slotId");
  const movieData = JSON.parse(formData.get("movieData"));

  // Check if the slot exists
  let slotIndex = slots.findIndex((slot) => slot.id === slotId);

  if (slotIndex === -1) {
    // If the slot doesn't exist, create it
    slots.push({
      id: slotId,
      movie: movieData,
    });
  } else {
    // If the slot exists, update it with the movie data
    slots[slotIndex].movie = movieData;
  }

  // Trigger revalidation
  revalidateTag("slots");
}

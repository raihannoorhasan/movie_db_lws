"use server";

import { revalidateTag } from "next/cache";

let slots = []; // Replace with a database for persistence.

// export async function addSlot() {
//   const newSlotId = `slot-${slots.length + 1}`;
//   slots.push();

//   // Trigger revalidation
//   revalidateTag("slots");
// }

export async function addSlot() {
  const newSlotId = `slot-${slots.length + 1}`;
  slots.push({
    id: newSlotId,
    movie: null,
  });

  // Trigger revalidation
  revalidateTag("slots");
}

// export async function removeSlot(slotId) {
//   slots = slots.filter((id) => id !== slotId);

//   // Trigger revalidation
//   revalidateTag("slots");
// }

// export async function removeSlot(formData) {
//   const slotId = formData.get("slotId"); // Get slotId from form data
//   slots = slots.filter((id) => id !== slotId);

//   // Revalidate components tagged with "slots"
//   revalidateTag("slots");
// }

export async function removeSlot(formData) {
  const slotId = formData.get("slotId"); // Get slotId from form data
  slots = slots.filter((slot) => slot.id !== slotId);

  // Revalidate components tagged with "slots"
  revalidateTag("slots");
}

export async function fetchSlots() {
  return slots;
}

// export async function updateSlot(formData) {
//   const slotId = formData.get("slotId");
//   const movieData = JSON.parse(formData.get("movieData"));

//   const slotIndex = slots.findIndex((slot) => slot.id === slotId);
//   if (slotIndex !== -1) {
//     slots[slotIndex].movie = movieData; // Update the slot with the movie data
//   }

//   revalidateTag("slots");
// }

// export async function updateSlot(formData) {
//   const slotId = formData.get("slotId");
//   const movieData = JSON.parse(formData.get("movieData"));

//   console.log(slotId);

//   // Ensure the slot exists before updating
//   const slotIndex = slots.findIndex((slot) => slot.id === slotId);
//   if (slotIndex === -1) {
//     throw new Error(`Slot with ID ${slotId} does not exist.`);
//   }

//   // Update the slot with the movie data
//   slots[slotIndex].movie = movieData;

//   // Trigger revalidation
//   revalidateTag("slots");
// }

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

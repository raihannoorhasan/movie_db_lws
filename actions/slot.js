// "use server";

// import { revalidateTag } from "next/cache";

// let slots = [
//   {
//     id: crypto.randomUUID(),
//     movie: null,
//   },
// ];

// export async function addSlot() {
//   // const newSlotId = `slot-${slots.length + 1}`;
//   slots.push({
//     id: crypto.randomUUID(),
//     movie: null,
//   });

//   // Trigger revalidation
//   revalidateTag("slots");
// }

// export async function removeSlot(formData) {
//   const slotId = formData.get("slotId"); // Get slotId from form data
//   slots = slots.filter((slot) => slot.id !== slotId);

//   // Revalidate components tagged with "slots"
//   revalidateTag("slots");
// }

// export async function fetchSlots() {
//   // revalidateTag("slots");
//   return slots;
// }

// export async function updateSlot(formData) {
//   const slotId = formData.get("slotId");
//   const movieData = JSON.parse(formData.get("movieData"));

//   // Check if the slot exists
//   let slotIndex = slots.findIndex((slot) => slot.id === slotId);

//   if (slotIndex === -1) {
//     // If the slot doesn't exist, create it
//     slots.push({
//       id: slotId,
//       movie: movieData,
//     });
//   } else {
//     // If the slot exists, update it with the movie data
//     slots[slotIndex].movie = movieData;
//   }

//   // Trigger revalidation
//   revalidateTag("slots");
// }

// "use server";

// import { revalidateTag } from "next/cache";

// // Persistent in-memory storage simulation
// let slotCounter = 1;
// let slots = [
//   {
//     id: `slot-${slotCounter++}`,
//     movie: null,
//   },
// ];

// // Fetch slots
// export async function fetchSlots() {
//   return slots;
// }

// // Add a slot
// export async function addSlot() {
//   slots.push({
//     id: `slot-${slotCounter++}`,
//     movie: null,
//   });

//   revalidateTag("slots");
// }

// // Remove a slot
// export async function removeSlot(formData) {
//   const slotId = formData.get("slotId");
//   slots = slots.filter((slot) => slot.id !== slotId);

//   revalidateTag("slots");
// }

// // Update a slot
// export async function updateSlot(formData) {
//   const slotId = formData.get("slotId");
//   const movieData = JSON.parse(formData.get("movieData"));

//   const slotIndex = slots.findIndex((slot) => slot.id === slotId);
//   if (slotIndex !== -1) {
//     slots[slotIndex].movie = movieData;
//   } else {
//     slots.push({ id: slotId, movie: movieData });
//   }

//   revalidateTag("slots");
// }

// new

"use server";

import { revalidateTag } from "next/cache";

let slotCounter = 1;
let slots = [
  {
    id: `slot-${slotCounter++}`,
    movie: null,
  },
];

export async function fetchSlots() {
  return [...slots]; // Return a copy to prevent external mutation
}

export async function addSlot() {
  slots.push({
    id: `slot-${slotCounter++}`,
    movie: null,
  });
  revalidateTag("slots");
}

export async function removeSlot(formData) {
  const slotId = formData.get("slotId");
  slots = slots.filter((slot) => slot.id !== slotId);
  revalidateTag("slots");
}

export async function updateSlot(formData) {
  const slotId = formData.get("slotId");
  const movieData = JSON.parse(formData.get("movieData"));

  const slotIndex = slots.findIndex((slot) => slot.id === slotId);
  if (slotIndex !== -1) {
    slots[slotIndex].movie = movieData;
  }
  revalidateTag("slots");
}

let modalData = [];

// Fetch modal data
export async function fetchModalData() {
  return [...modalData]; // Return a copy to ensure immutability
}

export async function searchMovies(formData) {
  const value = formData.get("searchValue");
  if (!value.trim()) return;
  try {
    const res = await getMoviesByQuery(value); // Your API logic
    modalData = res;
    revalidateTag("modalData");
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
}

export async function closeSearchModal() {
  modalData = [];
  revalidateTag("modalData");
}

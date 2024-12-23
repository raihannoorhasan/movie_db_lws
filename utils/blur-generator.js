import { getPlaiceholder } from "plaiceholder";
import sharp from "sharp";

async function getBlurData(src) {
  try {
    const response = await fetch(src);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch image at ${src}, status: ${response.status}`
      );
    }

    const buffer = await response.arrayBuffer();

    // Process the buffer with sharp
    const processedBuffer = await sharp(Buffer.from(buffer))
      .resize(10) // Resize for faster processing and blur effect
      .jpeg({ quality: 70 }) // Convert to JPEG with reduced quality
      .toBuffer();

    // Generate the blur placeholder using plaiceholder
    const { base64 } = await getPlaiceholder(processedBuffer);

    return { base64 };
  } catch (error) {
    console.error("Error in getBlurData:", error.message);
    return { base64: "" }; // Return an empty placeholder in case of errors
  }
}

export { getBlurData };

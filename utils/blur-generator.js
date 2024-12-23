import { getPlaiceholder } from "plaiceholder";
import sharp from "sharp";

async function getBlurData(src) {
  const response = await fetch(src);

  if (!response.ok) {
    console.log(`Failed to fetch image at ${src}`);
  }

  const buffer = await response.arrayBuffer();
  const processedBuffer = await sharp(Buffer.from(buffer))
    .toFormat("jpeg") // Convert to JPEG
    .toBuffer();

  // Generate the blur data using plaiceholder
  const data = await getPlaiceholder(processedBuffer);
  return data;
}

export { getBlurData };

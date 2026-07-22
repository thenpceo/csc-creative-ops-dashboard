import { readFile, writeFile, mkdir } from "node:fs/promises";
import { basename, dirname, extname, resolve } from "node:path";
import { fal } from "@fal-ai/client";

const args = Object.fromEntries(
  process.argv.slice(2).reduce((pairs, value, index, all) => {
    if (value.startsWith("--")) pairs.push([value.slice(2), all[index + 1]]);
    return pairs;
  }, []),
);

if (!process.env.FAL_KEY) {
  console.error("FAL_KEY is required in the server-side environment. Do not expose it in browser code.");
  process.exit(1);
}

const adapterRoot = resolve(import.meta.dirname);
const dashboardRoot = resolve(adapterRoot, "../..");
const defaultImage = resolve(dashboardRoot, "../brand-packages/one-kings-lane/media/generated-example/austin-fountain-winter-garden-demo.png");
const defaultOutput = resolve(dashboardRoot, "public/examples/one-kings-lane/generative-video-demo.mp4");
const imagePath = resolve(args.image || defaultImage);
const outputPath = resolve(args.output || defaultOutput);
const duration = String(args.duration || "5");
const prompt = args.prompt || [
  "Animate the supplied start image as one continuous photorealistic shot.",
  "The Austin fountain and the entire garden are locked identity references, not redesign suggestions.",
  "Only the fountain water flows gently and a few fine snowflakes settle through the background.",
  "The camera performs one almost imperceptible six-inch push-in over five seconds at natural eye level.",
  "Preserve the fountain silhouette, proportions, stone finish, basin, pedestal, water outlets, real scale, contact, garden geometry, object placement, and blue-hour light direction in every frame.",
  "End with one second of visually calm footage.",
  "No product transformation, invented ornament, duplicated fountain, texture crawl, melting stone, warped architecture, sliding objects, speed ramp, text, logo, or people."
].join(" ");

const mimeByExtension = { ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg" };
const bytes = await readFile(imagePath);
const file = new File([bytes], basename(imagePath), { type: mimeByExtension[extname(imagePath).toLowerCase()] || "application/octet-stream" });
const imageUrl = await fal.storage.upload(file);

const result = await fal.subscribe("fal-ai/kling-video/v3/turbo/pro/image-to-video", {
  input: { image_url: imageUrl, prompt, duration },
  logs: true,
  onQueueUpdate(update) {
    if (update.status === "IN_PROGRESS") {
      for (const log of update.logs || []) console.log(log.message);
    }
  },
});

const videoUrl = result.data?.video?.url;
if (!videoUrl) throw new Error("The provider returned no video URL.");
const response = await fetch(videoUrl);
if (!response.ok) throw new Error(`Video download failed: ${response.status}`);
await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, Buffer.from(await response.arrayBuffer()));
console.log(JSON.stringify({ outputPath, requestId: result.requestId, model: "fal-ai/kling-video/v3/turbo/pro/image-to-video", duration }, null, 2));


# One Kings Lane → fal.ai image-to-video

This adapter serializes the provider-neutral `gen-video.product-in-context` recipe for the current Kling V3 Turbo Pro image-to-video endpoint.

## Required input boundary

- Start with a rights-cleared image that already contains the verified product and approved environment.
- Keep product identity, room geometry, object placement, material behavior, and light direction locked.
- Let the user change only the subject action, environmental motion, camera move, camera distance, duration, and final hold.
- Generate only the clean visual plate. Composite official identity and copy afterward.
- Compare first, middle, and final frames to the start image. Reject the entire clip on product mutation, geometry drift, object sliding, or texture crawl.

## Demonstration request

The included script uses:

- input: `austin-fountain-winter-garden-demo.png`;
- motion: fountain water plus light snow only;
- camera: one almost imperceptible six-inch push-in;
- duration: five seconds with a calm final second;
- output: `public/examples/one-kings-lane/generative-video-demo.mp4`.

## Run server-side

```sh
cd creative-ops-dashboard/adapters/fal
npm install
FAL_KEY="..." npm run generate
```

Keep `FAL_KEY` in a local server environment or secret manager. Never put it into the dashboard client bundle. The script uploads the local start image, waits for the queued result, and downloads the MP4. It prints the request ID without printing the credential.

After generation, inspect sampled frames against the reference. Only then add a reviewed output record to the brand media catalog. The current package catalogs the resulting internal example as `example.video.fountain-winter-garden`; it remains experimental and is not approved catalog media.

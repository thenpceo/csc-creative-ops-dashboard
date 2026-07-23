# One Kings Lane → fal.ai image-to-video

This adapter serializes the provider-neutral `gen-video.product-in-context` and `gen-video.product-highlight-shot` recipes for a selected fal.ai image-to-video endpoint. The endpoint is runtime metadata, not a permanent One Kings Lane rule.

## Required input boundary

- Start with a rights-cleared image that already contains the verified product and approved environment.
- Keep product identity, room geometry, object placement, material behavior, and light direction locked.
- Let the user change only the subject action, environmental motion, camera move, camera distance, duration, and final hold.
- Generate only the clean visual plate. Composite official identity and copy afterward.
- Compare first, middle, and final frames to the start image. Reject the entire clip on product mutation, geometry drift, object sliding, or texture crawl.

## Product-highlight shot contract

- Begin each shot with its own human-approved unified product-and-environment keyframe.
- Do not animate a keyframe whose product-fidelity decision is pending or failed.
- Use one restrained camera move on no more than one primary axis.
- Use at most one low-amplitude environmental action.
- Keep the product and supporting furniture stable; the product is not the motion source.
- End on a calm frame that can support a deterministic copy or identity layer.
- Sample the start, midpoint, and end of every result.
- Reject the whole clip when any sample changes silhouette, proportion, construction, material, finish, hardware, seams, countable details, scale, support contact, room geometry, object placement, or light direction.
- Record provider, endpoint, model version, request ID, source keyframe ID, output URI, checksum, sample evidence, and review decision in project metadata.
- Never infer that general internal-reference use also permits model upload. Record model-upload authorization independently.

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

import assert from "node:assert/strict";
import { createServer } from "node:http";
import { after, before, test } from "node:test";
import {
  assembleApprovedMedia,
  transitionTargetPairs,
  validateMediaManifest,
} from "../adapters/hyperframes/assemble-media-manifest.mjs";

let mediaServer;
let mediaOrigin;

before(async () => {
  mediaServer = createServer((req, res) => {
    if (/^\/scene-\d\.mp4$/.test(req.url)) {
      res.writeHead(200, { "Content-Type": "video/mp4" });
      res.end("approved-video-fixture");
      return;
    }
    res.writeHead(404);
    res.end();
  });
  await new Promise((resolve) => mediaServer.listen(0, "127.0.0.1", resolve));
  mediaOrigin = `http://127.0.0.1:${mediaServer.address().port}`;
});

after(async () => {
  await new Promise((resolve, reject) => mediaServer.close((error) => error ? reject(error) : resolve()));
});

function fixtureManifest() {
  return {
    schemaVersion: "1.0.0",
    media: ["distinction", "benefit", "proof", "context-resolve"].map((scene, index) => ({
      id: `plate-${scene}`,
      src: `${mediaOrigin}/scene-${index + 1}.mp4`,
      sceneSelector: `#scene-${scene}`,
      start: index * 4,
      duration: index === 3 ? 6 : 4,
      trackIndex: 0,
      approvalStatus: "approved",
      transition: {
        id: `transition-${scene}`,
        start: index * 4,
        duration: 0.6,
        easing: "power2.out",
      },
    })),
  };
}

test("approved media assembly is idempotent and retains four playable sources", async () => {
  const manifest = fixtureManifest();
  const host = "<!doctype html><html><body><main id=\"composition\"></main></body></html>";
  const firstAssembly = assembleApprovedMedia(host, manifest);
  const secondAssembly = assembleApprovedMedia(firstAssembly, manifest);

  assert.equal(secondAssembly, firstAssembly);
  assert.equal((secondAssembly.match(/<video /g) ?? []).length, 4);
  assert.equal((secondAssembly.match(/class="clip csc-approved-media-plate"/g) ?? []).length, 4);

  for (const item of manifest.media) {
    const response = await fetch(item.src);
    assert.equal(response.status, 200);
    assert(secondAssembly.includes(`src="${item.src}"`));
  }
});

test("every approved plate declares the same transition contract as its scene wrapper", () => {
  const manifest = fixtureManifest();
  validateMediaManifest(manifest);
  const pairs = transitionTargetPairs(manifest);

  assert.equal(pairs.length, 4);
  assert(pairs.every((pair) => pair.mediaSelector.startsWith("#plate-")));
  assert(pairs.every((pair) => pair.sceneSelector.startsWith("#scene-")));
  assert(pairs.every((pair) => pair.duration === 0.6));
  assert.equal(new Set(pairs.map((pair) => pair.transitionId)).size, 4);
});

test("unapproved media cannot enter the durable host manifest", () => {
  const manifest = fixtureManifest();
  manifest.media[2].approvalStatus = "pending";
  assert.throws(() => validateMediaManifest(manifest), /not approved/);
});

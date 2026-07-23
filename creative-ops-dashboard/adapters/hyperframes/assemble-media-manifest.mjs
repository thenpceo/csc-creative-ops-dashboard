const START_MARKER = "<!-- csc-approved-media:start -->";
const END_MARKER = "<!-- csc-approved-media:end -->";

function escapeAttribute(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export function validateMediaManifest(manifest) {
  if (manifest?.schemaVersion !== "1.0.0") throw new Error("Media manifest schemaVersion must be 1.0.0.");
  if (!Array.isArray(manifest.media) || manifest.media.length === 0) throw new Error("Media manifest requires at least one approved media record.");

  const ids = new Set();
  for (const [index, item] of manifest.media.entries()) {
    for (const field of ["id", "src", "sceneSelector", "start", "duration", "trackIndex", "transition"]) {
      if (item[field] === undefined || item[field] === null || item[field] === "") {
        throw new Error(`Media record ${index} is missing '${field}'.`);
      }
    }
    if (ids.has(item.id)) throw new Error(`Duplicate media id '${item.id}'.`);
    ids.add(item.id);
    if (item.approvalStatus !== "approved") throw new Error(`Media '${item.id}' is not approved.`);
    if (!item.transition.id || item.transition.start === undefined || item.transition.duration === undefined || !item.transition.easing) {
      throw new Error(`Media '${item.id}' has an incomplete transition contract.`);
    }
  }
  return manifest;
}

export function transitionTargetPairs(manifest) {
  validateMediaManifest(manifest);
  return manifest.media.map((item) => ({
    transitionId: item.transition.id,
    mediaSelector: `#${item.id}`,
    sceneSelector: item.sceneSelector,
    start: item.transition.start,
    duration: item.transition.duration,
    easing: item.transition.easing,
  }));
}

export function renderApprovedMediaBlock(manifest) {
  validateMediaManifest(manifest);
  const videos = manifest.media.map((item) => [
    `  <video id="${escapeAttribute(item.id)}"`,
    ' class="clip csc-approved-media-plate"',
    ` src="${escapeAttribute(item.src)}"`,
    ` data-start="${escapeAttribute(item.start)}"`,
    ` data-duration="${escapeAttribute(item.duration)}"`,
    ` data-track-index="${escapeAttribute(item.trackIndex)}"`,
    ` data-scene-selector="${escapeAttribute(item.sceneSelector)}"`,
    ` data-transition-id="${escapeAttribute(item.transition.id)}"`,
    ` data-transition-start="${escapeAttribute(item.transition.start)}"`,
    ` data-transition-duration="${escapeAttribute(item.transition.duration)}"`,
    ` data-transition-easing="${escapeAttribute(item.transition.easing)}"`,
    ' muted playsinline preload="auto"></video>',
  ].join("")).join("\n");
  return `${START_MARKER}\n${videos}\n${END_MARKER}`;
}

export function assembleApprovedMedia(html, manifest) {
  const block = renderApprovedMediaBlock(manifest);
  const startIndex = html.indexOf(START_MARKER);
  const endIndex = html.indexOf(END_MARKER);

  if (startIndex >= 0 || endIndex >= 0) {
    if (startIndex < 0 || endIndex < startIndex) throw new Error("Approved-media markers are incomplete or out of order.");
    return `${html.slice(0, startIndex)}${block}${html.slice(endIndex + END_MARKER.length)}`;
  }

  const bodyEnd = html.lastIndexOf("</body>");
  if (bodyEnd < 0) throw new Error("Host composition must contain a closing </body> element.");
  return `${html.slice(0, bodyEnd)}${block}\n${html.slice(bodyEnd)}`;
}

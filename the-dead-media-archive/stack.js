// stack.js

// ONE PLACE TO CHANGE THE LIMIT: the most individual units the viewer will draw on screen in a single frame.
// This no longer limits how many units exist -- all of them are laid out and reachable by dragging/zooming.
const MAX_RENDER_ITEMS = 50000;

function stackFor(bytes, medium) {
  const exact = bytes / medium.capacityBytes;
  const count = Math.max(1, Math.ceil(exact));

  return {
    medium,
    exact,
    count,
    renderCount: count,                    // every unit is laid out in the world
    isCapped: count > MAX_RENDER_ITEMS,    // true => the on-screen drawing limit can kick in
    maxRender: MAX_RENDER_ITEMS,
    depthMm: exact * medium.depthMm,
    volumeMm3: exact * medium.widthMm * medium.heightMm * medium.depthMm,
  };
}

function stacksForFile(bytes) {
  return MEDIA.slice()
    .sort((a, b) => b.year - a.year)
    .map((medium) => stackFor(bytes, medium));
}

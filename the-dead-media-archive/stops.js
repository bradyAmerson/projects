// stops.js
const GRID_ASPECT = 0.75;

// Media whose zoomed-out view is a white sheet with grid lines (so the unit count is readable)
const GRID_OVERVIEW_IDS = new Set(["williams-tube", "mercury-delay", "paper-tape", "punchcard"]);
const OVERVIEW_MIN_PX = 5;   // switch to the grid view when a unit is smaller than this on screen
const GRID_BOX_SIDE = 10;    // each grid box is 10 x 10 units = 100 units; boxes scale with zoom
const GRID_FILL = "#f7f2e4"; // off-white sheet

function layoutFor(stack, sprite) {
  const { medium, renderCount } = stack;
  const aspect = sprite && sprite.aspect ? sprite.aspect : (medium.widthMm / medium.heightMm);

  const itemW = medium.widthMm;
  const itemH = itemW / aspect;

  const gx = itemW * 0.01;
  const gy = itemH * 0.01;
  const cellW = itemW + gx;
  const cellH = itemH + gy;

  const cols = renderCount <= 6 ? renderCount : Math.ceil(Math.sqrt((renderCount * GRID_ASPECT * cellH) / cellW));
  const rows = Math.ceil(renderCount / cols);

  return { cols, rows, itemW, itemH, cellW, cellH, worldW: cols * cellW - gx, worldH: rows * cellH - gy };
}

// Background colour of the device photo, sampled from its corners (cached once the picture has loaded)
function photoBackground(sprite) {
  if (sprite.bg) return sprite.bg;
  const t = sprite.thumb;
  if (!t) return "#f7f2e4";
  try {
    const ctx = t.getContext("2d");
    const w = t.width, h = t.height;
    const pts = [[0, 0], [w - 1, 0], [0, h - 1], [w - 1, h - 1]];
    let r = 0, g = 0, b = 0, n = 0;
    pts.forEach(([x, y]) => {
      const d = ctx.getImageData(x, y, 1, 1).data;
      if (d[3] > 128) { r += d[0]; g += d[1]; b += d[2]; n++; }
    });
    if (n) {
      sprite.bg = `rgb(${Math.round(r / n)}, ${Math.round(g / n)}, ${Math.round(b / n)})`;
    } else {
      // Transparent picture: the visible background is the box behind it (the .device-thumb tile beside the title)
      const box = document.querySelector(".device-thumb");
      const css = box ? getComputedStyle(box).backgroundColor : "";
      sprite.bg = css && css !== "rgba(0, 0, 0, 0)" ? css : "#ff0000";
    }
  } catch (e) {
    sprite.bg = "#f7f2e4";
  }
  return sprite.bg;
}

function createViewer(stack, getL) {
  const { medium, renderCount } = stack;
  const sprite = getSprite(medium);

  const root = document.createElement("div");
  root.className = "viewer";
  const canvas = document.createElement("canvas");
  canvas.setAttribute("aria-label", `${formatCount(stack.count)} ${medium.name}`);

  const controls = document.createElement("div");
  controls.className = "controls";
  controls.innerHTML = `
    <button type="button" data-act="out" aria-label="Zoom out">−</button>
    <input type="range" min="0" max="5000" value="0" aria-label="Zoom slider">
    <button type="button" data-act="in" aria-label="Zoom in">+</button>
    <button type="button" data-act="fit">Fit View</button>
    <span class="readout"></span>`;
  root.append(canvas, controls);

  const slider = controls.querySelector("input");
  const readout = controls.querySelector(".readout");
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingQuality = "high";

  let W = 0, H = 0, dpr = 1, fitZoom = 1, maxZoom = 2;
  let visible = true; // Fixed: enabled by default for timeline stage

  let L = getL();
  const cam = { zoom: 1, cx: L.worldW / 2, cy: L.worldH / 2 };
  const target = { zoom: 1, cx: L.worldW / 2, cy: L.worldH / 2 };
  let animating = false;

  function tick() {
    if (!visible) { animating = false; return; }

    const dz = target.zoom - cam.zoom;
    const dx = target.cx - cam.cx;
    const dy = target.cy - cam.cy;

    if (Math.abs(dz) > 0.00005 * cam.zoom || Math.abs(dx) > 0.02 || Math.abs(dy) > 0.02) {
      cam.zoom += dz * 0.22;
      cam.cx += dx * 0.22;
      cam.cy += dy * 0.22;
      slider.value = (5000 * Math.log(cam.zoom / fitZoom)) / Math.log(maxZoom / fitZoom);
      draw();
      requestAnimationFrame(tick);
    } else {
      cam.zoom = target.zoom;
      cam.cx = target.cx;
      cam.cy = target.cy;
      slider.value = (5000 * Math.log(cam.zoom / fitZoom)) / Math.log(maxZoom / fitZoom);
      draw();
      animating = false;
    }
  }

  function startAnimation() {
    if (!animating) {
      animating = true;
      requestAnimationFrame(tick);
    }
  }

  function setCam(zoom, cx, cy, instant = false) {
    L = getL();
    target.zoom = Math.min(maxZoom, Math.max(fitZoom, zoom));
    target.cx = Math.min(L.worldW, Math.max(0, cx));
    target.cy = Math.min(L.worldH, Math.max(0, cy));

    if (instant) {
      cam.zoom = target.zoom;
      cam.cx = target.cx;
      cam.cy = target.cy;
      slider.value = (5000 * Math.log(cam.zoom / fitZoom)) / Math.log(maxZoom / fitZoom);
      draw();
    } else {
      startAnimation();
    }
  }

  function zoomAt(factor, px, py) {
    const curZ = target.zoom;
    const newZ = Math.min(maxZoom, Math.max(fitZoom, curZ * factor));
    const wx = target.cx + (px - W / 2) / curZ;
    const wy = target.cy + (py - H / 2) / curZ;
    setCam(newZ, wx - (px - W / 2) / newZ, wy - (py - H / 2) / newZ, false);
  }

  function resize() {
    if (!canvas.clientWidth) return;
    L = getL();
    const ratio = cam.zoom / fitZoom;
    W = canvas.clientWidth; H = canvas.clientHeight; dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);

    fitZoom = Math.min(W / L.worldW, H / L.worldH) * 0.98;
    maxZoom = Math.max(Math.min(W / L.itemW, H / L.itemH) * 4, fitZoom * 5);
    setCam(fitZoom * ratio, cam.cx, cam.cy, true);
  }

  // Average colour of the sprite, used when too many units are on screen to draw one by one
  let avg = null;
  function avgColor() {
    const src = sprite.thumb || sprite.image;
    if (!src) return "#6b5a3e";
    if (avg) return avg;
    try {
      const c = document.createElement("canvas");
      c.width = c.height = 1;
      const x = c.getContext("2d");
      x.drawImage(src, 0, 0, 1, 1);
      const d = x.getImageData(0, 0, 1, 1).data;
      avg = `rgb(${d[0]},${d[1]},${d[2]})`;
    } catch (e) { avg = "#6b5a3e"; }
    return avg;
  }

  // White sheet + grid lines. Lines are spaced so they stay readable; the legend says how many units each box holds.
  function drawGridRegion(ox, oy, cw, ch, ca, cb, ra, rb, kc, kr) {
    const x0 = ox + ca * cw, y0 = oy + ra * ch, x1 = ox + (cb + 1) * cw, y1 = oy + (rb + 1) * ch;
    ctx.fillStyle = GRID_FILL;
    ctx.fillRect(x0, y0, x1 - x0, y1 - y0);
    ctx.strokeStyle = "rgba(70, 52, 28, 0.6)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let c = Math.ceil(ca / kc) * kc; c <= cb + 1; c += kc) {
      const x = Math.round(ox + c * cw) + 0.5;
      ctx.moveTo(x, y0); ctx.lineTo(x, y1);
    }
    for (let r = Math.ceil(ra / kr) * kr; r <= rb + 1; r += kr) {
      const y = Math.round(oy + r * ch) + 0.5;
      ctx.moveTo(x0, y); ctx.lineTo(x1, y);
    }
    ctx.stroke();
  }

  function drawGridOverview(ox, oy, cw, ch, c0, c1, r0, r1) {
    const kc = GRID_BOX_SIDE;
    const kr = GRID_BOX_SIDE;
    const fullRows = Math.floor(renderCount / L.cols);
    const lastRowCols = renderCount % L.cols;
    const fr1 = Math.min(r1, fullRows - 1);
    if (fr1 >= r0) drawGridRegion(ox, oy, cw, ch, c0, c1, r0, fr1, kc, kr);
    if (lastRowCols && r0 <= fullRows && r1 >= fullRows) {
      const pc1 = Math.min(c1, lastRowCols - 1);
      if (pc1 >= c0) drawGridRegion(ox, oy, cw, ch, c0, pc1, fullRows, fullRows, kc, kr);
    }
    const perBox = kc * kr;
    const label = `${formatCount(stack.count)} units total \u2022 each box = ${formatCount(perBox)} units`;
    ctx.font = "600 14px 'Courier New', monospace";
    const tw = ctx.measureText(label).width;
    ctx.fillStyle = "rgba(243, 238, 224, 0.92)";
    ctx.fillRect(8, H - 32, tw + 16, 24);
    ctx.fillStyle = "#2c1e10";
    ctx.fillText(label, 16, H - 15);
  }

  // Fallback: fills the visible part of the grid with solid blocks (a few fillRects, not thousands of sprites)
  function drawBlocks(ox, oy, cw, ch, c0, c1, r0, r1) {
    ctx.fillStyle = avgColor();
    const fullRows = Math.floor(renderCount / L.cols);
    const lastRowCols = renderCount % L.cols;
    const fr1 = Math.min(r1, fullRows - 1);
    if (fr1 >= r0) ctx.fillRect(ox + c0 * cw, oy + r0 * ch, (c1 - c0 + 1) * cw, (fr1 - r0 + 1) * ch);
    if (lastRowCols && r0 <= fullRows && r1 >= fullRows) {
      const pc1 = Math.min(c1, lastRowCols - 1);
      if (pc1 >= c0) ctx.fillRect(ox + c0 * cw, oy + fullRows * ch, (pc1 - c0 + 1) * cw, ch);
    }
  }

  function draw() {
    if (!W) return;
    L = getL();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = photoBackground(sprite);
    ctx.fillRect(0, 0, W, H);

    const z = cam.zoom, ox = W / 2 - cam.cx * z, oy = H / 2 - cam.cy * z;
    const cw = L.cellW * z, ch = L.cellH * z, iw = L.itemW * z, ih = L.itemH * z;
    const rel = z / fitZoom;
    readout.textContent = `${rel < 10 ? rel.toFixed(1) : Math.round(rel)}x zoom`;

    const c0 = Math.max(0, Math.floor(-ox / cw)), c1 = Math.min(L.cols - 1, Math.floor((W - ox) / cw));
    const r0 = Math.max(0, Math.floor(-oy / ch)), r1 = Math.min(L.rows - 1, Math.floor((H - oy) / ch));
    if (c1 < c0 || r1 < r0) return;

    if (GRID_OVERVIEW_IDS.has(medium.id) && Math.min(iw, ih) < OVERVIEW_MIN_PX) {
      drawGridOverview(ox, oy, cw, ch, c0, c1, r0, r1);
      return;
    }

    // Never draw more than stack.maxRender individual sprites per frame
    if ((c1 - c0 + 1) * (r1 - r0 + 1) > stack.maxRender) {
      drawBlocks(ox, oy, cw, ch, c0, c1, r0, r1);
      return;
    }

    const imgSource = (iw >= 28 && sprite.image) ? sprite.image : (sprite.thumb || sprite.image);

    if (imgSource) {
      for (let r = r0; r <= r1; r++) {
        for (let c = c0; c <= c1; c++) {
          const i = r * L.cols + c;
          if (i >= renderCount) break;
          ctx.drawImage(imgSource, ox + c * cw, oy + r * ch, iw, ih);
        }
      }
    } else {
      ctx.fillStyle = "#6b5a3e";
      for (let r = r0; r <= r1; r++) {
        for (let c = c0; c <= c1; c++) {
          const i = r * L.cols + c;
          if (i >= renderCount) break;
          ctx.fillRect(ox + c * cw, oy + r * ch, iw, ih);
        }
      }
    }
  }

  let drag = null;
  canvas.addEventListener("pointerdown", (e) => {
    canvas.setPointerCapture(e.pointerId);
    drag = { x: e.clientX, y: e.clientY, cx: cam.cx, cy: cam.cy };
    canvas.classList.add("grabbing");
  });
  canvas.addEventListener("pointermove", (e) => {
    if (drag) setCam(cam.zoom, drag.cx - (e.clientX - drag.x) / cam.zoom, drag.cy - (e.clientY - drag.y) / cam.zoom, true);
  });
  const endDrag = () => { drag = null; canvas.classList.remove("grabbing"); };
  canvas.addEventListener("pointerup", endDrag);
  canvas.addEventListener("pointercancel", endDrag);

  canvas.addEventListener("wheel", (e) => {
    if (!e.ctrlKey && !e.metaKey) return;
    e.preventDefault();
    const r = canvas.getBoundingClientRect();
    zoomAt(Math.exp(-e.deltaY * 0.002), e.clientX - r.left, e.clientY - r.top);
  }, { passive: false });

  canvas.addEventListener("dblclick", (e) => {
    const r = canvas.getBoundingClientRect();
    zoomAt(2.2, e.clientX - r.left, e.clientY - r.top);
  });

  slider.addEventListener("input", () => {
    setCam(fitZoom * Math.pow(maxZoom / fitZoom, slider.value / 5000), target.cx, target.cy, false);
  });

  controls.addEventListener("click", (e) => {
    const act = e.target.dataset.act;
    if (act === "in") zoomAt(1.8, W / 2, H / 2);
    if (act === "out") zoomAt(0.55, W / 2, H / 2);
    if (act === "fit") setCam(fitZoom, L.worldW / 2, L.worldH / 2, false);
  });

  const ro = new ResizeObserver(resize);
  ro.observe(canvas);

  const onSprite = () => { resize(); draw(); };
  document.addEventListener("sprite-ready", onSprite);

  return {
    root,
    destroy() {
      ro.disconnect();
      document.removeEventListener("sprite-ready", onSprite);
    }
  };
}

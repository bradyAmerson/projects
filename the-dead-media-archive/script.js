// script.js
let selectedItem = PRESETS[0];
let currentStageIndex = 0;
let currentViewer = null;
let activeStacks = [];
let drawerOpen = false; // the spec drawer stays open or shut as you move between devices

const viewLanding = document.querySelector("#view-landing");
const viewTimeline = document.querySelector("#view-timeline");
const fileInput = document.querySelector("#file-input");
const presetList = document.querySelector("#preset-list");
const preview = document.querySelector("#preview");
const btnEnterTimeline = document.querySelector("#btn-enter-timeline");
const btnBackMenu = document.querySelector("#btn-back-menu");
const btnBackProjects = document.querySelector("#btn-back-projects");
// Where "Back to Projects" leads. Same relative path the asteroids game uses.
const PROJECTS_URL = "../index.html";
const timelineScrubber = document.querySelector("#timeline-scrubber");
const stageContent = document.querySelector("#stage-content");
const btnPrevStage = document.querySelector("#btn-prev-stage");
const btnNextStage = document.querySelector("#btn-next-stage");
const currentFileBadge = document.querySelector("#current-file-badge");
const timelineCounter = document.querySelector("#timeline-counter");

const iris = document.querySelector("#iris");
const irisHole = iris.querySelector(".iris-hole");
const irisTitle = document.querySelector("#iris-title");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let transitioning = false;
let prevIndex = null;

// Silent-film iris: circle closes to black, view swaps, circle opens again
function irisAnim(closing) {
  const open = { width: "300vmax", height: "300vmax" };
  const shut = { width: "0px", height: "0px" };
  return irisHole.animate(closing ? [open, shut] : [shut, open], {
    duration: closing ? 650 : 850,
    easing: closing ? "cubic-bezier(.4,0,.2,0)" : "cubic-bezier(.16,1,.3,1)",
    fill: "forwards"
  }).finished;
}

async function withIris(label, swap) {
  if (transitioning) return;
  transitioning = true;
  if (reduceMotion) { swap(); transitioning = false; return; }
  irisTitle.textContent = label;
  iris.classList.add("on");
  await irisAnim(true);
  irisTitle.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 250, fill: "forwards" });
  swap();
  await new Promise((r) => setTimeout(r, 650));
  await irisTitle.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 250, fill: "forwards" }).finished;
  await irisAnim(false);
  iris.classList.remove("on");
  transitioning = false;
}

// Leaving for another page: iris closes with the title showing, then the page changes.
// The next page reads these two keys and opens its own iris from black.
async function irisNavigate(label, url, destination) {
  if (transitioning) return;
  transitioning = true;
  if (reduceMotion) { window.location.href = url; return; }
  document.documentElement.classList.add("iris-leaving");
  irisTitle.textContent = label;
  iris.classList.add("on");
  await irisAnim(true);
  // Seal the screen: drop the scrollbar (the next page has none while the iris is shut) so the title doesn't shift
  document.documentElement.style.overflow = "hidden";
  irisTitle.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 250, fill: "forwards" });
  try {
    sessionStorage.setItem("irisTo", destination);
    sessionStorage.setItem("irisLabel", label);
  } catch (e) {}
  await new Promise((r) => setTimeout(r, 650));
  window.location.href = url;
}

// Arriving from another page (the projects hub): the iris is already shut, so hold on the title, then open
async function irisArrive() {
  const root = document.documentElement;
  if (!root.classList.contains("iris-arriving")) return;
  try { sessionStorage.removeItem("irisTo"); sessionStorage.removeItem("irisLabel"); } catch (e) {}
  if (reduceMotion) { root.classList.remove("iris-arriving"); return; }
  transitioning = true;
  iris.classList.add("on");
  await new Promise((r) => setTimeout(r, 650));
  await irisTitle.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 250, fill: "forwards" }).finished;
  await irisAnim(false);
  iris.classList.remove("on");
  root.classList.remove("iris-arriving");
  transitioning = false;
}

// The iris is its own transition, so skip the browser's page transition (its crossfade is the visible seam)
window.addEventListener("pageswap", (e) => {
  if (e.viewTransition && document.documentElement.classList.contains("iris-leaving")) e.viewTransition.skipTransition();
});
window.addEventListener("pagereveal", (e) => {
  if (e.viewTransition && document.documentElement.classList.contains("iris-arriving")) e.viewTransition.skipTransition();
});

// Back/forward cache can restore this page with the iris still shut
window.addEventListener("pageshow", (e) => {
  if (!e.persisted) return;
  iris.classList.remove("on");
  document.documentElement.style.overflow = "";
  document.documentElement.classList.remove("iris-arriving", "iris-leaving");
  transitioning = false;
});

// Button click sound (assets/audio/button.mp3). A small pool lets fast clicks overlap.
const BUTTON_SFX_PATH = "assets/audio/button.mp3";
const BUTTON_SFX_POOL = 4;
const buttonSfxPool = Array.from({ length: BUTTON_SFX_POOL }, () => {
  const a = new Audio(BUTTON_SFX_PATH);
  a.preload = "auto";
  return a;
});
let buttonSfxIndex = 0;

function playButtonSfx() {
  const a = buttonSfxPool[buttonSfxIndex];
  buttonSfxIndex = (buttonSfxIndex + 1) % BUTTON_SFX_POOL;
  a.currentTime = 0;
  a.play().catch(() => {});
}

// One listener covers every button, including ones created later (timeline nodes, zoom controls)
// Capture phase: runs before the button's own handler, so an arrow that disables itself on its last step still clicks
document.addEventListener("click", (e) => {
  const btn = e.target.closest("button, label.upload");
  if (!btn || btn.disabled) return;
  playButtonSfx();
}, true);

// Stops any audio or video playing in the landing preview (it stays playing while hidden otherwise)
function stopPreviewMedia() {
  preview.querySelectorAll("audio, video").forEach((m) => { m.pause(); m.currentTime = 0; });
}

// Rolls a number from one value to another; fmt receives the raw in-between value and returns the text
function tween(el, from, to, fmt, dur = 750) {
  if (!el) return;
  if (reduceMotion || from === to) { el.textContent = fmt(to); return; }
  const t0 = performance.now();
  (function step(now) {
    const p = Math.min(1, (now - t0) / dur);
    const e = 1 - Math.pow(1 - p, 4);
    el.textContent = fmt(from + (to - from) * e);
    if (p < 1) requestAnimationFrame(step);
  })(t0);
}

// Percent of one device that the file fills, written for a visitor to read
function fillPercent(exact) {
  const pct = exact * 100;
  if (pct < 0.0001) return "less than 0.0001";
  if (pct >= 10) return Math.round(pct).toLocaleString();
  if (pct >= 0.1) return pct.toFixed(1);
  return String(Number(pct.toPrecision(2)));
}

function kindFromMime(mime) {
  if (mime.startsWith("image/")) return "image";
  if (mime.startsWith("video/")) return "video";
  if (mime.startsWith("audio/")) return "audio";
  return null;
}

function showPreview(item) {
  stopPreviewMedia();
  preview.innerHTML = "";
  const box = document.createElement("div");
  box.className = "preview-box";
  const el = document.createElement(item.kind === "image" ? "img" : item.kind);
  el.src = item.src;
  if (item.kind === "image") el.alt = item.title;
  else el.controls = true;
  const meta = document.createElement("div");
  meta.className = "preview-meta";
  meta.innerHTML = `<strong>${item.title}</strong> <span class="size-tag">${formatBytes(item.bytes)}</span>`;
  box.append(el, meta);
  preview.append(box);
}

function selectItem(item) {
  selectedItem = item;
  showPreview(item);
  document.querySelectorAll("#preset-list button").forEach(b => b.classList.remove("selected"));
  const btn = document.querySelector(`#preset-list button[data-id="${item.id}"]`);
  if (btn) btn.classList.add("selected");
}

PRESETS.forEach((preset) => {
  const button = document.createElement("button");
  button.dataset.id = preset.id;
  button.innerHTML = `${preset.title} <small style="opacity:.6">(${formatBytes(preset.bytes)})</small>`;
  button.addEventListener("click", () => selectItem(preset));
  presetList.append(button);
});

fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (!file) return;
  const kind = kindFromMime(file.type);
  if (!kind) { alert("Unsupported file type."); return; }
  selectItem({ id: "upload", title: file.name, kind, src: URL.createObjectURL(file), bytes: file.size });
});

// Short names for the timeline buttons, so every button keeps its original size
const TIMELINE_NAMES = {
  "punchcard": "Card",
  "magnetic-drum": "Drum",
  "paper-tape": "Tape",
  "mercury-delay": "Hg",
  "williams-tube": "CRT",
  "core-memory": "Core",
  "magnetic-tape": "UNIV",
  "harddrive": "IBM",
  "floppy": "Flop",
  "cdr": "CD-R",
  "zip": "Zip",
  "dvd": "DVD",
  "usb": "USB",
  "microsd": "SD",
  "ssd": "SSD",
};

function buildTimelineScrubber() {
  timelineScrubber.innerHTML = "";
  activeStacks = stacksForFile(selectedItem.bytes);
  activeStacks.forEach((stack, idx) => {
    const btn = document.createElement("button");
    btn.className = `time-node ${idx === currentStageIndex ? "active" : ""}`;
    const shortName = TIMELINE_NAMES[stack.medium.id] || stack.medium.name.split(" (")[0];
    btn.innerHTML = `<span class="tn-year">${stack.medium.year}</span><span class="tn-name">${shortName}</span>`;
    btn.title = stack.medium.name;
    btn.addEventListener("click", () => goToStage(idx));
    timelineScrubber.append(btn);
  });
}

// Spec-sheet drawer. The tray sits above the front panel, so opening it pushes the panel down,
// like pulling a drawer by its knob. Click toggles; dragging the panel down or up follows the pointer.
function setupDrawer(root) {
  const drawer = root.querySelector(".drawer");
  const front = drawer.querySelector(".drawer-front");
  const tray = drawer.querySelector(".drawer-tray");
  const inner = drawer.querySelector(".drawer-tray-inner");
  let dragging = false, moved = false, suppressClick = false, startY = 0, startH = 0;

  const fullH = () => inner.scrollHeight;

  function setOpen(open, animate = true) {
    drawerOpen = open;
    drawer.classList.toggle("open", open);
    front.setAttribute("aria-expanded", String(open));
    tray.style.transition = animate && !reduceMotion ? "" : "none";
    tray.style.height = open ? fullH() + "px" : "0px";
  }

  front.addEventListener("click", () => {
    if (suppressClick) { suppressClick = false; return; }
    setOpen(!drawerOpen);
  });

  front.addEventListener("pointerdown", (e) => {
    if (e.button !== 0) return;
    front.setPointerCapture(e.pointerId);
    dragging = true; moved = false; suppressClick = false;
    startY = e.clientY;
    startH = tray.getBoundingClientRect().height;
  });

  front.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    const dy = e.clientY - startY;
    if (!moved && Math.abs(dy) < 5) return;
    moved = true;
    drawer.classList.add("pulling");
    tray.style.transition = "none";
    tray.style.height = Math.min(fullH(), Math.max(0, startH + dy)) + "px";
  });

  function release() {
    if (!dragging) return;
    dragging = false;
    drawer.classList.remove("pulling");
    if (!moved) return;
    suppressClick = true;
    setOpen(tray.getBoundingClientRect().height > fullH() * 0.4);
  }
  front.addEventListener("pointerup", release);
  front.addEventListener("pointercancel", release);

  // Keep an open tray the right height if the card is resized
  new ResizeObserver(() => {
    if (drawerOpen && !dragging) { tray.style.transition = "none"; tray.style.height = fullH() + "px"; }
  }).observe(inner);

  // Call once the card is in the page (it can't be measured before that)
  return { sync: () => setOpen(drawerOpen, false) };
}

function renderCurrentStage(dir = 0) {
  if (currentViewer) currentViewer.destroy();
  stageContent.querySelectorAll(".stop-card.leaving").forEach((n) => n.remove());
  const oldCard = stageContent.querySelector(".stop-card");

  const stack = activeStacks[currentStageIndex];
  const { medium } = stack;
  const sprite = getSprite(medium);
  const yearsAgo = new Date().getFullYear() - medium.year;
  const isLessThanOne = stack.exact < 1;

  const card = document.createElement("article");
  card.className = "stop-card";

  const comparison = STORAGE_CONSTANTS[medium.id] || { title: "Physical Scale", calc: () => "" };
  const compText = comparison.calc(stack, selectedItem.bytes);

  const metaPane = document.createElement("div");
  metaPane.className = "stop-meta";
  metaPane.innerHTML = `
    <div class="index-card">
      <span class="ic-pin" aria-hidden="true"></span>
      <div class="ic-cat">No. ${String(currentStageIndex + 1).padStart(2, "0")} / ${String(activeStacks.length).padStart(2, "0")}</div>
      ${medium.img ? `<img class="device-thumb" src="${medium.img}" alt="${medium.name}" onerror="this.style.display='none'">` : ""}
      <div class="ic-text">
        <h2>${medium.name}</h2>
        <div class="ic-filed">Filed ${medium.year}</div>
      </div>
    </div>

    <div class="hero-stats">
      <div class="stat-badge count-badge">
        <span class="stat-num${stack.count === 1 ? " stat-sentence" : ""}" data-role="count">${stack.count === 1 ? `Your file fills ${fillPercent(stack.exact)}% of one device` : formatCount(stack.count)}</span>
        <span class="stat-lbl">${stack.count === 1 ? "" : "devices needed for your file"}</span>
      </div>
      <div class="stat-badge year-badge">
        <span class="stat-num" data-role="year">${medium.year}</span>
        <span class="stat-lbl" data-role="ago">${yearsAgo} YEARS AGO</span>
      </div>
      ${medium.priceUsd != null ? `
      <div class="stat-badge price-tag">
        <span class="stat-lbl price-kicker">PRICE TAG &middot; WHAT YOU&rsquo;D PAY FOR THE DEVICES</span>
        <span class="stat-num" data-role="price">${formatMoney(stack.count * medium.priceUsd)}</span>
        <span class="price-sub">${formatCount(stack.count)} &times; ${formatUnitPrice(medium.priceUsd)} each &middot; ${medium.priceNote}</span>
      </div>` : ""}
    </div>

    <div class="comparison-card">
      <span class="comp-badge">Physical Equivalent</span>
      <div class="comp-title">${comparison.title}</div>
      <div class="comp-text">${compText}</div>
    </div>

    ${stack.isCapped ? `
      <div class="cap-notice">
        <strong>A crowded hall.</strong> ${formatCount(stack.count)} units are laid out in full, but only ${formatCount(stack.maxRender)} can be drawn at once. Drag to travel the stacks and zoom in to see each unit; zoomed far out they blend into one solid block.
      </div>
    ` : ""}

    <div class="drawer${drawerOpen ? " open" : ""}">
      <div class="drawer-tray"><div class="drawer-tray-inner">
        <div class="summary-card">
          <div class="summary-row fact"><span class="summary-lbl">Physical Size</span>${medium.size}</div>
          <div class="summary-row fact"><span class="summary-lbl">Original Maker</span>${medium.maker}</div>
          <div class="summary-row full fact"><span class="summary-lbl">Technology</span>${medium.howItWorked}</div>
          <div class="summary-row full"><a href="${medium.sourceUrl}" target="_blank" rel="noopener">Wikipedia details &rarr;</a></div>
        </div>
      </div></div>
      <button type="button" class="drawer-front" aria-expanded="${drawerOpen}">
        <span class="drawer-plate">Spec Sheet</span>
        <span class="drawer-knob" aria-hidden="true"></span>
      </button>
    </div>
  `;

  const drawer = setupDrawer(metaPane);

  const viewerPane = document.createElement("div");
  viewerPane.className = "viewer-pane";

  currentViewer = createViewer(stack, () => layoutFor(stack, sprite));
  viewerPane.append(currentViewer.root);

  card.append(metaPane, viewerPane);

  const animate = dir !== 0 && !reduceMotion;
  const slide = { duration: 650, easing: "cubic-bezier(.65,0,.35,1)" };
  if (oldCard) {
    if (animate) {
      oldCard.style.cssText = `position:absolute;top:${oldCard.offsetTop}px;left:${oldCard.offsetLeft}px;width:${oldCard.offsetWidth}px;pointer-events:none`;
      oldCard.classList.add("leaving");
      oldCard.animate(
        [{ transform: "translateX(0)" }, { transform: `translateX(${-dir * 105}%)` }],
        { ...slide, fill: "forwards" }
      ).onfinish = () => oldCard.remove();
    } else {
      oldCard.remove();
    }
  }
  stageContent.append(card);
  drawer.sync();

  // Numbers roll up as the card arrives; the year counts from the previous stop (or from today on the first one)
  const thisYear = new Date().getFullYear();
  const fromYear = prevIndex !== null && activeStacks[prevIndex] ? activeStacks[prevIndex].medium.year : thisYear;
  const countEl = card.querySelector('[data-role="count"]');
  if (stack.count === 1) {
    tween(countEl, 0, stack.exact, (v) => `Your file fills ${fillPercent(v)}% of one device`, 900);
  } else {
    tween(countEl, 0, stack.count, (v) => formatCount(Math.round(v)), 900);
  }
  if (medium.priceUsd != null) tween(card.querySelector('[data-role="price"]'), 0, stack.count * medium.priceUsd, formatMoney, 900);
  tween(card.querySelector('[data-role="year"]'), fromYear, medium.year, (v) => String(Math.round(v)), 900);
  tween(card.querySelector('[data-role="ago"]'), thisYear - fromYear, yearsAgo, (v) => `${Math.round(v)} YEARS AGO`, 900);
  if (animate) {
    card.animate(
      [{ transform: `translateX(${dir * 105}%)` }, { transform: "translateX(0)" }],
      slide
    );
  }

  btnPrevStage.disabled = currentStageIndex <= 0;
  btnNextStage.disabled = currentStageIndex >= activeStacks.length - 1;
  timelineCounter.textContent = `${currentStageIndex + 1} of ${activeStacks.length}`;

  document.querySelectorAll(".time-node").forEach((n, i) => {
    n.classList.toggle("active", i === currentStageIndex);
  });

  const activeNode = timelineScrubber.children[currentStageIndex];
  if (activeNode) activeNode.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
}

function goToStage(idx) {
  if (idx < 0 || idx >= activeStacks.length) return;
  if (idx === currentStageIndex) return;
  const dir = idx > currentStageIndex ? 1 : -1;
  prevIndex = currentStageIndex;
  currentStageIndex = idx;
  renderCurrentStage(dir);
}

btnEnterTimeline.addEventListener("click", () => {
  stopPreviewMedia();
  withIris("Entering the Archive", () => {
    buildTimelineScrubber();
    currentFileBadge.textContent = `${selectedItem.title} (${formatBytes(selectedItem.bytes)})`;
    currentStageIndex = 0;
    prevIndex = null;
    viewLanding.classList.remove("active");
    viewTimeline.classList.add("active");
    renderCurrentStage();
  });
});

btnBackProjects.addEventListener("click", () => {
  stopPreviewMedia();
  irisNavigate("Leaving the Filing Cabinet", PROJECTS_URL, "hub");
});

btnBackMenu.addEventListener("click", () => {
  withIris("Leaving the Archive", () => {
    if (currentViewer) currentViewer.destroy();
    viewTimeline.classList.remove("active");
    viewLanding.classList.add("active");
  });
});

btnPrevStage.addEventListener("click", () => goToStage(currentStageIndex - 1));
btnNextStage.addEventListener("click", () => goToStage(currentStageIndex + 1));

window.addEventListener("keydown", (e) => {
  if (!viewTimeline.classList.contains("active")) return;
  // Esc returns to the file menu, the same as "Change File"
  if (e.key === "Escape") { btnBackMenu.click(); return; }
  if (e.key === "ArrowLeft") goToStage(currentStageIndex - 1);
  if (e.key === "ArrowRight") goToStage(currentStageIndex + 1);
});

selectItem(PRESETS[0]);

irisArrive();

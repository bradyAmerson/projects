// sprites.js

const spriteCache = {};

// Creates a downscaled offscreen canvas thumbnail for smooth rendering of thousands of items
function createThumbnail(image, targetSize = 48) {
  const nw = image.naturalWidth || 64;
  const nh = image.naturalHeight || 64;
  const scale = targetSize / Math.max(nw, nh);
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(nw * scale));
  canvas.height = Math.max(1, Math.round(nh * scale));
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingQuality = "medium";
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  return canvas;
}

function getSprite(medium) {
  if (spriteCache[medium.id]) return spriteCache[medium.id];

  const sprite = {
    image: null,
    thumb: null,
    loaded: false,
    aspect: medium.widthMm / medium.heightMm
  };

  if (medium.img) {
    const img = new Image();
    img.onload = () => {
      sprite.image = img;
      sprite.thumb = createThumbnail(img, 48);
      sprite.loaded = true;
      if (img.naturalWidth && img.naturalHeight) {
        sprite.aspect = img.naturalWidth / img.naturalHeight;
      }
      document.dispatchEvent(new Event("sprite-ready"));
    };
    img.src = medium.img;

    if (img.complete && img.naturalWidth) {
      sprite.image = img;
      sprite.thumb = createThumbnail(img, 48);
      sprite.loaded = true;
      sprite.aspect = img.naturalWidth / img.naturalHeight;
    }
  }

  return (spriteCache[medium.id] = sprite);
}

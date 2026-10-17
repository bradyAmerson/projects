const CONFIG = {
  // Ship
  shipSize: 25,
  shipRotationSpeed: 0.035,
  shipThrust: 0.03,
  shipReverseThrust: 0.019,
  shipMaxSpeed: 5,
  shipFriction:0.995,
  shipLives: 3,
  shipInvincibleDuration: 365,
  
  // Weapons
  fireRate: 40,
  bulletSpeed: 8,
  bulletDamage: 10,
  bulletSize: 6,
  bulletFadeDuration: 1,
  bulletTrailLength: 18,
  bulletTrailSpacing: 0.5,
  bulletTrailAlpha: 0.5,
  bulletGlowBlur: 30,
  bulletTrailGlowBlur: 14,

  // Triple
  tripleShotSpread: 0.06,
  tripleSize: 60,
  tripleSpeed: 1.5,
  tripleDuration: 1300,
  tripleBlinkingDuration: 500,
  tripleSpawnScore: 6600, //6600
  tripleSpawnScoreIncrease: 5000,
  tripleFireDuration: 1100,

  // Rapid
  rapidFireDuration: 600,
  rapidFireRate: 7,
  rapidSize: 60,
  rapidSpeed: 1.5,
  rapidDuration: 1300,
  rapidBlinkingDuration: 500,
  rapidSpawnScore: 3300, //3300
  rapidSpawnScoreIncrease: 5000,
  rapidLaserSoundGap: 10,
  
  allThreePowerupsScore: 25000,
  allThreePowerupsScoreIncrease: 25000,
  
  // Asteroids
  asteroidSpawnRate: 150,
  asteroidSpeedMin: .4,
  asteroidSpeedMax: 1.5,
  asteroidLargeSize: 100,
  asteroidMediumSize: 75,
  asteroidSmallSize: 30,
  asteroidDensity: 200000,
  asteroidSizeWeights: { large: 6, medium: 3, small: 1 },
  asteroidHitboxScale: 0.875,
  asteroidSplitSpeedMultiplier: 1.2,
  asteroidSplitSpreadAngle: 1,
  asteroidGlowColor: "#000000",
  asteroidGlowBlur: 9,
  
  // Audio
  sfxVolume: 0.5,
  musicVolume: 0.5,
  menuVolume: .2,
  menuSfxVolume: 0.5,
  engineFadeOutSpeed: 0.0069,
  sfxPoolSize: 9,
  ufoGameOverVolume: 0.2,
  ufoSoundVolume: 0.85,
  musicGameOverVolume: 0.18,
  musicFadeSpeed: 0.003,
  musicCrossfadeSpeed: 0.02,

  // Color
  backgroundColor: "#080011",
  glowBlur: 20,
  shipGlowColor: "#66d1de",
  bulletGlowColor: "#66d1de",
  ufoGlowColor: "#ff3333",
  ufoBulletGlowColor: "#ff3333",

  // Effects
  trailParticleLifetime: 37,
  trailParticleSize: 6,
  trailStartColor: { r: 255, g: 255, b: 255},
  trailEndColor: { r: 0, g: 120, b: 255},
  trailColorFadePower: 2.5,
  explosionSize: 100,
  explosionDuration: 150,
  asteroidExplosionScale: { large: 0.5, medium: 0.5, small: 0.5 },
  asteroidExplosionDuration: 60,
  debrisCount: { large: 6, medium: 5, small: 5 },
  debrisSpeedMin: 0.8,
  debrisSpeedMax: 2,
  debrisSizeMin: 0.045,
  debrisSizeMax: 0.28,
  debrisLifetime: 90,
  debrisSpin: 0.05,
  debrisFriction: 0.98,
  debrisStartAlpha: 0.8,

  // Heart
  heartSize: 60,
  heartSpeed: 1.5,
  heartDuration: 1300,
  heartBlinkingDuration: 500,
  heartSpawnScoreAmount: 5000, // 5000
  heartSpawnScoreIncrease: 5000,

  // UFO
  ufoSize: 80,
  ufoSpeed: 1.3,
  ufoSpawnDelay: 5000,
  ufoRespawnDelay: 3000,
  ufoTurnMin: 70,
  ufoTurnMax: 350,
  ufoFireRate: 250,
  ufoDoubleShotAfter: 2000,
  ufoDoubleShotSpread: 0.18,
  ufoBulletSpeed: 3,
  ufoBulletSize: 9,
  ufoPoints: 500,
  ufoMaxTurnAngle: Math.PI / 2.5,

  // stars
  starDensity: 6500,
  starMinSize: 0.6,
  starMaxSize: 1.5,
  starMinAlpha: 0.15,
  starMaxAlpha: 1,
  starTwinkleSpeedMin: 0.0008,
  starTwinkleSpeedMax: 0.002,
  starGlowChance: 0.25,
  starColors: [
  "#b777ff",
  "#3b99ff",
  "#50b1ff",
  "#70b1ff",
  "#9bb0ff", 
  "#9bb0ff",
  "#aabfff",
  "#aabfff",
  "#aabfff",
  "#cad7ff", 
  "#cad7ff", 
  "#cad7ff",
  "#f8f7ff",
  "#f8f7ff",
  "#f8f7ff",
  "#aabfff",
  "#e6d4ff",
  "#fff1c9",
  "#ffd2a1",
  "#ffffff", 
  "#cfe3ff",
  ]
  };

const DEFAULT_CONFIG = { ...CONFIG };

const IMAGES = {};
const ASSET_PATHS = {
  ship: "assets/ship.png",
  bulletImg: "assets/bullet.png",
  asteroidLarge: "assets/asteroid-large.png",
  asteroidMedium: "assets/asteroid-medium.png",
  asteroidSmall: "assets/asteroid-small.png",
  explosion: "assets/explosion.png",
  heart: "assets/heart.png",
  tripleFireImage: "assets/tripleFire.png",
  rapidFireImage: "assets/rapidFire.png",
  ufoImage: "assets/ufoImage.png",
  ufoBulletImage: "assets/ufoBullet.png",
};

const engineSound = new Audio("assets/audio/engine.mp3");
engineSound.loop = true;
engineSound.volume = 0;
let engineVolume = 0;
let wasThrusting = false;
let autoplayTried = false;
let currentMusicVolume = 0;
let menuMusicVolume = 0;

const SFX_PATHS = {
  laser: "assets/audio/laserShoot.wav",
  asteroidExplosion: "assets/audio/asteroidExplosion.wav",
  shipExplosion: "assets/audio/explosion.mp3",
  powerUp: "assets/audio/powerUp.wav",
  powerUpActivate: "assets/audio/powerUpActivateMoreLouder.wav",
  asteroidHit: "assets/audio/asteroidHit.wav",
  ufoShot: "assets/audio/ufoShot.wav",
  menu: "assets/audio/menu.mp3"
}

const LOOP_PATHS = {
  ufoSound: "assets/audio/ufo.wav",
  gameMusic: "assets/audio/gameMusic.wav",
  menuMusic: "assets/audio/menuMusic.mp3",
};

const SFX = {};
const LOOPS = {};
const sfxIndex = {};

function loadSounds() {
  for (const key in SFX_PATHS)  {
    SFX[key] = [];
    sfxIndex[key] = 0;

    for (let i = 0; i < CONFIG.sfxPoolSize; i++)  {
      const audio = new Audio(SFX_PATHS[key]);
      audio.preload = "auto";
      if (i === 0)  {
        audio.onerror = () => console.error("failed to load sound:", SFX_PATHS[key]);
      }
      SFX[key].push(audio);
    }
  }

  for (const key in LOOP_PATHS) {
    const audio = new Audio(LOOP_PATHS[key]);
    audio.preload = "auto";
    audio.loop = true;
    audio.onerror = () => console.error("failed to load:", LOOP_PATHS[key]);
    LOOPS[key] = audio;
  }
}

let audioUnlocked = false;

function unlockAudio() {
  if (audioUnlocked) return;
  audioUnlocked = true;
  updateMusic();
}

window.addEventListener("keydown", unlockAudio);
window.addEventListener("mousedown", unlockAudio);

function playSFX(name, volumeScale = 1) {
  const pool = SFX[name];
  const audio = pool[sfxIndex[name]];
  sfxIndex[name] = (sfxIndex[name] + 1) % pool.length;

  audio.currentTime = 0;
  audio.volume = Math.min(1, CONFIG.sfxVolume * volumeScale);
  audio.play().catch(() => {});
}  

// Minimum time (ms) between menu sounds. Raise it for a slower tick, lower it for a faster one.
const MENU_SFX_MIN_GAP_MS = 70;
let lastMenuSfxTime = 0;

function playMenuSFX() {
  const pool = SFX.menu;
  if (!pool) return;

  // rate cap: if the last menu sound was too recent, skip this one
  const now = performance.now();
  if (now - lastMenuSfxTime < MENU_SFX_MIN_GAP_MS) return;
  lastMenuSfxTime = now;

  const audio = pool[sfxIndex.menu];
  sfxIndex.menu = (sfxIndex.menu + 1) % pool.length;

  audio.currentTime = 0;
  audio.volume = Math.min(1, CONFIG.menuSfxVolume);
  audio.play().catch(() => {});
}

loadSounds();

let imagesLoaded = 0;
const totalImages = Object.keys(ASSET_PATHS).length;

function loadImages(callback) {
  for (const key in ASSET_PATHS)  {
    const img = new Image();

    img.onload = () => {
      imagesLoaded++;
      if (imagesLoaded === totalImages) {
        callback();
      }
    };

    img.onerror = () => {
      console.error("failed to load image:", ASSET_PATHS[key]);
    }

    img.src = ASSET_PATHS[key];
    
    IMAGES[key] = img;
  }
}

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const ship = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  velocityX: 0,
  velocityY: 0,
  angle: -Math.PI /2
};

const particles = [];
const stars = [];
const bullets = [];
const ufoBullets = [];
const debris = [];

let laserSoundTimer = 0;
let ufo = null;
let ufoSpawnTimer = CONFIG.ufoSpawnDelay;
let fireCooldown = 0;
let rapidSpawnScore = CONFIG.rapidSpawnScore;
let tripleSpawnScore = CONFIG.tripleSpawnScore;
let allThreePowerupsScore = CONFIG.allThreePowerupsScore;
let tripleCounter = 0;
let rapidCounter = 0;
let rapidActive = false;
let tripleActive = false;
let rapidTimer = CONFIG.rapidDuration;
let tripleTimer = CONFIG.tripleDuration;
let rapidFireDuration = CONFIG.rapidFireDuration;
let tripleFireDuration = CONFIG.tripleFireDuration
let rapidBlinkingTimer = CONFIG.rapidBlinkingDuration;
let tripleBlinkingTimer = CONFIG.tripleBlinkingDuration;
let rapid = null;
let triple = null;
let reloadTimer = 0;
let lives = CONFIG.shipLives;
let invincibleTimer = 0;
let gameOver = false;
let score = 0;
let highScore = 0;
let respawnTimer = 0;
let isNewHighScore = false;
let heartSpawnScoreAmount = CONFIG.heartSpawnScoreAmount;
let heart = null;
let heartTimer = CONFIG.heartDuration;
let heartBlinkingTimer = CONFIG.heartBlinkingDuration; 
let heartIsBlinking = false;
let asteroidSpawnTimer = 0;
let gameState = "menu";
let settingsReturn = "menu";
let settingsTab = 0;
let selectedButton = 0;
let mouseX = 0;
let mouseY = 0;
let draggingSlider = null;
let hoverId = null;
let hoveredSliderSfxId = null;

const asteroids = [];

function createStars() {
  stars.length = 0;
  const count = Math.round((canvas.width * canvas.height) / CONFIG.starDensity);

  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random(),
      y: Math.random(),
      size: CONFIG.starMinSize + Math.random() * (CONFIG.starMaxSize - CONFIG.starMinSize),
      speed: CONFIG.starTwinkleSpeedMin + Math.random() * (CONFIG.starTwinkleSpeedMax - CONFIG.starTwinkleSpeedMin),
      phase: Math.random() * Math.PI * 2,
      color: CONFIG.starColors[Math.floor(Math.random() * CONFIG.starColors.length)],
      glow: Math.random() < CONFIG.starGlowChance,    
    });
  }
}

createStars();
window.addEventListener("resize", createStars);

function pickAsteroidSize() {
  const weights = CONFIG.asteroidSizeWeights;
  const total = weights.large + weights.medium + weights.small;
  let roll = Math.random() * total;

  if (roll < weights.large) return "large";
  roll -= weights.large

  if (roll < weights.medium) return "medium";
  return "small";
}

function getAsteroidPoints(size)  {
  if (size === "large") return 20;
  if (size === "medium") return 50;
  return 100;
}

function getAsteroidStats(size) {
  if (size === "large") return { radius: CONFIG.asteroidLargeSize, hp: 30};
  if (size === "medium") return { radius: CONFIG.asteroidMediumSize, hp: 20};
  return { radius: CONFIG.asteroidSmallSize, hp: 10};
}

function getSplitSize(size) {
  if (size === "large") return "medium";
  if (size === "medium") return "small";
  return null;
}

function spawnAsteroidAt(x, y, size, baseAngle, parentSpeed)  {
  const stats = getAsteroidStats(size);
  const angle = baseAngle + (Math.random() - 0.5) * CONFIG.asteroidSplitSpreadAngle;
  const speed = parentSpeed * CONFIG.asteroidSplitSpeedMultiplier;

  asteroids.push({
    x: x,
    y: y,
    velocityX: Math.cos(angle) * speed,
    velocityY: Math.sin(angle) * speed,
    size: size,
    radius: stats.radius,
    hp: stats.hp,
    rotation: Math.random() * Math.PI * 2,
  });
}

function spawnAsteroid()  {
  const size = pickAsteroidSize();
  const stats = getAsteroidStats(size);
  
  const edge = Math.floor(Math.random() * 4);
  let x, y;

  if (edge === 0) {
    x = Math.random() * canvas.width;
    y = - stats.radius;
  } else if (edge === 1)  {
    x = canvas.width + stats.radius;
    y = Math.random() * canvas.height;
  } else if (edge === 2) {
    x = Math.random() * canvas.width;
    y = canvas.height + stats.radius;
  } else {
    x = -stats.radius;
    y = Math.random() * canvas.height;
  }
  
  const angle = Math.random() * Math.PI * 2;
  const speed = CONFIG.asteroidSpeedMin + Math.random() * (CONFIG.asteroidSpeedMax - CONFIG.asteroidSpeedMin);

  asteroids.push({
    x: x,
    y: y,
    velocityX: Math.cos(angle) * speed,
    velocityY: Math.sin(angle) * speed,
    size: size,
    radius: stats.radius,
    hp: stats.hp,
    rotation: Math.random() * Math.PI * 2,
  });
}

function spawnTriple() {
  const edge = Math.floor(Math.random() * 4);
  let x, y;

  if (edge === 0) {
    x = Math.random() * canvas.width;
    y = -CONFIG.tripleSize;
  } else if (edge === 1) {
    x = canvas.width + CONFIG.tripleSize;
    y = Math.random() * canvas.height;
  } else if (edge === 2) {
    x = Math.random() * canvas.width;
    y = canvas.height + CONFIG.tripleSize;
  } else {
    x = -CONFIG.tripleSize;
    y = Math.random() * canvas.height;
  }

  const centerAngle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x);
  const angle = centerAngle + (Math.random() - 0.5) * (Math.PI / 6);
  const speed = CONFIG.tripleSpeed;

  triple = {
    x: x,
    y: y,
    velocityX: Math.cos(angle) * speed,
    velocityY: Math.sin(angle) * speed,
    radius: CONFIG.tripleSize / 2,
    hp: 1,
  };
}

function spawnHeart() {
  heartTimer = CONFIG.heartDuration;
  heartBlinkingTimer = CONFIG.heartBlinkingDuration;

  const edge = Math.floor(Math.random() * 4);
  let x, y;

  if (edge === 0) {
    x = Math.random() * canvas.width;
    y = -CONFIG.heartSize;
  } else if (edge === 1) {
    x = canvas.width + CONFIG.heartSize;
    y = Math.random() * canvas.height;
  } else if (edge === 2) {
    x = Math.random() * canvas.width;
    y = canvas.height + CONFIG.heartSize;
  } else {
    x = -CONFIG.heartSize;
    y = Math.random() * canvas.height;
  }

  const centerAngle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x);
  const angle = centerAngle + (Math.random() - 0.5) * (Math.PI / 6);
  const speed = CONFIG.heartSpeed;

  heart = {
    x: x,
    y: y,
    velocityX: Math.cos(angle) * speed,
    velocityY: Math.sin(angle) * speed,
    radius: CONFIG.heartSize / 2,
    hp: 1,
  };
}

function spawnRapid() {
  const edge = Math.floor(Math.random() * 4);
  let x, y;

  if (edge === 0) {
    x = Math.random() * canvas.width;
    y = -CONFIG.rapidSize;
  } else if (edge === 1) {
    x = canvas.width + CONFIG.rapidSize;
    y = Math.random() * canvas.height;
  } else if (edge === 2) {
    x = Math.random() * canvas.width;
    y = canvas.height + CONFIG.rapidSize;
  } else {
    x = -CONFIG.rapidSize;
    y = Math.random() * canvas.height;
  }

  const centerAngle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x);
  const angle = centerAngle + (Math.random() - 0.5) * (Math.PI / 6);
  const speed = CONFIG.rapidSpeed;

  rapid = {
    x: x,
    y: y,
    velocityX: Math.cos(angle) * speed,
    velocityY: Math.sin(angle) * speed,
    radius: CONFIG.rapidSize / 2,
    hp: 1,
  };
}

function spawnUfoBullet(angle)  {
  ufoBullets.push({
  x: ufo.x,
  y: ufo.y,
  velocityX: Math.cos(angle) * CONFIG.ufoBulletSpeed,
  velocityY: Math.sin(angle) * CONFIG.ufoBulletSpeed,
  angle: angle,
  age: 0,
  });
  playSFX("ufoShot");
}

function fireUfoBullets() {
  const aimAngle = Math.atan2(ship.y - ufo.y, ship.x - ufo.x);

  if (ufo.age >= CONFIG.ufoDoubleShotAfter) {
    spawnUfoBullet(aimAngle - CONFIG.ufoDoubleShotSpread);
    spawnUfoBullet(aimAngle + CONFIG.ufoDoubleShotSpread);
  } else {
    spawnUfoBullet(aimAngle);
  }
}

function updateUfo()  {
  if (!ufo) {
    ufoSpawnTimer--;
    if (ufoSpawnTimer <= 0 && !gameOver)  {
      spawnUfo();
    }
    return;
  }

  ufo.age++;
  ufo.turnTimer--;
  if (ufo.turnTimer <= 0) {
    turnUfo();
  }

  ufo.x += ufo.velocityX;
  ufo.y += ufo.velocityY;

  if (ufo.x < -ufo.radius) ufo.x = canvas.width + ufo.radius;
  if (ufo.x > canvas.width + ufo.radius) ufo.x = -ufo.radius;
  if (ufo.y < -ufo.radius) ufo.y = canvas.height + ufo.radius;
  if (ufo.y > canvas.height + ufo.radius) ufo.y = -ufo.radius;

  if (gameOver || respawnTimer > 0) return;

  ufo.fireTimer--;
  if (ufo.fireTimer <= 0) {
    fireUfoBullets();
    ufo.fireTimer = CONFIG.ufoFireRate;
  }
}

function updateUfoBullets() {
  for (let i = ufoBullets.length - 1; i >= 0; i--) {
    const b = ufoBullets[i];
    b.age++;
    b.x += b.velocityX;
    b.y += b.velocityY;

    if (b.x < 0 || b.x > canvas.width || b.y < 0 || b.y > canvas.height) {
      ufoBullets.splice(i, 1);
    }
  }
}

function updateDebris() {
  for (let i = debris.length - 1; i >= 0; i--) {
    const d = debris[i];
    d.velocityX *= CONFIG.debrisFriction;
    d.velocityY *= CONFIG.debrisFriction;
    d.x += d.velocityX;
    d.y += d.velocityY;
    d.rotation += d.spin;
    d.life--;

    if (d.life <= 0) {
      debris.splice(i, 1);
    }
  }
}

function setUfoDirection()  {
  const angle = Math.random() * Math.PI * 2;
  ufo.velocityX = Math.cos(angle) * CONFIG.ufoSpeed;
  ufo.velocityY = Math.sin(angle) * CONFIG.ufoSpeed;
  ufo.turnTimer = CONFIG.ufoTurnMin + Math.random() * (CONFIG.ufoTurnMax - CONFIG.ufoTurnMin);
}

function spawnUfo() {
  const radius = CONFIG.ufoSize / 2;
  const edge = Math.floor(Math.random() * 4);
  let x, y;

   if (edge === 0) {
    x = Math.random() * canvas.width;
    y = -radius;
  } else if (edge === 1) {
    x = canvas.width + radius;
    y = Math.random() * canvas.height;
  } else if (edge === 2) {
    x = Math.random() * canvas.width;
    y = canvas.height + radius;
  } else {
    x = -radius;
    y = Math.random() * canvas.height;
  }

  ufo = {
    x: x,
    y: y,
    velocityX: 0,
    velocityY: 0,
    radius: radius,
    age: 0,
    fireTimer: CONFIG.ufoFireRate,
    turnTimer: 0,
  };
  setUfoDirection();
}

function turnUfo() {
  const currentAngle = Math.atan2(ufo.velocityY, ufo.velocityX);
  const turn = (Math.random() - 0.5) * 2 * CONFIG.ufoMaxTurnAngle;
  const newAngle = currentAngle + turn;

  ufo.velocityX = Math.cos(newAngle) * CONFIG.ufoSpeed;
  ufo.velocityY = Math.sin(newAngle) * CONFIG.ufoSpeed;
  ufo.turnTimer = CONFIG.ufoTurnMin + Math.random() * (CONFIG.ufoTurnMax - CONFIG.ufoTurnMin);
}

function spawnBullet(sideOffset = 0, forwardOffset = CONFIG.shipSize, angleOffset = 0)  {
  const perpX = -Math.sin(ship.angle);
  const perpY = Math.cos(ship.angle);
  const bulletAngle = ship.angle + angleOffset;

  bullets.push({
    x: ship.x + Math.cos(ship.angle) * forwardOffset + perpX * sideOffset,
    y: ship.y + Math.sin(ship.angle) * forwardOffset + perpY * sideOffset,
    velocityX: Math.cos(bulletAngle) * CONFIG.bulletSpeed + ship.velocityX,
    velocityY: Math.sin(bulletAngle) * CONFIG.bulletSpeed + ship.velocityY,
    angle: bulletAngle,
    life: CONFIG.bulletFadeDuration,
    age: 0,
  })
}

function spawnTrailParticle() {
  const backX = ship.x - Math.cos(ship.angle) * CONFIG.shipSize;
  const backY = ship.y - Math.sin(ship.angle) * CONFIG.shipSize;
   
  particles.push({
    x: backX,
    y: backY,
    life: CONFIG.trailParticleLifetime,
  });
}

function checkPowerupSpawns() {
  if (score >= allThreePowerupsScore && !rapid && !triple && !heart) {
    spawnHeart();
    spawnRapid();
    spawnTriple();
    while (allThreePowerupsScore <= score) {
      allThreePowerupsScore += CONFIG.allThreePowerupsScoreIncrease;
    }
    while (heartSpawnScoreAmount <= score) {
      heartSpawnScoreAmount += CONFIG.heartSpawnScoreIncrease;
    }
    while (rapidSpawnScore <= score) {
      rapidSpawnScore += CONFIG.rapidSpawnScoreIncrease;
    }
    while (tripleSpawnScore <= score) {
      tripleSpawnScore += CONFIG.tripleSpawnScoreIncrease;
    }
  }

  if (score >= heartSpawnScoreAmount && !heart) {
    spawnHeart();
    while (heartSpawnScoreAmount <= score) {
      heartSpawnScoreAmount += CONFIG.heartSpawnScoreIncrease;
    }
  }

  if (score >= rapidSpawnScore && !rapid) {
    spawnRapid();
    while (rapidSpawnScore <= score) {
      rapidSpawnScore += CONFIG.rapidSpawnScoreIncrease;
    }
  }

  if (score >= tripleSpawnScore && !triple) {
    spawnTriple();
    while (tripleSpawnScore <= score) {
      tripleSpawnScore += CONFIG.tripleSpawnScoreIncrease;
    }
  }
}

function checkBulletAsteroidCollisions()  {
  for (let i = bullets.length - 1; i >= 0; i--) {
    for (let j = asteroids.length - 1; j >= 0; j--) {
      const dx = bullets[i].x - asteroids[j].x;
      const dy = bullets[i].y - asteroids[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < (asteroids[j].radius + CONFIG.bulletSize) * CONFIG.asteroidHitboxScale) {
        bullets.splice(i, 1);
        asteroids[j].hp -= CONFIG.bulletDamage;
        playSFX("asteroidHit", 0.4);

        if (asteroids[j].hp <= 0)  {
          score += getAsteroidPoints(asteroids[j].size);
          playSFX("asteroidExplosion", 0.7);
          
          checkPowerupSpawns();

          if (score > highScore)  {
            highScore = score;
          }
          const splitSize = getSplitSize(asteroids[j].size);

          if (splitSize)  {
            const baseAngle = Math.atan2(asteroids[j].velocityY, asteroids[j].velocityX);
            const parentSpeed = Math.sqrt(asteroids[j].velocityX ** 2 + asteroids[j].velocityY ** 2);
            
            spawnAsteroidAt(asteroids[j].x, asteroids[j].y, splitSize, baseAngle, parentSpeed);
            spawnAsteroidAt(asteroids[j].x, asteroids[j].y, splitSize, baseAngle, parentSpeed);
          }
          const explosionScale = CONFIG.asteroidExplosionScale[asteroids[j].size];

          if (explosionScale > 0) {
            spawnExplosion(
              asteroids[j].x,
              asteroids[j].y,
              asteroids[j].radius * explosionScale, CONFIG.asteroidExplosionDuration
            );
          }
          spawnDebris(asteroids[j]);
          asteroids.splice(j, 1);
        }
        break;
      }
    }
  }
}

const explosions = [];

function getAsteroidImage(size) {
  if (size === "large") return IMAGES.asteroidLarge;
  if (size === "medium") return IMAGES.asteroidMedium;
  return IMAGES.asteroidSmall;
}

function spawnDebris(a) {
  const count = CONFIG.debrisCount[a.size];

  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = CONFIG.debrisSpeedMin + Math.random() * (CONFIG.debrisSpeedMax - CONFIG.debrisSpeedMin);
    const sizeFraction = CONFIG.debrisSizeMin + Math.random() * (CONFIG.debrisSizeMax - CONFIG.debrisSizeMin);

    debris.push({
      x: a.x + Math.cos(angle) * a.radius * 0.4,
      y: a.y + Math.sin(angle) * a.radius * 0.4,
      velocityX: a.velocityX * 0.5 + Math.cos(angle) * speed,
      velocityY: a.velocityY * 0.5 + Math.sin(angle) * speed,
      size: a.radius * sizeFraction,
      rotation: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 2 * CONFIG.debrisSpin,
      life: CONFIG.debrisLifetime,
      sprite: getAsteroidImage(a.size),
    });
  }
}

function spawnExplosion(x, y, size = CONFIG.explosionSize, duration = CONFIG.explosionDuration) {
  explosions.push({
    x: x,
    y: y,
    life: duration,
    duration: duration,
    size: size,
  });
}

function respawnShip() {
  ship.x = canvas.width / 2;
  ship.y = canvas.height / 2;
  ship.velocityX = 0;
  ship.velocityY = 0;
  ship.angle = -Math.PI / 2;
  invincibleTimer = CONFIG.shipInvincibleDuration;
}

function checkShipAsteroidCollision() {
  if (invincibleTimer > 0 || respawnTimer > 0) return;

  for (const a of asteroids)  {
    const dx = ship.x - a.x;
    const dy = ship.y - a.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < a.radius + CONFIG.shipSize * 0.5)  {
      lives--;
      rapidActive = false;
      rapidFireDuration = CONFIG.rapidFireDuration;
      playSFX("shipExplosion");
      spawnExplosion(ship.x, ship.y);

      if (lives <= 0) {
        gameOver = true;
        isNewHighScore = (score === highScore && highScore > 0);
      } else  {
        respawnTimer = CONFIG.explosionDuration;
      }
      break;
    }
  }
}

function checkShipHeartCollision() {
  if (!heart) {
    return;
  }

  const dx = ship.x - heart.x;
  const dy = ship.y - heart.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < heart.radius + CONFIG.shipSize * 0.5)  {
    lives++;
    playSFX("powerUp", 1.75);
    heart = null;
  }
}

function checkShipRapidCollision() {
  if (!rapid) {
    return;
  }

  const dx = ship.x - rapid.x;
  const dy = ship.y - rapid.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < rapid.radius + CONFIG.shipSize * 0.9)  {
    playSFX("powerUp", 1.75);
    rapidCounter++;
    rapid = null;
    rapidTimer = CONFIG.rapidDuration;
    rapidBlinkingTimer = CONFIG.rapidBlinkingDuration;
  }
}

function checkShipTripleCollision() {
  if (!triple) {
    return;
  }

  const dx = ship.x - triple.x;
  const dy = ship.y - triple.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < triple.radius + CONFIG.shipSize * 0.9)  {
    tripleCounter++;
    playSFX("powerUp", 1.5);
    triple = null;
    tripleTimer = CONFIG.tripleDuration;
    tripleBlinkingTimer = CONFIG.tripleBlinkingDuration;
  }
}

function checkBulletHeartCollision()  {
  if (!heart) {
    return;
  }
  for (let i = bullets.length - 1; i >= 0; i--) {
    const dx = bullets[i].x - heart.x;
    const dy = bullets[i].y - heart.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < (heart.radius + CONFIG.bulletSize)) {
      bullets.splice(i, 1);
      playSFX("powerUp", 1.5);
      lives++;
      heart = null;
      break;
    }
  }
}

function checkBulletRapidCollision()  {
  if (!rapid) {
    return;
  }
  for (let i = bullets.length - 1; i >= 0; i--) {
    const dx = bullets[i].x - rapid.x;
    const dy = bullets[i].y - rapid.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < (rapid.radius + CONFIG.bulletSize)) {
      bullets.splice(i, 1);
      playSFX("powerUp", 1.5);
      rapidCounter++;
      rapid = null;
      rapidTimer = CONFIG.rapidDuration;
      rapidBlinkingTimer = CONFIG.rapidBlinkingDuration;
      break;
    }
  }
}

function checkBulletTripleCollision()  {
  if (!triple) {
    return;
  }
  for (let i = bullets.length - 1; i >= 0; i--) {
    const dx = bullets[i].x - triple.x;
    const dy = bullets[i].y - triple.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < (triple.radius + CONFIG.bulletSize)) {
      bullets.splice(i, 1);
      tripleCounter++;
      playSFX("powerUp", 1.5);
      triple = null;
      tripleTimer = CONFIG.tripleDuration;
      tripleBlinkingTimer = CONFIG.tripleBlinkingDuration;
      break;
    }
  }
}

function damageShip() {
  if (gameOver) return;
  lives--;
  rapidActive = false;
  rapidFireDuration = CONFIG.rapidFireDuration;
  playSFX("shipExplosion");
  spawnExplosion(ship.x, ship.y);

  if (lives <= 0) {
    gameOver = true;
    isNewHighScore = (score === highScore && highScore > 0);
  } else {
    respawnTimer = CONFIG.explosionDuration;
  }
}

function checkBulletUfoCollision() {
  if (!ufo) return;

  for (let i = bullets.length - 1; i >= 0; i--) {
    const dx = bullets[i].x - ufo.x;
    const dy = bullets[i].y - ufo.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < ufo.radius + CONFIG.bulletSize) {
      bullets.splice(i, 1);
      playSFX("shipExplosion");
      spawnExplosion(ufo.x, ufo.y);
      score += CONFIG.ufoPoints; 
      checkPowerupSpawns();
      if (score > highScore) highScore = score;
      ufo = null;
      ufoSpawnTimer = CONFIG.ufoRespawnDelay;
      break;
    }
  }
}

function checkUfoBulletShipCollision() {
  if (invincibleTimer > 0 || respawnTimer > 0) return;

  for (let i = ufoBullets.length - 1; i >= 0; i--) {
    const dx = ufoBullets[i].x - ship.x;
    const dy = ufoBullets[i].y - ship.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < CONFIG.ufoBulletSize + CONFIG.shipSize * 0.5) {
      ufoBullets.splice(i, 1);
      damageShip();
      break;
    }
  }
}
  
function checkUfoShipCollision() {
  if (!ufo) return;
  if (invincibleTimer > 0 || respawnTimer > 0) return;

  const dx = ship.x - ufo.x;
  const dy = ship.y - ufo.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < ufo.radius + CONFIG.shipSize * 0.5) {
    damageShip();
  }
}

const keys = {};

function normalizeKey(key) {
  return key.length === 1 ? key.toLowerCase() : key;
}

window.addEventListener("keydown", (e) => {
  const key = normalizeKey(e.key);
  keys[key] = true;

  if (key === "Escape") {
    if (e.repeat) return;
    if (gameState === "playing" && !gameOver) setState("paused");
    else if (gameState === "paused") setState("playing");
    else if (gameState === "settings") setState(settingsReturn);
    return;
  }

  if (gameState !== "playing") {
    handleMenuKey(key, e);
    return;
  }

  if (key === "t" && !e.repeat && !tripleActive && tripleCounter >= 1) {
    playSFX("powerUpActivate", 1.5);
    tripleActive = true;
    tripleFireDuration = CONFIG.tripleFireDuration;
    tripleCounter--;
  }

  if (key === "Enter" && gameOver)  {
    resetGame();
  }

  if (key === "r" && !e.repeat && reloadTimer <= 0 && !rapidActive && rapidCounter >= 1) {
    rapidActive = true;
    playSFX("powerUpActivate", 1.5);
    rapidFireDuration = CONFIG.rapidFireDuration;
    rapidCounter--;
  }
});

window.addEventListener("keyup", (e) => {
  keys[normalizeKey(e.key)] = false;
});

window.addEventListener("blur", () => {
  for (const k in keys) {
    keys[k] = false;
  }
  autoPause();
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) autoPause();
});

function autoPause() {
  if (gameState !== "playing" || gameOver) return;
  setState("paused", true);
  engineVolume = 0;
  engineSound.pause();
  LOOPS.ufoSound.pause();
  updateMusic(true);
}

window.addEventListener("mousedown", (e) => {
  if (e.button !== 0) return;
  mouseX = e.clientX;
  mouseY = e.clientY;

  if (gameState === "playing") {
    keys["Mouse0"] = true;
  } else {
    handleMenuClick(e.clientX, e.clientY);
  }
});

window.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

window.addEventListener("mouseup", (e) => {
  if (e.button === 0) {
    keys["Mouse0"] = false;
    if (draggingSlider && draggingSlider.def.key === "sfxVolume") {
      playSFX("laser", 0.66);
    }
    draggingSlider = null;
  }
});

function updateEngineSound() {
  const thrusting = !!(!gameOver && respawnTimer <= 0 && (keys["ArrowUp"] || keys["w"]));

  if (thrusting) {
    if (!wasThrusting) {
      engineSound.currentTime = 0;
    }
    engineVolume = CONFIG.sfxVolume * 0.75;
    if (engineSound.paused) {
      engineSound.play().catch(() => {});
    }
  } else {
    engineVolume -= CONFIG.engineFadeOutSpeed;
    if (engineVolume <= 0) {
      engineVolume = 0;
      engineSound.pause();
    }
  }

  engineSound.volume = engineVolume;
  wasThrusting = thrusting;
}

function updateUfoSound() {
  const sound = LOOPS.ufoSound;

  if (ufo)  {
    const scale = gameOver ? CONFIG.ufoGameOverVolume : 1;
    sound.volume = Math.min(1, CONFIG.sfxVolume * CONFIG.ufoSoundVolume * scale);
    if (sound.paused && audioUnlocked) {
      sound.play().catch(() => {});
    }
  } else if (!sound.paused)  {
    sound.pause();
    sound.currentTime = 0;
  }
}

function fadeToward(current, target, speed) {
  if (current < target) return Math.min(target, current + speed);
  return Math.max(target, current - speed);
}

function updateTrack(track, volume) {
  track.volume = Math.max(0, Math.min(1, volume));

  if (volume > 0 && track.paused && (audioUnlocked || !autoplayTried)) {
    track.play().catch(() => {});
  } else if (volume <= 0 && !track.paused) {
    track.pause();
  }
}

function updateMusic(snap = false) {
  const inMenu = gameState !== "playing";

  const menuTarget = inMenu ? CONFIG.menuVolume : 0;
  const gameTarget = inMenu ? 0 : (gameOver ? CONFIG.musicGameOverVolume : CONFIG.musicVolume);
  const gameSpeed = (!inMenu && gameOver) ? CONFIG.musicFadeSpeed : CONFIG.musicCrossfadeSpeed;

  if (snap) {
    menuMusicVolume = menuTarget;
    currentMusicVolume = gameTarget;
  } else {
    menuMusicVolume = fadeToward(menuMusicVolume, menuTarget, CONFIG.musicCrossfadeSpeed);
    currentMusicVolume = fadeToward(currentMusicVolume, gameTarget, gameSpeed);
  }

  updateTrack(LOOPS.menuMusic, menuMusicVolume);
  updateTrack(LOOPS.gameMusic, currentMusicVolume);

  autoplayTried = true;
}

function update() {
  if (gameState !== "playing") {
    engineVolume = 0;
    engineSound.pause();
    LOOPS.ufoSound.pause();
    return;
  }

  if (heart) {
    if (heartTimer > 0) {
      heartTimer--;
    } else {
      heartBlinkingTimer--;
    }
    if (heartTimer <= 0 && heartBlinkingTimer <= 0) {
      heart = null;
      heartTimer = CONFIG.heartDuration;
      heartBlinkingTimer = CONFIG.heartBlinkingDuration;
    }

    if (heart)  {
      heart.x += heart.velocityX;
      heart.y += heart.velocityY;
      
      if (heart.x < -heart.radius) heart.x = canvas.width + heart.radius;
      if (heart.x > canvas.width + heart.radius) heart.x = -heart.radius;
      if (heart.y < -heart.radius) heart.y = canvas.height + heart.radius;
      if (heart.y > canvas.height + heart.radius) heart.y = -heart.radius;
    }
  }

  if (rapid) {
    if (rapidTimer > 0) {
      rapidTimer--;
    } else {
      rapidBlinkingTimer--;
    }
    if (rapidTimer <= 0 && rapidBlinkingTimer <= 0) {
      rapid = null;
      rapidTimer = CONFIG.rapidDuration;
      rapidBlinkingTimer = CONFIG.rapidBlinkingDuration;
    }

    if (rapid)  {
      rapid.x += rapid.velocityX;
      rapid.y += rapid.velocityY;
      
      if (rapid.x < -rapid.radius) rapid.x = canvas.width + rapid.radius;
      if (rapid.x > canvas.width + rapid.radius) rapid.x = -rapid.radius;
      if (rapid.y < -rapid.radius) rapid.y = canvas.height + rapid.radius;
      if (rapid.y > canvas.height + rapid.radius) rapid.y = -rapid.radius;
    }
  }

  if (triple) {
    if (tripleTimer > 0) {
      tripleTimer--;
    } else {
      tripleBlinkingTimer--;
    }
    if (tripleTimer <= 0 && tripleBlinkingTimer <= 0) {
      triple = null;
      tripleTimer = CONFIG.tripleDuration;
      tripleBlinkingTimer = CONFIG.tripleBlinkingDuration;
    }

    if (triple)  {
      triple.x += triple.velocityX;
      triple.y += triple.velocityY;
      
      if (triple.x < -triple.radius) triple.x = canvas.width + triple.radius;
      if (triple.x > canvas.width + triple.radius) triple.x = -triple.radius;
      if (triple.y < -triple.radius) triple.y = canvas.height + triple.radius;
      if (triple.y > canvas.height + triple.radius) triple.y = -triple.radius;
    }
  }

  updateUfo();
  updateUfoBullets();
  updateDebris();
  updateEngineSound();
  updateUfoSound();

    if (gameOver) {
    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].life--;
      if (particles[i].life <= 0) {
        particles.splice(i, 1);
      }
    }

    for (let i = explosions.length - 1; i >= 0; i--) {
      explosions[i].life--;
      if (explosions[i].life <= 0) {
        explosions.splice(i, 1);
      }
    }
    
    for (let i = bullets.length - 1; i >= 0; i--) {
      const b = bullets[i];
      b.age++;

      if (
        b.x < 0 || b.x > canvas.width ||
        b.y < 0 || b.y > canvas.height
      ) {
        b.life--;
        if (b.life <= 0) {
          bullets.splice(i, 1);
        } 
      } else {
        b.x += b.velocityX;
        b.y += b.velocityY;
      }
  }
    
    for (const a of asteroids)  {
      a.x += a.velocityX;
      a.y += a.velocityY;

      if (a.x < -a.radius) a.x = canvas.width + a.radius;
      if (a.x > canvas.width + a.radius) a.x = -a.radius;
      if (a.y < -a.radius) a.y = canvas.height + a.radius;
      if (a.y > canvas.height + a.radius) a.y = -a.radius;
    }

    return;
  }

  if (respawnTimer <= 0)  {
    if (keys["ArrowLeft"] || keys["a"]) {
      ship.angle -= CONFIG.shipRotationSpeed;
    }

    if (keys["ArrowRight"] || keys["d"])  {
      ship.angle += CONFIG.shipRotationSpeed;
    }

    if (keys["ArrowUp"] || keys["w"]) {
      ship.velocityX += Math.cos(ship.angle) * CONFIG.shipThrust;
      ship.velocityY += Math.sin(ship.angle) * CONFIG.shipThrust;
      spawnTrailParticle();
    }

    if (keys["ArrowDown"] || keys["s"]) {
      ship.velocityX -= Math.cos(ship.angle) * CONFIG.shipReverseThrust;
      ship.velocityY -= Math.sin(ship.angle) * CONFIG.shipReverseThrust;
    }

    if (keys["c"])  {
      ship.velocityX *= 0.92;
      ship.velocityY *= 0.92;
    }

    const speed = Math.sqrt(ship.velocityX ** 2 + ship.velocityY ** 2);
    if (speed > CONFIG.shipMaxSpeed)  {
      ship.velocityX = (ship.velocityX /speed) * CONFIG.shipMaxSpeed;
      ship.velocityY = (ship.velocityY /speed) * CONFIG.shipMaxSpeed;
    }

    ship.velocityX *= CONFIG.shipFriction;
    ship.velocityY *= CONFIG.shipFriction;

    ship.x += ship.velocityX;
    ship.y += ship.velocityY;

    if (ship.x < 0) ship.x = canvas.width;
    if (ship.x > canvas.width) ship.x = 0;
    if (ship.y < 0) ship.y = canvas.height;
    if (ship.y > canvas.height) ship.y = 0;
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].life--;
    if (particles[i].life <= 0) {
      particles.splice(i, 1);
    }
  }

  for (let i = explosions.length - 1; i >= 0; i--) {
    explosions[i].life--;
    if (explosions[i].life <= 0) {
      explosions.splice(i, 1);
    }
  }

  if (rapidActive)  {
    rapidFireDuration--;
    if (rapidFireDuration <= 0)  {
      rapidActive = false;
      rapidFireDuration = CONFIG.rapidFireDuration;
    }
  }

  if (tripleActive) {
    tripleFireDuration--;
    if (tripleFireDuration <= 0)  {
      tripleActive = false;
      tripleFireDuration = CONFIG.tripleFireDuration;
    }
  }

  if (reloadTimer > 0)  {
    reloadTimer--;
  }

  if (fireCooldown > 0) {
    fireCooldown--;
  }

  if (laserSoundTimer > 0)  {
    laserSoundTimer--;
  }

  if (invincibleTimer > 0)  {
    invincibleTimer--;
  }

  if (respawnTimer > 0)  {
    respawnTimer--;
    if (respawnTimer <= 0)  {
      respawnShip();
    }
  }

  if (respawnTimer <= 0 && (keys[" "] || keys["Mouse0"] || rapidActive) && fireCooldown <= 0 && reloadTimer <= 0) {
    if (tripleActive)  {
        spawnBullet(-17, -16, -CONFIG.tripleShotSpread);
        spawnBullet(0, 7);
        spawnBullet(17, -16, CONFIG.tripleShotSpread);
    } else  {
        spawnBullet();
    }
    if (laserSoundTimer <= 0) {
      playSFX("laser", .5);
      laserSoundTimer = rapidActive ? CONFIG.rapidLaserSoundGap : 0;
    }
    fireCooldown = rapidActive ? CONFIG.rapidFireRate : CONFIG.fireRate;

  }

   for (let i = bullets.length - 1; i >= 0; i--) {
    const b = bullets[i];
    b.age++;

    if (
      b.x < 0 || b.x > canvas.width ||
      b.y < 0 || b.y > canvas.height
    ) {
      b.life--;
      if (b.life <= 0) {
        bullets.splice(i, 1);
      }
    } else {
      b.x += b.velocityX;
      b.y += b.velocityY;
    }
  }

  checkBulletAsteroidCollisions();
  checkShipAsteroidCollision();
  checkBulletHeartCollision();
  checkShipHeartCollision();
  checkShipRapidCollision();
  checkBulletRapidCollision();
  checkBulletTripleCollision();
  checkShipTripleCollision();
  checkBulletUfoCollision();
  checkUfoBulletShipCollision();
  checkUfoShipCollision();

  asteroidSpawnTimer--;
 
  if (asteroidSpawnTimer <= 0 && asteroids.length < (canvas.width * canvas.height) / CONFIG.asteroidDensity)  {
    spawnAsteroid();
    asteroidSpawnTimer = CONFIG.asteroidSpawnRate;
  }

  for (const a of asteroids)  {
    a.x += a.velocityX;
    a.y += a.velocityY;

    if (a.x < -a.radius) a.x = canvas.width + a.radius;
    if (a.x > canvas.width + a.radius) a.x = -a.radius;
    if (a.y < -a.radius) a.y = canvas.height + a.radius;
    if (a.y > canvas.height + a.radius) a.y = -a.radius;
  }
}

function drawParticles()  {
  for (const p of particles)  {
    const lifeRatio = p.life / CONFIG.trailParticleLifetime;
    const shrinkFactor = lifeRatio ** 1.45;
    const glowRadius = CONFIG.trailParticleSize * 2 * shrinkFactor;

    const colorRatio = lifeRatio ** CONFIG.trailColorFadePower;

    const start = CONFIG.trailStartColor;
    const end = CONFIG.trailEndColor;

    const r = Math.round(end.r + (start.r - end.r) * colorRatio);
    const g = Math.round(end.g + (start.g - end.g) * colorRatio);
    const b = Math.round(end.b + (start.b - end.b) * colorRatio);

    const gradient = ctx.createRadialGradient(
      p.x, p.y, 0,
      p.x, p.y, glowRadius
    );
    gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${lifeRatio})`);
    gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);


    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
    ctx.fill();
  }
} 

function drawShip() {
  if (gameOver || respawnTimer > 0) return;

  if (invincibleTimer > 0 && Math.floor (invincibleTimer / 6) % 2 === 0)  {
    return;
  }

  ctx.save();
  ctx.shadowColor = CONFIG.shipGlowColor;
  ctx.shadowBlur = CONFIG.glowBlur;
  ctx.translate(ship.x, ship.y);
  ctx.rotate(ship.angle + Math.PI / 2);
  ctx.drawImage(
    IMAGES.ship,
    -CONFIG.shipSize,
    -CONFIG.shipSize,
    CONFIG.shipSize * 2,
    CONFIG.shipSize * 2
  );
  ctx.restore();
}

function drawAsteroids()  {
  for (const a of asteroids)  {
    let img;
    if (a.size === "large") img = IMAGES.asteroidLarge;
    else if (a.size === "medium") img = IMAGES.asteroidMedium;
    else img = IMAGES.asteroidSmall;
    
    ctx.save();
    ctx.shadowColor = CONFIG.asteroidGlowColor;
    ctx.shadowBlur = CONFIG.asteroidGlowBlur;
    ctx.translate(a.x, a.y);
    ctx.rotate(a.rotation);
    // drawn twice so the thin glow reads as an outline
    for (let pass = 0; pass < 2; pass++) {
      ctx.drawImage(
        img,
        -a.radius,
        -a.radius,
        a.radius * 2,
        a.radius * 2
      );
    }
    ctx.restore();
  }
}

function drawExplosions() {
  for (const e of explosions) {
    const lifeRatio = e.life / e.duration;
    const growRatio = 1 - lifeRatio;
    const currentSize = e.size * (0.3 + growRatio * 0.7);
    const alpha = lifeRatio ** 0.3;

    ctx.globalAlpha = alpha;
    ctx.drawImage(
      IMAGES.explosion,
      e.x - currentSize / 2,
      e.y - currentSize / 2,
      currentSize,
      currentSize
    );
    ctx.globalAlpha = 1;
  }
}

function drawBullets()  {
  for (const b of bullets)  {
    const alpha = b.x < 0 || b.x > canvas.width || b.y < 0 || b.y > canvas.height
      ? b.life / CONFIG.bulletFadeDuration
      : 1;

    const trailCount = Math.min(CONFIG.bulletTrailLength, b.age);
    for (let t = trailCount; t >= 1; t--) {
      const fade = 1 - t / (CONFIG.bulletTrailLength + 1);
      const gx = b.x - b.velocityX * CONFIG.bulletTrailSpacing * t;
      const gy = b.y - b.velocityY * CONFIG.bulletTrailSpacing * t;
      const gs = CONFIG.bulletSize * (0.5 + 0.5 * fade);

      ctx.save();
      ctx.shadowColor = CONFIG.bulletGlowColor;
      ctx.shadowBlur = CONFIG.bulletTrailGlowBlur * fade;
      ctx.globalAlpha = alpha * CONFIG.bulletTrailAlpha * fade;
      ctx.translate(gx, gy);
      ctx.rotate(b.angle + Math.PI / 2);
      ctx.drawImage(IMAGES.bulletImg, -gs, -gs, gs * 2, gs * 2);
      ctx.restore();
    }

    ctx.save();
    ctx.shadowColor = CONFIG.bulletGlowColor;
    ctx.shadowBlur = CONFIG.bulletGlowBlur;
    ctx.globalAlpha = alpha;
    ctx.translate(b.x, b.y);
    ctx.rotate(b.angle + Math.PI / 2);
    // drawn twice so the glow is noticeably stronger than a single shadow pass
    for (let pass = 0; pass < 2; pass++) {
      ctx.drawImage(
        IMAGES.bulletImg,
        -CONFIG.bulletSize,
        -CONFIG.bulletSize,
        CONFIG.bulletSize * 2,
        CONFIG.bulletSize * 2,
      );
    }
    ctx.restore();
  }
}

function drawUfo()  {
  if (!ufo) return;
  
  const drawHeight = CONFIG.ufoSize;
  const drawWidth = drawHeight * (IMAGES.ufoImage.width / IMAGES.ufoImage.height);

  ctx.save();
  ctx.shadowColor = CONFIG.ufoGlowColor;
  ctx.shadowBlur = CONFIG.glowBlur;
  ctx.drawImage(
    IMAGES.ufoImage,
    ufo.x - drawWidth / 2,
    ufo.y - drawHeight / 2,
    drawWidth,
    drawHeight
  );
  ctx.restore();
}

function drawUfoBullets() {
  for (const b of ufoBullets) {
    const spacing = CONFIG.bulletTrailSpacing * (CONFIG.bulletSpeed / CONFIG.ufoBulletSpeed);
    const trailCount = Math.min(CONFIG.bulletTrailLength, b.age);
    for (let t = trailCount; t >= 1; t--) {
      const fade = 1 - t / (CONFIG.bulletTrailLength + 1);
      const gx = b.x - b.velocityX * spacing * t;
      const gy = b.y - b.velocityY * spacing * t;
      const gs = CONFIG.ufoBulletSize * (0.5 + 0.5 * fade);

      ctx.save();
      ctx.globalAlpha = CONFIG.bulletTrailAlpha * fade;
      ctx.translate(gx, gy);
      ctx.rotate(b.angle + Math.PI / 2);
      ctx.drawImage(IMAGES.ufoBulletImage, -gs, -gs, gs * 2, gs * 2);
      ctx.restore();
    }

    ctx.save();
    ctx.shadowColor = CONFIG.ufoBulletGlowColor;
    ctx.shadowBlur = CONFIG.glowBlur;
    ctx.translate(b.x, b.y);
    ctx.rotate(b.angle + Math.PI / 2);
    ctx.drawImage(
      IMAGES.ufoBulletImage,
      -CONFIG.ufoBulletSize,
      -CONFIG.ufoBulletSize,
      CONFIG.ufoBulletSize * 2,
      CONFIG.ufoBulletSize * 2
    );
    ctx.restore();
  }
}

function drawDebris() {
  for (const d of debris) {
    const alpha = CONFIG.debrisStartAlpha * Math.min(1, (d.life / CONFIG.debrisLifetime) * 2);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(d.x, d.y);
    ctx.rotate(d.rotation);
    ctx.drawImage(d.sprite, -d.size, -d.size, d.size * 2, d.size * 2);
    ctx.restore();
  }
}

function drawHeart() {
  if (heart) {
    
    if (heartBlinkingTimer > 0 && heartTimer <= 0 && Math.floor (heartBlinkingTimer / 12) % 2 === 0)  {
      return;
    }

    ctx.save();
    ctx.translate(heart.x, heart.y);

    const drawHeight = CONFIG.heartSize;
    const drawWidth = drawHeight * (IMAGES.heart.width / IMAGES.heart.height);

    ctx.drawImage(
      IMAGES.heart,
      -drawWidth / 2,
      -drawHeight / 2,
      drawWidth,
      drawHeight
    );
    ctx.restore();
  }
}

function drawRapid() {
  if (rapid) { 
    if (rapidBlinkingTimer > 0 && rapidTimer <= 0 && Math.floor (rapidBlinkingTimer / 12) % 2 === 0)  {
      return;
    }

    ctx.save();
    ctx.imageSmoothingEnabled = false;
    ctx.translate(rapid.x, rapid.y);

    const drawHeight = CONFIG.rapidSize;
    const drawWidth = drawHeight * (IMAGES.rapidFireImage.width / IMAGES.rapidFireImage.height);

    ctx.drawImage(
      IMAGES.rapidFireImage,
      -drawWidth / 2,
      -drawHeight / 2,
      drawWidth,
      drawHeight
    );
    ctx.restore();
  }
}

function drawTriple() {
  if (triple) { 
    if (tripleBlinkingTimer > 0 && tripleTimer <= 0 && Math.floor (tripleBlinkingTimer / 12) % 2 === 0)  {
      return;
    }

    ctx.save();
    ctx.imageSmoothingEnabled = false;
    ctx.translate(triple.x, triple.y);

    const drawHeight = CONFIG.tripleSize;
    const drawWidth = drawHeight * (IMAGES.tripleFireImage.width / IMAGES.tripleFireImage.height);

    ctx.drawImage(
      IMAGES.tripleFireImage,
      -drawWidth / 2,
      -drawHeight / 2,
      drawWidth,
      drawHeight
    );
    ctx.restore();
  }
}

function drawStars() {
  const time = performance.now();
  const alphaRange = CONFIG.starMaxAlpha - CONFIG.starMinAlpha;

  for (const s of stars)  {
    const pulse = 0.5 + 0.5 * Math.sin(time * s.speed + s.phase);
    const alpha = CONFIG.starMinAlpha + alphaRange * pulse;
    const x = s.x * canvas.width;
    const y = s.y * canvas.height;

    ctx.fillStyle = s.color;

    if (s.glow) {
      const glowRadius = s.size * 4;
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, glowRadius);
      gradient.addColorStop(0, s.color);
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.globalAlpha = alpha * 0.35;
      ctx.fillStyle = gradient;
      ctx.beginPath()
      ctx.arc(x, y, glowRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = s.color;
    }
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.arc(x, y, s.size, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function drawHUD()  {
  ctx.shadowColor = "#66d1de";
  ctx.shadowBlur = 25;
  ctx.fillStyle = "#66d1de";
  ctx.font = "400 30px 'Audiowide', sans-serif";
  ctx.textAlign = "left";
  ctx.fillText(`Lives: ${lives}`, 20, 30);
  ctx.fillText(`Rapid Fire [r]: ${rapidCounter}`, 20, 61);
  ctx.fillText(`Triple Shot [t]: ${tripleCounter}`, 20, 92);
  ctx.textAlign = "right";
  //ctx.fillStyle = "#ffffff";
  ctx.fillText(`Score: ${score}`, canvas.width - 20, 30);
  //ctx.fillStyle = "#ffdd00";
  ctx.fillText(`High Score: ${highScore}`, canvas.width - 20, 61);
  ctx.shadowBlur = 0;
}

function drawGameOver() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.shadowBlur = 25;
  ctx.shadowColor = "#ff3333";
  ctx.fillStyle = "#ff3333";
  ctx.textAlign = "center";
  ctx.font = "900 64px 'Audiowide', sans-serif";
  ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 20);
  
  ctx.font = "700 32px 'Audiowide', sans-serif";
  ctx.fillStyle = "#66d1de";
  ctx.shadowColor = "#66d1de";
  ctx.fillText(`Final Score: ${score}`, canvas.width / 2, canvas.height / 2 + 20);
  ctx.fillStyle = "#aaaaaa";
  ctx.shadowColor = "#66d1de";
  ctx.fillText("Press Enter to Restart", canvas.width / 2, canvas.height / 2 + 60);

  if (isNewHighScore) {
    const flashOn = Math.floor(Date.now() / 350) % 2 === 0;
    if (flashOn)  {
      ctx.fillStyle = "#ffee33";
      ctx.shadowColor = "#ffee33";
      ctx.font = "900 48px 'Audiowide', sans-serif";
      ctx.fillText(`New High Score: ${highScore}`, canvas.width / 2, canvas.height / 2 - 90);
    }
  }
  ctx.shadowBlur = 0;
}

function resetGame()  {
  lives = CONFIG.shipLives;
  score = 0;
  gameOver = false;
  isNewHighScore = false;

  heart = null;
  heartTimer = CONFIG.heartDuration;
  heartBlinkingTimer = CONFIG.heartBlinkingDuration;
  heartSpawnScoreAmount = CONFIG.heartSpawnScoreAmount;
  debris.length = 0;
  asteroids.length = 0;
  bullets.length = 0;
  particles.length = 0;
  ufo = null;
  ufoBullets.length = 0;
  ufoSpawnTimer = CONFIG.ufoSpawnDelay;
  fireCooldown = 0;
  rapid = null;
  triple = null;
  rapidActive = false;
  rapidTimer = CONFIG.rapidDuration;
  rapidCounter = 0;
  rapidActive = false;
  rapidFireDuration = CONFIG.rapidFireDuration;
  rapidBlinkingTimer = CONFIG.rapidBlinkingDuration;
  rapidSpawnScore = CONFIG.rapidSpawnScore;
  tripleSpawnScore = CONFIG.tripleSpawnScore;
  tripleCounter = 0;
  reloadTimer = 0;
  tripleTimer = CONFIG.tripleDuration;
  tripleBlinkingTimer = CONFIG.tripleBlinkingDuration;
  tripleFireDuration = CONFIG.tripleFireDuration;
  asteroidSpawnTimer = 0;
  tripleActive = false;
  allThreePowerupsScore = CONFIG.allThreePowerupsScore; 
  respawnTimer = 0;
  respawnShip();
  invincibleTimer = 0;
  laserSoundTimer = 0;
}

const NEON = "#66d1de";

const SETTINGS_TABS = [
  { name: "Ship", sliders: [
    { key: "shipRotationSpeed", label: "Turn Speed", min: 0.01, max: 0.08, step: 0.005 },
    { key: "shipThrust", label: "Thrust", min: 0.01, max: 0.1, step: 0.005 },
    { key: "shipReverseThrust", label: "Reverse Thrust", min: 0.005, max: 0.06, step: 0.001 },
    { key: "shipMaxSpeed", label: "Max Speed", min: 2, max: 12, step: 0.5 },
    { key: "shipFriction", label: "Friction (1 = none)", min: 0.98, max: 1, step: 0.001 },
    { key: "shipLives", label: "Starting Lives", min: 1, max: 9, step: 1 },
    { key: "shipInvincibleDuration", label: "Respawn Shield", min: 0, max: 900, step: 5 },
  ]},
  { name: "Weapons", sliders: [
    { key: "fireRate", label: "Fire Delay", min: 5, max: 80, step: 1 },
    { key: "bulletSpeed", label: "Bullet Speed", min: 4, max: 20, step: 0.5 },
    { key: "bulletDamage", label: "Bullet Damage", min: 5, max: 30, step: 5 },
    { key: "rapidFireRate", label: "Rapid Fire Delay", min: 2, max: 20, step: 1 },
    { key: "rapidFireDuration", label: "Rapid Fire Time", min: 100, max: 1800, step: 50 },
    { key: "tripleFireDuration", label: "Triple Shot Time", min: 100, max: 2400, step: 50 },
    { key: "tripleShotSpread", label: "Triple Shot Spread", min: 0.01, max: 0.2, step: 0.01 },
  ]},
  { name: "Asteroids", sliders: [
    { key: "asteroidSpawnRate", label: "Spawn Delay", min: 20, max: 400, step: 10 },
    { key: "asteroidDensity", label: "Asteroid Amount", min: 80000, max: 500000, step: 10000, invert: true,
      fmt: (v) => Math.round((DEFAULT_CONFIG.asteroidDensity / v) * 100) + "%" },
    { key: "asteroidSpeedMin", label: "Min Speed", min: 0.1, max: 2, step: 0.1 },
    { key: "asteroidSpeedMax", label: "Max Speed", min: 0.5, max: 4, step: 0.1 },
    { key: "asteroidHitboxScale", label: "Hitbox Size", min: 0.5, max: 1.25, step: 0.025 },
    { key: "asteroidSplitSpeedMultiplier", label: "Split Speed", min: 0.5, max: 2.5, step: 0.1 },
  ]},
  { name: "UFO", sliders: [
    { key: "ufoSpeed", label: "Speed", min: 0.5, max: 5, step: 0.1 },
    { key: "ufoFireRate", label: "Fire Delay", min: 40, max: 600, step: 10 },
    { key: "ufoDoubleShotAfter", label: "Double Shot After", min: 0, max: 10000, step: 250 },
    { key: "ufoBulletSpeed", label: "Bullet Speed", min: 1, max: 12, step: 0.5 },
    { key: "ufoRespawnDelay", label: "Respawn Delay", min: 500, max: 10000, step: 250 },
    { key: "ufoPoints", label: "Points", min: 100, max: 2000, step: 100 },
  ]},
  { name: "Audio", sliders: [
    { key: "sfxVolume", label: "Sound Effects", min: 0, max: 1, step: 0.05, percent: true },
    { key: "musicVolume", label: "Game Music", min: 0, max: 1, step: 0.05, percent: true },
    { key: "menuVolume", label: "Menu Music", min: 0, max: 1, step: 0.05, percent: true },
    { key: "menuSfxVolume", label: "Menu Sounds", min: 0, max: 1, step: 0.05, percent: true },
  ]},
];

function setState(next, silent = false) {
  if (!silent) playMenuSFX();
  hoverId = null;
  hoveredSliderSfxId = null;
  gameState = next;
  selectedButton = next === "settings" ? 1 : 0;
  draggingSlider = null;
  keys["Mouse0"] = false;
}

function startGame() {
  resetGame();
  setState("playing");
}

function openSettings(from) {
  settingsReturn = from;
  setState("settings");
}

function applyAudioSettings() {
  if (gameState !== "playing") {
    menuMusicVolume = CONFIG.menuVolume;
    LOOPS.menuMusic.volume = menuMusicVolume;
  }
}

function resetSettings() {
  playMenuSFX();
  for (const tab of SETTINGS_TABS) {
    for (const def of tab.sliders) {
      resetSlider(def);
    }
  }
  applyAudioSettings();
}

function hit(r, x, y) {
  return x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h;
}

function stepDecimals(step) {
  const text = String(step);
  return text.includes(".") ? text.split(".")[1].length : 0;
}

function formatSetting(def, v) {
  if (def.fmt) return def.fmt(v);
  if (def.percent) return Math.round(v * 100) + "%";
  return v.toFixed(stepDecimals(def.step));
}

function getButtons() {
  const cx = canvas.width / 2;
  const h = 52;
  let list = [];
  let w = 280;
  let startY = 0;

  if (gameState === "menu") {
    list = [
      { label: "Play", action: startGame },
      { label: "Settings", action: () => openSettings("menu") },
      { label: "Back To Projects", action: () => { playMenuSFX(); window.location.href = "../index.html"; } },
    ];
    startY = canvas.height / 2 + 10;
  } else if (gameState === "paused") {
    list = [
      { label: "Resume", action: () => setState("playing") },
      { label: "Settings", action: () => openSettings("paused") },
      { label: "Quit to Menu", action: () => setState("menu") },
    ];
    startY = canvas.height / 2 - 40;
  } else if (gameState === "settings") {
    w = 220;
    list = [
      { label: "Reset All", action: resetSettings },
      { label: "Back", action: () => setState(settingsReturn) },
    ];
    const gap = 24;
    const total = list.length * w + (list.length - 1) * gap;
    return list.map((b, i) => ({
      ...b, x: cx - total / 2 + i * (w + gap), y: canvas.height - 85, w: w, h: h,
    }));
  }

  return list.map((b, i) => ({
    ...b, x: cx - w / 2, y: startY + i * (h + 18), w: w, h: h,
  }));
}

function drawNeonButton(b, selected, fontSize = 24, radius = 12) {
  ctx.save();
  ctx.shadowColor = NEON;
  ctx.shadowBlur = selected ? 30 : 14;
  ctx.lineWidth = 2;
  ctx.strokeStyle = NEON;
  ctx.fillStyle = selected ? "rgba(102, 209, 222, 0.22)" : "rgba(102, 209, 222, 0.05)";
  ctx.beginPath();
  ctx.roundRect(b.x, b.y, b.w, b.h, radius);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = selected ? "#ffffff" : NEON;
  ctx.font = `400 ${fontSize}px 'Audiowide', sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(b.label, b.x + b.w / 2, b.y + b.h / 2 + 1);
  ctx.restore();
}

function drawGlowText(text, x, y, size, color = NEON) {
  ctx.save();
  ctx.textAlign = "center";
  ctx.shadowColor = color;
  ctx.shadowBlur = 25;
  ctx.fillStyle = color;
  ctx.font = `400 ${size}px 'Audiowide', sans-serif`;
  ctx.fillText(text, x, y);
  ctx.restore();
}

function drawButtons() {
  const buttons = getButtons();
  for (let i = 0; i < buttons.length; i++) {
    const hovered = hit(buttons[i], mouseX, mouseY);
    drawNeonButton(buttons[i], i === selectedButton || hovered);
  }
}

function getSettingsLayout() {
  const cx = canvas.width / 2;

  const tabGap = 12;
  const tabW = Math.min(130, (canvas.width - 40 - tabGap * (SETTINGS_TABS.length - 1)) / SETTINGS_TABS.length);
  const tabsTotal = SETTINGS_TABS.length * tabW + (SETTINGS_TABS.length - 1) * tabGap;
  const tabs = SETTINGS_TABS.map((t, i) => ({
    label: t.name, x: cx - tabsTotal / 2 + i * (tabW + tabGap), y: 110, w: tabW, h: 40,
  }));

  const defs = SETTINGS_TABS[settingsTab].sliders;
  const trackW = Math.min(560, canvas.width - 140);
  const top = 200;
  const bottom = canvas.height - 120;
  const spacing = Math.max(44, Math.min(66, (bottom - top) / defs.length));
  const sliders = defs.map((def, i) => {
    const y = top + i * spacing + 26;
    return {
      def: def, x: cx - trackW / 2, w: trackW, y: y,
      reset: { x: cx + trackW / 2 + 20, y: y - 14, w: 28, h: 28 },
    };
  });

  return { tabs: tabs, sliders: sliders };
}

function sliderHitbox(s) {
  return { x: s.x - 14, y: s.y - 18, w: s.w + 28, h: 36 };
}

function applySliderValue(s, mx) {
  const def = s.def;
  let f = Math.max(0, Math.min(1, (mx - s.x) / s.w));
  if (def.invert) f = 1 - f;

  let v = def.min + f * (def.max - def.min);
  v = def.min + Math.round((v - def.min) / def.step) * def.step;
  v = Math.max(def.min, Math.min(def.max, v));
  const next = Number(v.toFixed(6));
  if (next !== CONFIG[def.key]) {
    CONFIG[def.key] = next;
    playMenuSFX();
  }

  if (def.key === "musicVolume" || def.key === "menuVolume") applyAudioSettings();
}

function resetSlider(def) {
  CONFIG[def.key] = DEFAULT_CONFIG[def.key];
  if (def.key === "musicVolume" || def.key === "menuVolume") applyAudioSettings();
}

function drawResetIcon(r, enabled, hovered) {
  const cx = r.x + r.w / 2;
  const cy = r.y + r.h / 2;
  const radius = 7;
  const lit = enabled && hovered;

  ctx.save();
  ctx.globalAlpha = enabled ? 1 : 0.3;
  ctx.shadowColor = NEON;
  ctx.shadowBlur = lit ? 18 : 8;
  ctx.strokeStyle = lit ? "#ffffff" : NEON;
  ctx.fillStyle = lit ? "#ffffff" : NEON;
  ctx.lineWidth = 2;
  ctx.lineCap = "round";

  if (lit) {
    ctx.save();
    ctx.shadowBlur = 0;
    ctx.fillStyle = "rgba(102, 209, 222, 0.18)";
    ctx.beginPath();
    ctx.arc(cx, cy, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  const start = -Math.PI / 12;
  const end = Math.PI * 2 - Math.PI * 5 / 12;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, start, end);
  ctx.stroke();

  const ex = cx + Math.cos(end) * radius;
  const ey = cy + Math.sin(end) * radius;
  const tx = -Math.sin(end);
  const ty = Math.cos(end);
  const nx = Math.cos(end);
  const ny = Math.sin(end);
  ctx.beginPath();
  ctx.moveTo(ex + tx * 6, ey + ty * 6);
  ctx.lineTo(ex - tx + nx * 4.5, ey - ty + ny * 4.5);
  ctx.lineTo(ex - tx - nx * 4.5, ey - ty - ny * 4.5);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawSlider(s, active, resetHovered) {
  const def = s.def;
  let f = (CONFIG[def.key] - def.min) / (def.max - def.min);
  f = Math.max(0, Math.min(1, f));
  if (def.invert) f = 1 - f;
  const tx = s.x + f * s.w;

  ctx.save();

  ctx.font = "400 18px 'Audiowide', sans-serif";
  ctx.shadowColor = NEON;
  ctx.shadowBlur = 12;
  ctx.textAlign = "left";
  ctx.fillStyle = NEON;
  ctx.fillText(def.label, s.x, s.y - 16);
  ctx.textAlign = "right";
  ctx.fillStyle = "#ffffff";
  ctx.fillText(formatSetting(def, CONFIG[def.key]), s.x + s.w, s.y - 16);

  ctx.shadowBlur = 0;
  ctx.fillStyle = "rgba(102, 209, 222, 0.14)";
  ctx.beginPath();
  ctx.roundRect(s.x, s.y - 3, s.w, 6, 3);
  ctx.fill();

  ctx.fillStyle = "rgba(102, 209, 222, 0.35)";
  for (let i = 0; i <= 10; i++) {
    ctx.fillRect(s.x + (s.w * i) / 10 - 0.5, s.y + 8, 1, 4);
  }

  const grad = ctx.createLinearGradient(s.x, 0, s.x + s.w, 0);
  grad.addColorStop(0, "#2b7fa8");
  grad.addColorStop(1, NEON);
  ctx.shadowColor = NEON;
  ctx.shadowBlur = 16;
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.roundRect(s.x, s.y - 3, Math.max(0, tx - s.x), 6, 3);
  ctx.fill();

  ctx.shadowBlur = active ? 30 : 18;
  ctx.fillStyle = "#080011";
  ctx.strokeStyle = NEON;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(tx, s.y, active ? 12 : 9, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.shadowBlur = 0;
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(tx, s.y, 3, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();

  const changed = Math.abs(CONFIG[def.key] - DEFAULT_CONFIG[def.key]) > 1e-9;
  drawResetIcon(s.reset, changed, resetHovered);
}

function drawSettings() {
  if (settingsReturn === "paused") {
    ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  const cx = canvas.width / 2;
  drawGlowText("SETTINGS", cx, 80, 52);

  const layout = getSettingsLayout();
  for (let i = 0; i < layout.tabs.length; i++) {
    const hovered = hit(layout.tabs[i], mouseX, mouseY);
    drawNeonButton(layout.tabs[i], i === settingsTab || hovered, 16, 10);
  }

  for (const s of layout.sliders) {
    const active = (draggingSlider && draggingSlider.def === s.def) || hit(sliderHitbox(s), mouseX, mouseY);
    drawSlider(s, active, hit(s.reset, mouseX, mouseY));
  }

  drawButtons();

  ctx.save();
  ctx.fillStyle = "#aaaaaa";
  ctx.font = "400 14px 'Audiowide', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("Esc: back    Left / Right: switch tab", cx, canvas.height - 14);
  ctx.restore();
}

function drawMenu() {
  const cx = canvas.width / 2;
  drawGlowText("ASTEROIDS", cx, canvas.height / 2 - 60, 96);
  drawButtons();

  ctx.save();
  ctx.textAlign = "center";
  ctx.shadowColor = NEON;
  ctx.shadowBlur = 25;
  ctx.fillStyle = "#aaaaaa";
  ctx.font = "400 20px 'Audiowide', sans-serif";
  ctx.fillText(`High Score: ${highScore}`, cx, canvas.height / 2 + 260);
  ctx.restore();
}

function drawPause() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawGlowText("PAUSED", canvas.width / 2, canvas.height / 2 - 100, 72);
  drawButtons();
}

function handleMenuKey(key, e) {
  if (gameState === "settings") {
    if (key === "ArrowLeft" || key === "a") {
      settingsTab = (settingsTab + SETTINGS_TABS.length - 1) % SETTINGS_TABS.length;
      playMenuSFX();
    }
    if (key === "ArrowRight" || key === "d") {
      settingsTab = (settingsTab + 1) % SETTINGS_TABS.length;
      playMenuSFX();
    }
    if (key === "Enter" && !e.repeat) setState(settingsReturn);
    return;
  }

  const buttons = getButtons();
  if (key === "ArrowUp" || key === "w") {
    selectedButton = (selectedButton + buttons.length - 1) % buttons.length;
    playMenuSFX();
  }
  if (key === "ArrowDown" || key === "s") {
    selectedButton = (selectedButton + 1) % buttons.length;
    playMenuSFX();
  }
  if (key === "Enter" && !e.repeat) {
    buttons[selectedButton].action();
  }
}

function handleMenuClick(x, y) {
  for (const b of getButtons()) {
    if (hit(b, x, y)) {
      b.action();
      return;
    }
  }
  if (gameState !== "settings") return;

  const layout = getSettingsLayout();
  for (let i = 0; i < layout.tabs.length; i++) {
    if (hit(layout.tabs[i], x, y)) {
      if (settingsTab !== i) playMenuSFX();
      settingsTab = i;
      return;
    }
  }
  for (const s of layout.sliders) {
    if (hit(s.reset, x, y)) {
      if (CONFIG[s.def.key] !== DEFAULT_CONFIG[s.def.key]) playMenuSFX();
      resetSlider(s.def);
      return;
    }
  }
  for (const s of layout.sliders) {
    if (hit(sliderHitbox(s), x, y)) {
      draggingSlider = s;
      applySliderValue(s, x);
      return;
    }
  }
}


// returns "slider0", "slider1", ... for the slider hitbox the mouse is inside, or null
function getHoveredSliderId() {
  if (gameState !== "settings") return null;
  const layout = getSettingsLayout();
  for (let i = 0; i < layout.sliders.length; i++) {
    if (hit(sliderHitbox(layout.sliders[i]), mouseX, mouseY)) return "slider" + i;
  }
  return null;
}

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  if (draggingSlider) {
    applySliderValue(draggingSlider, mouseX);
    hoveredSliderSfxId = getHoveredSliderId();
    return;
  }

  if (gameState === "playing") return;

  let newHover = null;
  const buttons = getButtons();

  for (let i = 0; i < buttons.length; i++) {
    if (hit(buttons[i], mouseX, mouseY)) {
      selectedButton = i;
      newHover = "button" + i;
    }
  }

  if (gameState === "settings") {
    const layout = getSettingsLayout();

    for (let i = 0; i < layout.sliders.length; i++) {
      const s = layout.sliders[i];

      if (
        hit(s.reset, mouseX, mouseY) &&
        CONFIG[s.def.key] !== DEFAULT_CONFIG[s.def.key]
      ) {
        newHover = "reset" + i;
      }
    }
  }

  if (newHover !== null && newHover !== hoverId) {
    playMenuSFX();
  }

  hoverId = newHover;

  const sliderHoverId = getHoveredSliderId();

  if (
    sliderHoverId !== null &&
    sliderHoverId !== hoveredSliderSfxId
  ) {
    playMenuSFX();
  }

  hoveredSliderSfxId = sliderHoverId;
});

function draw() {
  ctx.fillStyle = CONFIG.backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  drawStars();

  const onMenuScreen = gameState === "menu" || (gameState === "settings" && settingsReturn === "menu");
  if (onMenuScreen) {
    if (gameState === "menu") drawMenu();
    else drawSettings();
    canvas.style.cursor = "default";
    return;
  }

  drawAsteroids();
  drawDebris();
  drawUfo();
  drawParticles();
  drawShip();
  drawBullets();
  drawUfoBullets();
  drawExplosions();
  drawHeart();
  drawRapid();
  drawTriple();
  drawHUD();

  if (gameOver) drawGameOver();

  if (gameState === "paused") drawPause();
  else if (gameState === "settings") drawSettings();

  canvas.style.cursor = (gameOver || gameState !== "playing") ? "default" : "none";
}

// ---------- Game loop: fixed timestep + render interpolation ----------
// All game logic (speeds, timers, cooldowns) is written in "ticks". The loop below
// always runs exactly LOGIC_FPS ticks per real second, no matter what the display
// refresh rate is, so the game plays at the same speed on 60, 144, 165 Hz, etc.
// Drawing happens once per display frame, with positions interpolated between the
// last two ticks so motion stays smooth at any refresh rate.
// (165 matches the speed the game was tuned at; lower it to slow the whole game down.)
const LOGIC_FPS = 165;
const STEP_MS = 1000 / LOGIC_FPS;
const MAX_FRAME_MS = 100; // after a long stall (tab switch, etc.) don't try to catch up
let lastFrameTime = null;
let stepAccumulator = 0;

function forEachMoving(fn) {
  fn(ship);
  for (const e of asteroids) fn(e);
  for (const e of bullets) fn(e);
  for (const e of ufoBullets) fn(e);
  for (const e of debris) fn(e);
  if (ufo) fn(ufo);
  if (heart) fn(heart);
  if (rapid) fn(rapid);
  if (triple) fn(triple);
}

function snapshotPositions() {
  forEachMoving((e) => {
    e._px = e.x;
    e._py = e.y;
    e._pa = e.angle;
    e._pr = e.rotation;
  });
}

const interpSaved = [];

function applyInterpolation(alpha) {
  interpSaved.length = 0;
  forEachMoving((e) => {
    if (e._px === undefined) return;

    const dx = e.x - e._px;
    const dy = e.y - e._py;
    if (Math.abs(dx) > canvas.width * 0.5 || Math.abs(dy) > canvas.height * 0.5) return;

    interpSaved.push(e, e.x, e.y, e.angle, e.rotation);
    e.x = e._px + dx * alpha;
    e.y = e._py + dy * alpha;
    if (typeof e.angle === "number" && typeof e._pa === "number") {
      e.angle = e._pa + (e.angle - e._pa) * alpha;
    }
    if (typeof e.rotation === "number" && typeof e._pr === "number") {
      e.rotation = e._pr + (e.rotation - e._pr) * alpha;
    }
  });
}

function restoreInterpolation() {
  for (let i = 0; i < interpSaved.length; i += 5) {
    const e = interpSaved[i];
    e.x = interpSaved[i + 1];
    e.y = interpSaved[i + 2];
    e.angle = interpSaved[i + 3];
    e.rotation = interpSaved[i + 4];
  }
  interpSaved.length = 0;
}

document.addEventListener("visibilitychange", () => {
  lastFrameTime = null;
});

function gameLoop(now) {
  if (lastFrameTime === null) lastFrameTime = now;
  const frameMs = Math.min(now - lastFrameTime, MAX_FRAME_MS);
  lastFrameTime = now;
  stepAccumulator += frameMs;

  while (stepAccumulator >= STEP_MS) {
    snapshotPositions();
    updateMusic();
    update();
    stepAccumulator -= STEP_MS;
  }

  applyInterpolation(stepAccumulator / STEP_MS);
  draw();
  restoreInterpolation();

  requestAnimationFrame(gameLoop);
}

loadImages(() => {
  requestAnimationFrame(gameLoop);
});

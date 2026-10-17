// comparisons.js
const STORAGE_CONSTANTS = {
  microsd: {
    title: "Silicon Volume",
    calc: (s, bytes) => {
      const pct = (s.exact * 100).toFixed(4);
      return `Requires just ${pct}% of a fingernail-sized chip. The entire file resides in a layer of silicon smaller than a grain of sand.`;
    }
  },
  ssd: {
    title: "Instant Flash Transfer",
    calc: (s, bytes) => {
      const sec = (bytes / 500_000_000).toFixed(4);
      return `At standard SATA flash read speeds (500 MB/s), this file loads into memory in ${sec} seconds. Faster than a human blink!`;
    }
  },
  usb: {
    title: "Keychain Payload",
    calc: (s, bytes) => {
      const grams = Math.round(s.count * 10);
      return s.count === 1
        ? `Easily carried in your pocket on a single keychain drive weighing 10 grams.`
        : `Would fill ${formatCount(s.count)} USB keychains, weighing ${formatCount(grams)} grams combined.`;
    }
  },
  dvd: {
    title: "Microscopic Laser Spiral",
    calc: (s, bytes) => {
      const trackMiles = s.exact * 7.5;
      const formatted = trackMiles < 1 ? `${Math.round(trackMiles * 5280).toLocaleString()} ft` : `${trackMiles.toFixed(2)} miles`;
      return `The red laser-burned chemical groove needed to store this file spirals for ${formatted} across the disc.`;
    }
  },
  zip: {
    title: "Backpack Weight",
    calc: (s, bytes) => {
      const lbs = (s.count * 0.187).toFixed(1);
      return `Carrying these ${formatCount(s.count)} Iomega Zip disks in your backpack would weigh ${lbs} lbs (${(s.count * 0.085).toFixed(1)} kg).`;
    }
  },
  cdr: {
    title: "Jewel Case Tower",
    calc: (s, bytes) => {
      const height = formatLength(s.count * 10.4);
      return `Stacked in standard CD jewel cases (10.4 mm each), these CDs would form a tower ${height} tall.`;
    }
  },
  floppy: {
    title: "Physical Disk Stack",
    calc: (s, bytes) => {
      const height = formatLength(s.count * 3.3);
      return `Stacked flat on top of each other, these ${formatCount(s.count)} floppy disks stand ${height} tall.`;
    }
  },
  harddrive: {
    title: "Room-Sized Hardware",
    calc: (s, bytes) => {
      const tons = (s.count * 1.1).toFixed(1);
      const sqft = s.count * 16;
      return `Requires ${formatCount(s.count)} giant cabinets (size of two refrigerators each) weighing ${tons} tons and filling ${formatCount(sqft)} sq ft of floor space.`;
    }
  },
  "magnetic-tape": {
    title: "Tape Ribbon & Weight",
    calc: (s, bytes) => {
      const dist = formatLength(s.count * 365760);
      const lbs = (s.count * 5.5).toFixed(1);
      return `Unspooled, the magnetic ribbon would stretch ${dist}. The reels weigh ${lbs} lbs combined.`;
    }
  },
  "core-memory": {
    title: "Hand-Woven Iron Rings",
    calc: (s, bytes) => {
      const rings = bytes * 8;
      return `Requires threading ${formatCount(rings)} individual tiny magnetic ferrite doughnuts onto crossing copper wires by hand.`;
    }
  },
  "williams-tube": {
    title: "Electric Power Hungry",
    calc: (s, bytes) => {
      const kw = (s.count * 0.05).toFixed(1);
      const homes = Math.max(1, Math.round(s.count * 0.05 / 1.2));
      return `Powering these ${formatCount(s.count)} radar-style CRT tubes consumes ${kw} kW. Enough electricity to power ${formatCount(homes)} homes!`;
    }
  },
  "mercury-delay": {
    title: "Tanks of Liquid Mercury",
    calc: (s, bytes) => {
      const gal = Math.round(s.count * 0.92);
      const lbs = Math.round(s.count * 104);
      return `Requires ${formatCount(s.count)} steel tubes filled with ${formatCount(gal)} gallons (${formatCount(lbs)} lbs) of toxic mercury to hold sound waves.`;
    }
  },
  "paper-tape": {
    title: "Perforated Paper Trail",
    calc: (s, bytes) => {
      const dist = formatLength(bytes * 2.54);
      return `Unrolled end-to-end, this perforated telegraph tape would stretch ${dist} along the ground.`;
    }
  },
  "magnetic-drum": {
    title: "Spinning Metal Weight",
    calc: (s, bytes) => {
      const lbs = Math.round(s.count * 35);
      return `The ${formatCount(s.count)} spinning bronze cylinders would weigh ${formatCount(lbs)} lbs combined at 3,600 RPM.`;
    }
  },
  punchcard: {
    title: "Stack Height & 1940 Typing Labor",
    calc: (s, bytes) => {
      const height = formatLength(s.count * 0.178);
      const hours = Math.ceil(s.count / 120);
      const days = (hours / 8).toFixed(1);
      return `Stack height: ${height}. In 1940, punching these cards at keypunch speed would take ${formatCount(hours)} hours (${days} workdays) non-stop!`;
    }
  }
};

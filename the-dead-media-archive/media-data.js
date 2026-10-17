// media-data.js

const MEDIA = [
  {
    id: "microsd",
    name: "Micro-SD Card (128 GB)",
    year: 2005,
    capacityBytes: 128_000_000_000,
    widthMm: 15, heightMm: 11, depthMm: 1,
    img: "assets/media/microsd.png",
    size: "0.6 × 0.4 inches",
    maker: "SanDisk & Motorola",
    howItWorked: "Fingernail-sized flash chip created for smartphones, packing billions of bytes into silicon.",
    sourceUrl: "https://en.wikipedia.org/wiki/MicroSD"
  },
  {
    id: "ssd",
    name: "Solid-State Drive (128 GB)",
    year: 2007,
    capacityBytes: 128_000_000_000,
    widthMm: 100, heightMm: 70, depthMm: 7,
    img: "assets/media/ssd.png",
    size: "3.9 × 2.8 inches",
    maker: "SanDisk, Samsung & Toshiba",
    howItWorked: "Replaced noisy spinning hard drives with silent flash chips for instant laptop boot speeds.",
    sourceUrl: "https://en.wikipedia.org/wiki/Solid-state_drive"
  },
  {
    id: "usb",
    name: "USB Flash Drive (64 MB)",
    year: 2000,
    capacityBytes: 64_000_000,
    widthMm: 55, heightMm: 17, depthMm: 8,
    img: "assets/media/usb.png",
    size: "2.2 × 0.7 inches",
    maker: "M-Systems & IBM",
    howItWorked: "Pocket-sized keychain drive that plugged into USB ports, replacing floppy disks overnight.",
    sourceUrl: "https://en.wikipedia.org/wiki/USB_flash_drive"
  },
  {
    id: "dvd",
    name: "DVD-R (4.7 GB)",
    year: 1997,
    capacityBytes: 4_700_000_000,
    widthMm: 120, heightMm: 120, depthMm: 1.2,
    img: "assets/media/dvd.png",
    size: "4.7 inches round",
    maker: "Pioneer & DVD Forum",
    howItWorked: "Used a red laser to burn microscopic pits into purple chemical dye to store whole movies.",
    sourceUrl: "https://en.wikipedia.org/wiki/DVD-R"
  },
  {
    id: "zip",
    name: "Zip Disk (100 MB)",
    year: 1994,
    capacityBytes: 100_000_000,
    widthMm: 98, heightMm: 98, depthMm: 6.5,
    img: "assets/media/zip.png",
    size: "3.9 × 3.9 inches",
    maker: "Iomega",
    howItWorked: "A super-sized floppy disk popular in the 1990s for carrying large graphic files and school projects.",
    sourceUrl: "https://en.wikipedia.org/wiki/Zip_drive"
  },
  {
    id: "cdr",
    name: "CD-R (700 MB)",
    year: 1990,
    capacityBytes: 700_000_000,
    widthMm: 120, heightMm: 120, depthMm: 1.2,
    img: "assets/media/cdr.png",
    size: "4.7 inches round",
    maker: "Philips & Sony",
    howItWorked: "Allowed people to burn their own custom music albums and data backups at home using optical discs.",
    sourceUrl: "https://en.wikipedia.org/wiki/CD-R"
  },
  {
    id: "floppy",
    name: "3.5-inch Floppy Disk (1.44 MB)",
    year: 1987,
    capacityBytes: 1_474_560,
    widthMm: 90, heightMm: 94, depthMm: 3.3,
    img: "assets/media/floppy.png",
    size: "3.5 × 3.7 inches",
    maker: "Sony & IBM",
    howItWorked: "A flexible magnetic film protected inside a plastic case with a spring-loaded metal shutter.",
    sourceUrl: "https://en.wikipedia.org/wiki/Floppy_disk"
  },
  {
    id: "harddrive",
    name: "IBM 350 RAMAC (5 MB)",
    year: 1956,
    capacityBytes: 5_000_000,
    widthMm: 1524, heightMm: 1727, depthMm: 737,
    img: "assets/media/harddrive.png",
    size: "5 × 5.7 feet (size of 2 fridges)",
    maker: "IBM San Jose",
    howItWorked: "The first hard drive in history. It spun 50 giant metal platters accessed by a mechanical air arm.",
    sourceUrl: "https://en.wikipedia.org/wiki/IBM_350"
  },
  {
    id: "magnetic-tape",
    name: "UNIVAC Magnetic Tape Reel",
    year: 1951,
    capacityBytes: 1_500_000,
    widthMm: 267, heightMm: 267, depthMm: 25,
    img: "assets/media/magnetic-tape.png",
    size: "10.5 inches reel diameter",
    maker: "Eckert & Mauchly",
    howItWorked: "Spun 1,200 feet of metal ribbon past magnetic reader heads, replacing giant stacks of paper cards.",
    sourceUrl: "https://en.wikipedia.org/wiki/UNISERVO"
  },
  {
    id: "core-memory",
    name: "Magnetic Core Memory",
    year: 1950,
    capacityBytes: 4096,
    widthMm: 150, heightMm: 150, depthMm: 25,
    img: "assets/media/core-memory.png",
    size: "5.9 × 5.9 inches",
    maker: "Jay Forrester & An Wang",
    howItWorked: "Thousands of tiny iron rings hand-woven onto crossing wires that kept their data even when unplugged.",
    sourceUrl: "https://en.wikipedia.org/wiki/Magnetic-core_memory"
  },
  {
    id: "williams-tube",
    name: "Williams–Kilburn Tube",
    year: 1947,
    capacityBytes: 64,
    widthMm: 300, heightMm: 100, depthMm: 100,
    img: "assets/media/williams-tube.png",
    size: "11.8 × 3.9 inches",
    maker: "Univ. of Manchester",
    howItWorked: "The first digital RAM, painting dots of static charge onto a glowing cathode-ray tube radar screen.",
    sourceUrl: "https://en.wikipedia.org/wiki/Williams_tube"
  },
  {
    id: "mercury-delay",
    name: "Mercury Delay-Line Memory",
    year: 1947,
    capacityBytes: 128,
    widthMm: 1000, heightMm: 100, depthMm: 100,
    img: "assets/media/mercury-delay.png",
    size: "3.3 feet long",
    maker: "J. Presper Eckert",
    howItWorked: "Stored data as sound waves rippling through long tubes of liquid mercury in an endless acoustic loop.",
    sourceUrl: "https://en.wikipedia.org/wiki/Delay-line_memory"
  },
  {
    id: "paper-tape",
    name: "Perforated Paper Tape",
    year: 1940,
    capacityBytes: 1000,
    widthMm: 25, heightMm: 1000, depthMm: 0.1,
    img: "assets/media/paper-tape.png",
    size: "1.0 inch wide strip",
    maker: "Early Telegraph Networks",
    howItWorked: "Long spools of paper tape punched with rows of holes fed code into WWII codebreaker computers.",
    sourceUrl: "https://en.wikipedia.org/wiki/Punched_tape"
  },
  {
    id: "magnetic-drum",
    name: "Magnetic Drum Memory",
    year: 1932,
    capacityBytes: 10_000,
    widthMm: 300, heightMm: 300, depthMm: 150,
    img: "assets/media/magnetic-drum.png",
    size: "11.8 × 11.8 inches",
    maker: "Gustav Tauschek",
    howItWorked: "A heavy spinning metal drum coated in magnetic material with read heads lining the outer cylinder.",
    sourceUrl: "https://en.wikipedia.org/wiki/Drum_memory"
  },
  {
    id: "punchcard",
    name: "IBM Punch Card (80 Columns)",
    year: 1928,
    capacityBytes: 80,
    widthMm: 187.3, heightMm: 82.55, depthMm: 0.178,
    img: "assets/media/punchcard.png",
    size: "7.4 × 3.2 inches",
    maker: "Herman Hollerith & IBM",
    howItWorked: "Stiff paper cards punched with rectangular holes, read by electrical pins for business bookkeeping.",
    sourceUrl: "https://en.wikipedia.org/wiki/Punched_card"
  }
];

// Price of ONE unit of each device, in US dollars, and where the number comes from.
// Only a few are well documented (RAMAC, core memory); the rest are rough estimates, so edit freely.
const UNIT_PRICES = {
  "microsd":       { priceUsd: 15,    priceNote: "Typical retail price today" },
  "ssd":           { priceUsd: 25,    priceNote: "Typical retail price today" },
  "usb":           { priceUsd: 75,    priceNote: "Rough early-2000s retail estimate" },
  "dvd":           { priceUsd: 50,    priceNote: "Rough late-1990s retail estimate" },
  "zip":           { priceUsd: 20,    priceNote: "Rough mid-1990s retail estimate" },
  "cdr":           { priceUsd: 15,    priceNote: "Rough early blank-disc estimate" },
  "floppy":        { priceUsd: 2,     priceNote: "Rough late-1980s retail estimate" },
  "harddrive":     { priceUsd: 50000, priceNote: "IBM's cited figure, about $10,000 per MB (disputed)" },
  "magnetic-tape": { priceUsd: 150,   priceNote: "Rough estimate for one reel" },
  "core-memory":   { priceUsd: 32768, priceNote: "About $1 per bit in the early days" },
  "williams-tube": { priceUsd: 500,   priceNote: "Rough estimate" },
  "mercury-delay": { priceUsd: 1000,  priceNote: "Rough estimate" },
  "paper-tape":    { priceUsd: 0.05,  priceNote: "Rough estimate" },
  "magnetic-drum": { priceUsd: 10000, priceNote: "Rough estimate" },
  "punchcard":     { priceUsd: 0.001, priceNote: "Roughly $1 per 1,000 cards" },
};
MEDIA.forEach((m) => Object.assign(m, UNIT_PRICES[m.id]));

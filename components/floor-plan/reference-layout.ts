import type { Space } from "./layout-data";

// Hotspots follow the booth labels in pics/3dlayout.png (1984 × 793).
export function referenceBounds(space: Space): [number, number, number, number] | null {
  const match = /^([A-Z])-(\d+)$/.exec(space.id);
  if (match) {
    const [, zone, digits] = match;
    const n = Number(digits);
    if (zone === "A" || zone === "B") {
      const x = n <= 8 ? 354 + (n - 1) * 62 : n <= 13 ? 895 + (n - 9) * 59 : 1221 + (n - 14) * 61;
      return [x, zone === "A" ? 178 : 240, 59, 59];
    }
    if (zone === "C") return [463 + (n <= 6 ? n - 1 : 12 - n) * 62, n <= 6 ? 335 : 395, 61, 57];
    if (zone === "D") {
      const position = n <= 10 ? n - 1 : 20 - n;
      return [position < 5 ? 895 + position * 59 : 1223 + (position - 5) * 59, n <= 10 ? 335 : 395, 58, 57];
    }
    if (zone === "E" || zone === "F") {
      const x = n <= 6 ? 444 + (n - 1) * 62 : n <= 11 ? 868 + (n - 7) * 60 : 1218 + (n - 12) * 61;
      return [x, zone === "E" ? 487 : 545, 59, 58];
    }
    if (zone === "P") return [n <= 5 ? 310 + (n - 1) * 61 : n <= 17 ? 721 + (n - 6) * 58 : 1478 + (n - 18) * 58, 63, 57, 73];
    if (zone === "V") return [n >= 14 ? 320 + (22 - n) * 63 : 929 + (13 - n) * 59, 658, 58, 77];
  }
  const landmarks: Record<string, [number, number, number, number]> = {
    "VIP-01": [1756, 42, 175, 168], "VIP-02": [1527, 327, 190, 132], "VIP-03": [1695, 562, 253, 170],
    "PARTNER-A": [153, 45, 158, 104], "PARTNER-B": [145, 172, 199, 131],
    "PARTNER-C": [1540, 172, 156, 132], "PARTNER-D": [1535, 482, 158, 127],
    "PARTNER-E": [234, 458, 150, 138], "PARTNER-F": [120, 595, 192, 143],
    STAGE: [1798, 286, 162, 203], SEATING: [1727, 321, 73, 162], FOOD: [143, 306, 242, 154],
  };
  return landmarks[space.id] ?? null;
}

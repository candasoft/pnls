// Positions traced from pics/floor layout.jpg. Units describe the drawing, not metres.
export const zones = [
  { code: "A", name: "Academic", color: "#33469d", size: "3m × 3m", rate: 30 },
  { code: "B", name: "Higher Education", color: "#14a45c", size: "3m × 3m", rate: 25 },
  { code: "C", name: "Language", color: "#e5cf36", size: "3m × 3m", rate: 25 },
  { code: "D", name: "Skill", color: "#f06435", size: "3m × 3m", rate: 25 },
  { code: "E", name: "Eco", color: "#27a9d5", size: "3m × 3m", rate: 17 },
  { code: "F", name: "Overseas", color: "#c52a42", size: "3m × 3m", rate: 30 },
  { code: "P", name: "Premium", color: "#e892bc", size: "5m × 3m", rate: 40 },
  { code: "V", name: "Service", color: "#753e9b", size: "4m × 3m", rate: 35 },
] as const;

export type Space = { id: string; label: string; zone: string; x: number; y: number; w: number; d: number; h: number; color: string; detail?: string };
export const spaces: Space[] = [];
function booth(zone: string, n: number, x: number, y: number, w = 49) {
  const id = `${zone}-${String(n).padStart(2, "0")}`;
  spaces.push({ id, label: id, zone, x, y, w, d: 49, h: 16, color: zones.find((z) => z.code === zone)!.color });
}
// The gaps in each row preserve the cross aisles in the source drawing.
for (let i = 0; i < 18; i++) {
  const y = 360 + i * 51 + (i >= 5 ? 51 : 0) + (i >= 10 ? 51 : 0);
  booth("A", 18 - i, 137, y); booth("B", 18 - i, 188, y);
}
for (let i = 0; i < 10; i++) {
  const y = 360 + i * 51 + (i >= 5 ? 51 : 0);
  booth("D", 10 - i, 282, y); booth("D", 11 + i, 333, y);
}
for (let i = 0; i < 6; i++) { booth("C", 6 - i, 282, 972 + i * 51); booth("C", 7 + i, 333, 972 + i * 51); }
for (let i = 0; i < 16; i++) {
  const y = 360 + i * 51 + (i >= 5 ? 51 : 0) + (i >= 10 ? 51 : 0);
  booth("E", i + 1, 427, y, 32); booth("F", i + 1, 461, y);
}
for (let i = 0; i < 21; i++) booth("P", 21 - i, 2, 207 + i * 51 + (i >= 4 ? 51 : 0) + (i >= 16 ? 51 : 0), 83);
for (let i = 0; i < 22; i++) booth("V", i + 1, 563, 207 + i * 51 + (i >= 13 ? 51 : 0), 65);

const features: Space[] = [
  { id: "VIP-02", label: "VIP 02", zone: "VIP", x: 2, y: 2, w: 134, d: 118, h: 23, color: "#eea136", detail: "VIP area 02 · 7m × 8m" },
  { id: "VIP-01", label: "VIP 01", zone: "VIP", x: 495, y: 2, w: 133, d: 151, h: 23, color: "#eea136", detail: "VIP area 01 · 9m × 8m" },
  { id: "STAGE", label: "MAIN STAGE", zone: "Facilities", x: 282, y: 2, w: 101, d: 84, h: 30, color: "#263958", detail: "Main stage at the far end of the exhibition hall." },
  { id: "SEATING", label: "SEATING", zone: "Facilities", x: 231, y: 104, w: 203, d: 67, h: 3, color: "#bdc8d4", detail: "Audience seating in front of the main stage." },
  { id: "PARTNER-C", label: "PARTNER C", zone: "Partners", x: 137, y: 207, w: 100, d: 151, h: 21, color: "#efb757" },
  { id: "VIP-03", label: "VIP 03", zone: "VIP", x: 282, y: 207, w: 100, d: 151, h: 23, color: "#eea136", detail: "VIP area 03 · 9m × 6m" },
  { id: "PARTNER-D", label: "PARTNER D", zone: "Partners", x: 427, y: 207, w: 83, d: 151, h: 21, color: "#efb757" },
  { id: "PARTNER-A", label: "PARTNER A", zone: "Partners", x: 2, y: 1380, w: 83, d: 150, h: 21, color: "#efb757" },
  { id: "PARTNER-B", label: "PARTNER B", zone: "Partners", x: 137, y: 1380, w: 144, d: 150, h: 21, color: "#efb757" },
  { id: "FOOD", label: "FOOD COURT", zone: "Facilities", x: 282, y: 1329, w: 100, d: 201, h: 15, color: "#e77e50", detail: "Food court area · 12m × 6m, beside the hall doors." },
  { id: "PARTNER-E", label: "PARTNER E", zone: "Partners", x: 384, y: 1329, w: 126, d: 101, h: 21, color: "#efb757" },
  { id: "PARTNER-F", label: "PARTNER F", zone: "Partners", x: 495, y: 1380, w: 133, d: 150, h: 21, color: "#efb757" },
  { id: "LOBBY", label: "LOBBY", zone: "Facilities", x: 2, y: 1537, w: 103, d: 165, h: 2, color: "#e2ddd2", detail: "Lobby on the left of the entrance." },
  { id: "PHOTO", label: "PHOTOBOOTH", zone: "Facilities", x: 247, y: 1540, w: 123, d: 38, h: 12, color: "#97b77a" },
  { id: "ACTIVITY", label: "ACTIVITIES", zone: "Facilities", x: 488, y: 1540, w: 92, d: 62, h: 5, color: "#b1c996" },
  { id: "RECEPTION", label: "RECEPTION", zone: "Facilities", x: 143, y: 1644, w: 100, d: 49, h: 14, color: "#9470ae", detail: "Find reception in the lobby before entering the hall." },
  ...[0, 1, 2].map((i) => ({ id: `G${i + 1}`, label: `G${i + 1}`, zone: "Partners", x: 380 + i * 51, y: 1644, w: 49, d: 49, h: 16, color: "#9470ae" })),
];
spaces.push(...features);

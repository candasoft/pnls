import { booths as pathways } from "./data";

export type FloorBooth = {
  id: string;
  name: string;
  logo?: string;
  zone: string;
  color: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  description: string;
  programs: readonly string[];
  image: string;
  address?: string;
  email?: string;
  phone?: string;
  chatLinks?: {
    telegram?: string;
    viber?: string;
    messenger?: string;
  };
  website?: string;
  videoUrl?: string;
  brochureUrl?: string;
};

const names = ["Horizon", "Bright Future", "Summit", "New Leaf", "Discovery", "Evergreen", "North Star", "Pioneer", "Aspire", "Unity", "Bridge", "Next Step", "Gateway", "Lighthouse", "Inspire", "Wisdom", "Sunrise", "Milestone", "Progress", "Elevate", "Pathfinder", "Forward"];
export const floorZones = [
  { code: "A", name: "Academic", color: "academic", pathway: 0, count: 18, suffix: "Academy" },
  { code: "B", name: "Higher Education", color: "higher", pathway: 1, count: 18, suffix: "College" },
  { code: "C", name: "Language", color: "language", pathway: 2, count: 12, suffix: "Languages" },
  { code: "D", name: "Skill", color: "skill", pathway: 3, count: 20, suffix: "Skills Institute" },
  { code: "F", name: "Overseas Education", color: "overseas", pathway: 4, count: 16, suffix: "Global Education" },
  { code: "V", name: "Education Services", color: "services", pathway: 5, count: 22, suffix: "Learning Services" },
  { code: "E", name: "Eco booths", color: "eco", pathway: 5, count: 16, suffix: "Learning Hub" },
  { code: "P", name: "Premium booths", color: "premium", pathway: 1, count: 21, suffix: "University" },
] as const;

function position(code: string, index: number): { x: number; y: number } {
  if (code === "P" || code === "V") return { x: code === "P" ? 22 : 882, y: 225 + index * 48 + Math.floor(index / 5) * 14 };
  if (code === "A" || code === "B") return { x: code === "A" ? 218 : 322, y: 385 + index * 48 + Math.floor(index / 5) * 14 };
  if (code === "D") return { x: index < 10 ? 478 : 582, y: 385 + (index % 10) * 48 + Math.floor((index % 10) / 5) * 20 };
  if (code === "C") return { x: index < 6 ? 478 : 582, y: 990 + (index % 6) * 48 };
  return { x: code === "E" ? 732 : 802, y: 385 + index * 48 + Math.floor(index / 5) * 14 };
}

export const floorBooths: FloorBooth[] = floorZones.flatMap((zone) =>
  Array.from({ length: zone.count }, (_, index) => {
    const pathway = pathways[zone.pathway];
    const number = zone.code === "A" || zone.code === "B" || zone.code === "P" ? zone.count - index : index + 1;
    return {
      id: `${zone.code}-${String(number).padStart(2, "0")}`,
      name: `${names[index]} ${zone.suffix}`,
      zone: zone.name, color: zone.color,
      ...position(zone.code, index),
      width: zone.code === "E" || zone.code === "F" ? 64 : 96,
      description: pathway.description,
      programs: pathway.tags,
      image: pathway.image,
    };
  }),
);

const partnerAreas = [
  { id: "VIP-02", name: "Evergreen University", x: 22, y: 26, width: 170, height: 135 },
  { id: "VIP-01", name: "Horizon International School", x: 797, y: 26, width: 181, height: 170 },
  { id: "VIP-03", name: "Summit International College", x: 478, y: 225, width: 200, height: 138 },
  { id: "PARTNER-C", name: "Pyinyar Lam Sone", logo: "/images/festival-logo.png", chatLinks: { viber: "viber://chat?number=%2B959952239984" }, x: 218, y: 225, width: 200, height: 138 },
  { id: "PARTNER-D", name: "Pioneer Technical Institute", x: 732, y: 225, width: 134, height: 138 },
  { id: "PARTNER-A", name: "Bright Future School", x: 22, y: 1390, width: 170, height: 150 },
  { id: "PARTNER-B", name: "Aspire Business College", x: 218, y: 1390, width: 200, height: 150 },
  { id: "PARTNER-E", name: "Gateway Learning Centre", x: 654, y: 1390, width: 125, height: 150 },
  { id: "PARTNER-F", name: "North Star Education", x: 797, y: 1390, width: 181, height: 150 },
];
floorBooths.push(...partnerAreas.map((area) => ({ ...area, zone: area.id.startsWith("VIP") ? "VIP partners" : "Zone partners", color: "partner", description: "Explore this sample partner profile and the education opportunities it could showcase at the festival.", programs: ["Education pathways", "Student guidance"], image: "/images/festival-hall.webp" })));

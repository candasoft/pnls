export type ExperienceEvent = { type: "heartbeat" | "booth" | "stage"; boothId?: string };
export type ExperienceStats = {
  startedAt: string;
  updatedAt: string;
  online: number;
  visitors: number;
  boothViews: number;
  schoolsExplored: number;
  stageOpens: number;
  topSchools: { id: string; name: string; views: number }[];
  topZones: { name: string; views: number }[];
};

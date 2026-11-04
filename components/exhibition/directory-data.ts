import { floorBooths, type FloorBooth } from "./floor-data";
import { booths as pathways } from "./data";

// Dummy institution listings reference the same booth identities as the hall.
// These are illustrative exhibitors, not confirmed festival participants.
const sampleIds = ["A-18", "B-16", "C-02", "D-04", "F-05", "V-06", "A-17", "B-12", "C-08", "D-09", "F-10", "V-11"];

export type DirectoryBooth = FloorBooth & {
  destination: string;
  program: string;
  subject: string;
  cardColor: string;
  initials: string;
};

export const directoryBooths: DirectoryBooth[] = sampleIds.map((id) => {
  const booth = floorBooths.find((item) => item.id === id);
  if (!booth) throw new Error(`Missing directory booth: ${id}`);
  const pathway = pathways.find((item) => item.zone === booth.zone);
  if (!pathway) throw new Error(`Missing pathway for booth: ${id}`);
  return {
    ...booth,
    destination: pathway.destination,
    program: pathway.program,
    subject: pathway.subject,
    cardColor: pathway.color,
    initials: booth.name.split(" ").slice(0, 2).map((word) => word[0]).join(""),
  };
});

// Set the festival's YouTube watch, /live/, or youtu.be URL when announced.
export const mainStageStream = {
  youtubeUrl: "",
  title: "Education & career talks",
};

export function youtubeVideoId(value: string): string | null {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return null;
    const segments = url.pathname.split("/").filter(Boolean);
    let id: string | null = null;
    if (url.hostname === "youtu.be") id = segments[0] ?? null;
    if (["youtube.com", "www.youtube.com", "m.youtube.com"].includes(url.hostname)) {
      id = url.pathname === "/watch" ? url.searchParams.get("v") : ["live", "embed"].includes(segments[0]) ? segments[1] ?? null : null;
    }
    return id && /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
  } catch { return null; }
}

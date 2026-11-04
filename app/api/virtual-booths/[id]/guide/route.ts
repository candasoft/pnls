import { floorBooths } from "@/components/exhibition/floor-data";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const booth = floorBooths.find((item) => item.id === id);
  if (!booth) return new Response("Booth not found", { status: 404 });

  const admissions = new URL(request.url).searchParams.get("type") === "admissions";
  const filename = `${booth.id}-${admissions ? "admissions-checklist" : "school-preview"}.txt`;
  const text = `PYINYAR LAM SONE 2027\n${booth.name}\n${admissions ? "Admissions planning checklist" : "School pathway preview"}\nBooth ${booth.id} · ${booth.zone}\n\nDEMO CONTENT — This is a planning guide, not an official school brochure.\n\n${booth.description}\n\nExplore: ${booth.programs.join(", ")}\n\nQuestions to ask:\n[ ] What are the entry requirements and required documents?\n[ ] What qualifications and progression routes are offered?\n[ ] What are the full fees and scholarship options?\n[ ] When are the application deadlines?\n[ ] What student support is available?\n\nMy notes:\n\n30–31 January 2027\nMyanmar Expo Hall (Fortune Plaza), Yangon\nOrganizer: meseventservices@gmail.com\n`;

  return new Response(text, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "X-Content-Type-Options": "nosniff",
    },
  });
}

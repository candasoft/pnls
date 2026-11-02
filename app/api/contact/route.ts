import { enquiryTypes } from "@/app/contact/enquiry";

export async function POST(request: Request) {
  let data: Record<string, unknown>;
  try {
    const body = await request.text();
    if (body.length > 16000) return Response.json({ error: "Enquiry is too large." }, { status: 413 });
    const parsed: unknown = JSON.parse(body);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Invalid enquiry");
    data = parsed as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Invalid enquiry." }, { status: 400 });
  }

  const limits = { name: 100, organization: 160, phone: 40, email: 254, topic: 80, subject: 200, message: 2000 };
  const enquiry: Record<string, string> = {};
  for (const [key, limit] of Object.entries(limits)) {
    const value = data[key];
    if ((key !== "organization" && (typeof value !== "string" || !value.trim())) ||
        (value !== undefined && (typeof value !== "string" || value.length > limit))) {
      return Response.json({ error: "Please check the enquiry fields." }, { status: 400 });
    }
    enquiry[key] = typeof value === "string" ? value.trim() : "";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiry.email) || !enquiryTypes.some((topic) => topic === enquiry.topic)) {
    return Response.json({ error: "Please check the email address and enquiry type." }, { status: 400 });
  }

  const webhook = process.env.CONTACT_ENQUIRY_WEBHOOK_URL;
  if (!webhook) return Response.json({ error: "Enquiry delivery is not configured." }, { status: 503 });

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event: "Pyinyar Lam Sone 2027", ...enquiry }),
      signal: AbortSignal.timeout(10000),
      redirect: "error",
    });
    if (!response.ok) throw new Error("Delivery failed");
    return Response.json({ received: true });
  } catch {
    return Response.json({ error: "Enquiry delivery failed." }, { status: 502 });
  }
}

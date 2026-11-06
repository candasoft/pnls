"use client";

import { useState, type FormEvent } from "react";
import styles from "./partners.module.css";

export function PartnershipForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    const data = new FormData(form);
    for (const key of ["organization", "industry", "name", "phone", "objectives"]) {
      if (!String(data.get(key) ?? "").trim()) {
        const field = form.elements.namedItem(key) as HTMLInputElement | HTMLTextAreaElement;
        field.setCustomValidity("Please enter more than spaces.");
        field.reportValidity();
        return;
      }
    }
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          organization: data.get("organization"), name: data.get("name"), phone: data.get("phone"), email: data.get("email"),
          topic: "Sponsorship", subject: `Partnership proposal: ${data.get("tier")}`,
          message: `Industry: ${data.get("industry")}\nInterested partnership tier: ${data.get("tier")}\nPreferred zone: ${data.get("zone")}\n\nPartnership objectives:\n${data.get("objectives")}\n\nAdditional notes:\n${data.get("notes")}`,
        }),
        signal: AbortSignal.timeout(15000),
      });
      if (!response.ok) throw new Error("Delivery failed");
      form.reset();
      setStatus("success");
    } catch { setStatus("error"); }
  }

  return <form className={styles.form} onSubmit={submit} aria-busy={status === "sending"} onChange={(event) => {
    if (status !== "sending") setStatus("idle");
    const field = event.target;
    if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) field.setCustomValidity("");
  }}>
    <p className={styles.formNote}>Fields marked * are required.</p>
    <fieldset disabled={status === "sending"}>
      <legend className={styles.srOnly}>Organization and partnership details</legend>
      <div className={styles.fieldRow}><label>Organization Name *<input name="organization" autoComplete="organization" required maxLength={160} /></label><label>Industry *<input name="industry" required maxLength={120} /></label></div>
      <div className={styles.fieldRow}><label>Contact Person *<input name="name" autoComplete="name" required maxLength={100} /></label><label>Phone *<input name="phone" type="tel" autoComplete="tel" required maxLength={40} /></label></div>
      <label>Email *<input name="email" type="email" autoComplete="email" required maxLength={254} /></label>
      <div className={styles.fieldRow}><label>Interested Partnership Tier *<select name="tier" required defaultValue=""><option value="" disabled>Select a tier</option><option>VIP Partner</option><option>Zone Partner</option><option>Education Partner</option><option>Supporting Organization</option><option>Discuss with the team</option></select></label><label>Preferred Zone<select name="zone" defaultValue="Not sure yet"><option>Not sure yet</option><option>Not applicable</option>{["A", "B", "C", "D", "E", "F"].map(zone => <option key={zone}>Zone {zone}</option>)}</select></label></div>
      <label>Partnership Objectives *<textarea name="objectives" rows={4} placeholder="Tell us about your audience and promotional goals." required maxLength={900} /></label>
      <label>Additional Notes <span>(optional)</span><textarea name="notes" rows={3} maxLength={500} /></label>
    </fieldset>
    <p className={styles.formNote}>Your contact details and enquiry will be shared with the organizing team to respond to your request.</p>
    <button className="btn btn-navy" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Request Partnership Proposal"} ↗</button>
    <div role="status">{status === "success" && <p className={styles.success}>Thank you for your interest in partnering with Pyinyar Lam Sone 2027. Our partnership team will review your enquiry and contact you.</p>}</div>
    {status === "error" && <p className={styles.error} role="alert">Your enquiry could not be delivered. Please try again or email <a href="mailto:meseventservices@gmail.com">meseventservices@gmail.com</a>.</p>}
  </form>;
}

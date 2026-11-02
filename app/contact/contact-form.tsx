"use client";

import { useState, type FormEvent } from "react";
import { enquirySuccessMessage, enquiryTypes } from "./enquiry";
import styles from "./contact.module.css";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    const data = new FormData(form);
    for (const key of ["name", "phone", "subject", "message"]) {
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
        body: JSON.stringify(Object.fromEntries(data)),
        signal: AbortSignal.timeout(15000),
      });
      if (!response.ok) throw new Error("Enquiry could not be sent");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className={styles.form} onSubmit={sendMessage} onChange={(event) => {
      if (status !== "sending") setStatus("idle");
      const field = event.target;
      if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) field.setCustomValidity("");
    }} aria-busy={status === "sending"}>
      <fieldset className={styles.fields} disabled={status === "sending"}>
        <div className={styles.fieldRow}>
          <label htmlFor="contact-name">Full Name <span aria-hidden="true">*</span><input id="contact-name" name="name" autoComplete="name" placeholder="Your full name" required maxLength={100} /></label>
          <label htmlFor="contact-organization">Organization <span className={styles.optional}>(optional)</span><input id="contact-organization" name="organization" autoComplete="organization" placeholder="School, institution, or company" maxLength={160} /></label>
        </div>
        <div className={styles.fieldRow}>
          <label htmlFor="contact-phone">Phone Number <span aria-hidden="true">*</span><input id="contact-phone" name="phone" type="tel" autoComplete="tel" placeholder="09 …" required maxLength={40} /></label>
          <label htmlFor="contact-email">Email Address <span aria-hidden="true">*</span><input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={254} /></label>
        </div>
        <label htmlFor="contact-topic">Enquiry Type <span aria-hidden="true">*</span><select id="contact-topic" name="topic" required defaultValue=""><option value="" disabled>Select an enquiry type</option>{enquiryTypes.map((topic) => <option key={topic}>{topic}</option>)}</select></label>
        <label htmlFor="contact-subject">Subject <span aria-hidden="true">*</span><input id="contact-subject" name="subject" placeholder="What is your enquiry about?" required maxLength={200} /></label>
        <label htmlFor="contact-message">Message <span aria-hidden="true">*</span><textarea id="contact-message" name="message" rows={5} placeholder="How can we help you?" required maxLength={2000} /></label>
      </fieldset>
      <p className={styles.formNote} id="required-note">Fields marked * are required.</p>
      <button type="submit" className="btn btn-navy" disabled={status === "sending"} aria-describedby="required-note">{status === "sending" ? "Sending…" : "Send Message"} <span aria-hidden="true">↗</span></button>
      <p className={styles.status} role="status">{status === "success" && enquirySuccessMessage}</p>
      {status === "error" && <p className={styles.error} role="alert">Your message could not be sent. Please try again or contact us at <a href="mailto:meseventservices@gmail.com">meseventservices@gmail.com</a>. You can also call one of the event contact persons.</p>}
    </form>
  );
}

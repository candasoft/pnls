"use client";

import { useState } from "react";
import type { FloorBooth } from "./floor-data";

type Channel = "telegram" | "viber" | "messenger";
const channels = [
  { id: "telegram", name: "Telegram" },
  { id: "viber", name: "Viber" },
  { id: "messenger", name: "Messenger" },
] as const;

function chatDestination(channel: Channel, value?: string) {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    if (channel === "telegram" && url.protocol === "tg:" && url.hostname === "resolve") return url.href;
    if (channel === "viber" && url.protocol === "viber:" && ["chat", "pa"].includes(url.hostname)) return url.href;
    const hosts = {
      telegram: ["t.me", "telegram.me"],
      viber: ["viber.me", "vb.me", "invite.viber.com", "chats.viber.com"],
      messenger: ["m.me", "messenger.com", "www.messenger.com"],
    };
    if (url.protocol === "https:" && hosts[channel].includes(url.hostname) && url.pathname.length > 1) return url.href;
  } catch { /* Unconfigured or invalid destinations use the unavailable state. */ }
  return undefined;
}

function ChannelIcon({ channel }: { channel: Channel }) {
  if (channel === "telegram") return <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path d="m7 15 18-7c1-.4 1.7.2 1.4 1.4l-3 15c-.2 1-1 1.2-1.8.7l-5-3.8-2.5 2.5c-.3.3-.6.5-1 .5l.4-5.2L23 11c.4-.4-.1-.5-.6-.2L10.8 18l-4.7-1.5c-1-.3-1-1 .9-1.5Z" fill="currentColor" /></svg>;
  if (channel === "viber") return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" focusable="false"><path d="M24.8 5.8c-5-1.7-13-1.7-17.1 1C4 9.3 4 18.1 6 21.2c.8 1.3 2.3 2.1 4 2.6l-.4 4 4.6-3.4c4.6.4 9.1-.5 11-3.3 2.6-3.7 2.6-11.4-.4-15.3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /><path d="m11.2 11 2.3 2.7-1 1.6c.8 1.9 2 3 3.8 3.8l1.7-1 2.8 2.1c.4.4-.3 2.1-1.4 2.2-3.9.5-10.5-5.7-10.6-9.6 0-1.1 1.8-2.3 2.4-1.8Z" fill="currentColor" /><path d="M17 10a5 5 0 0 1 5 5m-5-8a8 8 0 0 1 8 8m-8-2a2 2 0 0 1 2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>;
  return <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path d="M16 4C8.8 4 3.5 9 3.5 15.8c0 3.7 1.6 6.6 4.3 8.7v4.2l4.1-2.3c1.3.4 2.7.6 4.1.6 7.2 0 12.5-5 12.5-11.5S23.2 4 16 4Z" fill="currentColor" /><path d="m8 19 7-7 4.5 3.4L25 12l-7 7-4.5-3.4L8 19Z" fill="#4977ed" /></svg>;
}

export function MessagingChannels({ booth }: { booth: FloorBooth }) {
  const [unavailable, setUnavailable] = useState<string | null>(null);

  return <section className="vb-messaging" aria-label="Chat with the school">
    <h4>Chat with the school</h4>
    <p>Choose your preferred app to start a conversation.</p>
    <div className="vb-messaging-grid">{channels.map((channel) => {
      const destination = chatDestination(channel.id, booth.chatLinks?.[channel.id]);
      const content = <><span className={`vb-channel-icon vb-channel-${channel.id}`}><ChannelIcon channel={channel.id} /></span><strong>{channel.name}</strong><small>{destination ? "Open chat ↗" : "Coming soon"}</small></>;
      return destination
        ? <a key={channel.id} className="vb-channel" href={destination} target={destination.startsWith("https:") ? "_blank" : undefined} rel="noopener noreferrer" aria-label={`Chat with ${booth.name} on ${channel.name}`}>{content}</a>
        : <button key={channel.id} className="vb-channel" type="button" aria-label={`${channel.name} chat availability`} onClick={() => setUnavailable(channel.name)}>{content}</button>;
    })}</div>
    {unavailable && <p className="vb-messaging-notice" role="status">{unavailable} chat isn’t available for this school yet. You can use the email enquiry below.</p>}
    <span className="vb-email-divider">or send an email enquiry</span>
  </section>;
}

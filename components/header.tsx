"use client";

import { useEffect, useState } from "react";
import { NoticeButton } from "./notice-provider";

const links = [
  ["#top", "Home"],
  ["#about", "About"],
  ["#zones", "Education zones"],
  ["#plan", "Plan your visit"],
  ["#partners", "Partners"],
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#top");

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        document.getElementById("menu-toggle")?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 961px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 },
    );
    links.forEach(([href]) => {
      const section = document.querySelector(href);
      if (section) observer.observe(section);
    });
    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", closeOnDesktop);
      observer.disconnect();
    };
  }, []);

  function navLinks() {
    return links.map(([href, label]) => (
      <a
        key={href}
        href={href}
        className={active === href ? "active" : undefined}
        aria-current={active === href ? "location" : undefined}
        onClick={() => {
          setActive(href);
          setOpen(false);
        }}
      >
        {label}
      </a>
    ));
  }

  return (
    <>
      <div className="topbar">
        <div className="container">
          <span>
            ✦ &nbsp; <strong>30–31 JANUARY 2027</strong> &nbsp;·&nbsp; 9:00 AM –
            5:00 PM
          </span>
          <span>Myanmar Expo Hall (Fortune Plaza), Yangon &nbsp; ✦</span>
        </div>
      </div>
      <header className="nav">
        <div className="container nav-inner">
          <a
            href="#top"
            className="brand"
            aria-label="ပညာလမ်းဆုံ — Homepage"
            onClick={() => setOpen(false)}
          >
            <img
              className="brand-mark"
              src="/images/festival-logo.png"
              width="68"
              height="94"
              alt=""
            />
            {/*
            <span className="brand-title" lang="my">
              ပညာလမ်းဆုံ
              <small lang="en">
                EDUCATION &amp; CAREER PATHWAYS FESTIVAL 2027
              </small>
            </span>
            */}
          </a>
          <nav className="nav-links" aria-label="Main navigation">
            {navLinks()}
          </nav>
          <div className="nav-end">
            <NoticeButton
              className="lang"
              title="Language availability"
              message="Myanmar-language content is being prepared. The festival home page is currently available in English."
            >
              EN / <span lang="my">မြန်မာ</span>
            </NoticeButton>
            <NoticeButton
              className="btn btn-gold"
              title="Visitor registration"
              message="Visitor registration is being prepared. Please contact the organizing team for current registration information."
            >
              Register Now ↗
            </NoticeButton>
            <button
              type="button"
              id="menu-toggle"
              className="menu"
              aria-label={open ? "Close navigation" : "Open navigation"}
              aria-controls="mobileLinks"
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              {open ? "×" : "☰"}
            </button>
          </div>
        </div>
        <nav
          className={`mobile-links container${open ? " open" : ""}`}
          id="mobileLinks"
          aria-label="Mobile navigation"
        >
          {navLinks()}
        </nav>
      </header>
    </>
  );
}

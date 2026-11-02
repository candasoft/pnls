"use client";

import { useEffect, useState } from "react";
import { NoticeButton } from "./notice-provider";

const links = [
  ["#top", "Home"],
  ["/about", "About"],
  ["/zones", "Zones"],
  ["/virtual-exhibition", "Virtual Expo"],
  ["/floor-plan", "Floor Plan"],
  ["#partners", "Partners"],
  ["/contact", "Contact"],
] as const;

export function Header({ exhibition = false, experience = false, about = false, contact = false, floorPlan = false, zones = false }: { exhibition?: boolean; experience?: boolean; about?: boolean; contact?: boolean; floorPlan?: boolean; zones?: boolean }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#top");

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && document.getElementById("menu-toggle")?.getAttribute("aria-expanded") === "true") {
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
      const section = href.startsWith("#") ? document.querySelector(href) : null;
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
        href={(exhibition || about || contact || floorPlan || zones) && href.startsWith("#") ? `/${href}` : href}
        className={(zones ? href === "/zones" : floorPlan ? href === "/floor-plan" : contact ? href === "/contact" : about ? href === "/about" : exhibition ? href === "/virtual-exhibition" : active === href) ? "active" : undefined}
        aria-current={zones ? (href === "/zones" ? "page" : undefined) : floorPlan ? (href === "/floor-plan" ? "page" : undefined) : contact ? (href === "/contact" ? "page" : undefined) : about ? (href === "/about" ? "page" : undefined) : exhibition ? (href === "/virtual-exhibition" ? (experience ? "location" : "page") : undefined) : (active === href ? "location" : undefined)}
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
            href="/"
            className="brand"
            aria-label="ပညာလမ်းဆုံ — Homepage"
            onClick={() => setOpen(false)}
          >
            <img
              className="brand-mark"
              src="/images/festival-logo.png"
              width="132"
              height="91"
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
              className="btn btn-gold nav-register"
              aria-label="Register Now"
              title="Visitor registration"
              message="Visitor registration is being prepared. Please contact the organizing team for current registration information."
            >
              <span>Register<span className="nav-register-now"> Now</span> ↗</span>
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

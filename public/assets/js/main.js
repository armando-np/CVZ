(() => {
  "use strict";

  const body = document.body;
  const header = document.querySelector("[data-header]");
  const menuButton = document.querySelector("[data-menu-button]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");
  const menuOpenIcon = document.querySelector("[data-menu-icon-open]");
  const menuCloseIcon = document.querySelector("[data-menu-icon-close]");

  function setMobileMenu(open) {
    if (!menuButton || !mobileMenu) return;
    menuButton.setAttribute("aria-expanded", String(open));
    mobileMenu.hidden = !open;
    body.classList.toggle("menu-open", open);
    if (menuOpenIcon) menuOpenIcon.hidden = open;
    if (menuCloseIcon) menuCloseIcon.hidden = !open;
    menuButton.querySelector(".sr-only").textContent = open ? "Cerrar menú" : "Abrir menú";
  }

  function updateMobileMenuTop() {
    if (!header) return;
    const utility = document.querySelector(".utility-bar");
    const top = (utility?.offsetHeight || 0) + header.offsetHeight;
    document.documentElement.style.setProperty("--mobile-nav-top", `${top}px`);
  }

  menuButton?.addEventListener("click", () => {
    setMobileMenu(menuButton.getAttribute("aria-expanded") !== "true");
  });
  mobileMenu?.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMobileMenu(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMobileMenu(false);
  });
  window.addEventListener("resize", () => {
    updateMobileMenuTop();
    if (window.innerWidth > 960) setMobileMenu(false);
  });
  updateMobileMenuTop();

  function updateHeader() {
    header?.classList.toggle("site-header--scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealItems = [...document.querySelectorAll(".reveal")];
  if (!prefersReducedMotion && "IntersectionObserver" in window) {
    revealItems.forEach((item) => item.classList.add("is-pending"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8%", threshold: 0.08 }
    );
    revealItems.forEach((item) => observer.observe(item));
  }

  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });

  const consentBanner = document.getElementById("analytics-consent");
  function showConsent() {
    if (!consentBanner) return;
    consentBanner.hidden = false;
    requestAnimationFrame(() => consentBanner.classList.add("is-visible"));
  }
  function hideConsent() {
    if (!consentBanner) return;
    consentBanner.classList.remove("is-visible");
    window.setTimeout(() => {
      consentBanner.hidden = true;
    }, 180);
  }

  const currentConsent = window.cvzAnalytics?.getConsent?.() || "";
  if (!currentConsent) window.setTimeout(showConsent, 550);

  consentBanner?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-consent]");
    if (!button) return;
    const decision = button.dataset.consent === "accept" ? "accepted" : "rejected";
    window.cvzAnalytics?.setConsent?.(decision);
    hideConsent();
  });

  document.querySelectorAll("[data-open-consent]").forEach((button) => {
    button.addEventListener("click", showConsent);
  });

  document.addEventListener("click", (event) => {
    const tracked = event.target.closest("[data-track]");
    if (!tracked) return;
    const raw = tracked.dataset.track || "interaction";
    const eventName = raw.replace(/[^a-zA-Z0-9_]/g, "_").toLowerCase();
    window.cvzTrack?.(eventName, { interaction_type: tracked.tagName.toLowerCase() });
  });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const id = link.getAttribute("href")?.slice(1);
      const target = id ? document.getElementById(id) : null;
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
      history.pushState(null, "", `#${id}`);
    });
  });
})();

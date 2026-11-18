(() => {
  "use strict";

  const body = document.body;
  const header = document.querySelector("[data-header]");
  const menuButton = document.querySelector("[data-menu-button]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");
  const menuOpenIcon = document.querySelector("[data-menu-icon-open]");
  const menuCloseIcon = document.querySelector("[data-menu-icon-close]");

  const mobileBreakpoint = window.matchMedia("(max-width: 960px)");

  function updateMobileMenuTop() {
    if (!header || !mobileMenu || mobileMenu.hidden) return;
    const headerBottom = Math.max(0, Math.ceil(header.getBoundingClientRect().bottom));
    document.documentElement.style.setProperty("--mobile-menu-top", `${headerBottom}px`);
  }

  function setMobileMenu(open, options = {}) {
    if (!menuButton || !mobileMenu) return;
    const shouldOpen = Boolean(open && mobileBreakpoint.matches);

    if (shouldOpen) {
      mobileMenu.hidden = false;
      updateMobileMenuTop();
      mobileMenu.scrollTop = 0;
    } else {
      mobileMenu.hidden = true;
      document.documentElement.style.removeProperty("--mobile-menu-top");
    }

    menuButton.setAttribute("aria-expanded", String(shouldOpen));
    mobileMenu.setAttribute("aria-hidden", String(!shouldOpen));
    body.classList.toggle("menu-open", shouldOpen);
    if (menuOpenIcon) menuOpenIcon.hidden = shouldOpen;
    if (menuCloseIcon) menuCloseIcon.hidden = !shouldOpen;

    const accessibleLabel = menuButton.querySelector(".sr-only");
    if (accessibleLabel) accessibleLabel.textContent = shouldOpen ? "Cerrar menú" : "Abrir menú";

    if (shouldOpen) {
      window.requestAnimationFrame(() => {
        updateMobileMenuTop();
        if (options.focusFirst) mobileMenu.querySelector("a")?.focus({ preventScroll: true });
      });
    } else if (options.restoreFocus) {
      menuButton.focus({ preventScroll: true });
    }
  }

  menuButton?.addEventListener("click", (event) => {
    const nextState = menuButton.getAttribute("aria-expanded") !== "true";
    setMobileMenu(nextState, { focusFirst: event.detail === 0 });
  });
  mobileMenu?.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMobileMenu(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton?.getAttribute("aria-expanded") === "true") {
      setMobileMenu(false, { restoreFocus: true });
    }
  });

  function handleViewportChange() {
    if (!mobileBreakpoint.matches) {
      setMobileMenu(false);
      return;
    }
    updateMobileMenuTop();
  }

  window.addEventListener("resize", handleViewportChange, { passive: true });
  window.addEventListener("orientationchange", handleViewportChange, { passive: true });
  window.addEventListener("scroll", updateMobileMenuTop, { passive: true });
  window.visualViewport?.addEventListener("resize", updateMobileMenuTop, { passive: true });
  window.visualViewport?.addEventListener("scroll", updateMobileMenuTop, { passive: true });
  window.addEventListener("pageshow", () => setMobileMenu(false));

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

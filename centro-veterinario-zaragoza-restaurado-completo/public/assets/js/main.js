(() => {
  "use strict";

  const menuButton = document.querySelector("[data-menu-button]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");
  const openIcon = document.querySelector("[data-menu-icon-open]");
  const closeIcon = document.querySelector("[data-menu-icon-close]");
  const menuLabel = menuButton?.querySelector(".sr-only");
  const header = document.querySelector("[data-header]");

  function updateMobileMenuPosition() {
    if (!mobileMenu || !header) return;
    const top = Math.max(0, Math.round(header.getBoundingClientRect().bottom));
    mobileMenu.style.setProperty("--mobile-nav-top", `${top}px`);
  }

  function setMenu(open, { restoreFocus = false } = {}) {
    if (!menuButton || !mobileMenu) return;
    if (open) updateMobileMenuPosition();
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    if (menuLabel) menuLabel.textContent = open ? "Cerrar menú" : "Abrir menú";
    mobileMenu.hidden = !open;
    if (openIcon) openIcon.hidden = open;
    if (closeIcon) closeIcon.hidden = !open;
    document.body.classList.toggle("menu-open", open);

    if (open) {
      window.setTimeout(() => mobileMenu.querySelector("a")?.focus(), 0);
    } else if (restoreFocus) {
      menuButton.focus();
    }
  }

  menuButton?.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") !== "true";
    setMenu(open);
  });

  mobileMenu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton?.getAttribute("aria-expanded") === "true") {
      setMenu(false, { restoreFocus: true });
    }
  });

  const updateHeader = () => {
    header?.classList.toggle("site-header--scrolled", window.scrollY > 12);
    if (menuButton?.getAttribute("aria-expanded") === "true") updateMobileMenuPosition();
  };
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
  window.addEventListener(
    "resize",
    () => {
      if (window.matchMedia("(min-width: 961px)").matches) setMenu(false);
      else updateMobileMenuPosition();
    },
    { passive: true }
  );

  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealElements = document.querySelectorAll(".reveal");
  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("is-pending");
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px" }
    );

    revealElements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.95) {
        element.classList.add("is-visible");
        return;
      }
      element.classList.add("is-pending");
      observer.observe(element);
    });
  }

  document.addEventListener("click", (event) => {
    const target = event.target.closest("[data-track]");
    if (!target) return;
    const id = target.getAttribute("data-track") || "unknown";
    let eventName = "cta_click";
    if (id.includes("whatsapp")) eventName = "whatsapp_click";
    else if (id.includes("phone")) eventName = "phone_click";
    else if (id.includes("map")) eventName = "map_click";
    else if (id.includes("instagram")) eventName = "social_click";
    window.trackEvent?.(eventName, {
      link_id: id,
      link_text: target.textContent.trim().slice(0, 80),
      page_location: window.location.href
    });
  });

  document.querySelectorAll(".faq-list").forEach((list) => {
    list.addEventListener("toggle", (event) => {
      const details = event.target;
      if (!(details instanceof HTMLDetailsElement) || !details.open) return;
      list.querySelectorAll("details[open]").forEach((item) => {
        if (item !== details) item.open = false;
      });
    }, true);
  });
})();

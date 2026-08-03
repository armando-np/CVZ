(() => {
  "use strict";

  const configElement = document.getElementById("site-config");
  let config = {};
  try {
    config = JSON.parse(configElement?.textContent || "{}");
  } catch {
    config = {};
  }

  const measurementId = String(config.ga4MeasurementId || "").trim();
  const isConfigured = /^G-[A-Z0-9]+$/i.test(measurementId);
  const consentKey = "cvz_analytics_consent_v1";
  const banner = document.getElementById("analytics-consent");
  const openButtons = document.querySelectorAll("[data-open-consent]");
  let loaded = false;

  window.trackEvent = () => {};

  function getConsent() {
    try {
      return localStorage.getItem(consentKey);
    } catch {
      return null;
    }
  }

  function setConsent(value) {
    try {
      localStorage.setItem(consentKey, value);
    } catch {
      // The preference remains valid for the current page even when storage is unavailable.
    }
  }

  function hideBanner() {
    if (banner) banner.hidden = true;
  }

  function showBanner({ focus = false } = {}) {
    if (!banner || !isConfigured) return;
    banner.hidden = false;
    if (focus) {
      const firstButton = banner.querySelector("button");
      window.setTimeout(() => firstButton?.focus(), 50);
    }
  }

  function loadAnalytics() {
    if (!isConfigured || loaded) return;
    loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", measurementId, {
      send_page_view: true,
      allow_google_signals: false
    });
    window.trackEvent = (name, parameters = {}) => {
      window.gtag("event", name, parameters);
    };

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    document.head.appendChild(script);
  }

  function acceptAnalytics() {
    setConsent("accepted");
    hideBanner();
    loadAnalytics();
  }

  function rejectAnalytics() {
    setConsent("rejected");
    hideBanner();
    window.trackEvent = () => {};
  }

  if (!isConfigured) {
    hideBanner();
    openButtons.forEach((button) => {
      button.hidden = true;
    });
    return;
  }

  banner?.querySelector('[data-consent="accept"]')?.addEventListener("click", acceptAnalytics);
  banner?.querySelector('[data-consent="reject"]')?.addEventListener("click", rejectAnalytics);
  openButtons.forEach((button) => {
    button.addEventListener("click", () => showBanner({ focus: true }));
  });

  const existingConsent = getConsent();
  if (existingConsent === "accepted") loadAnalytics();
  else if (existingConsent !== "rejected") window.setTimeout(showBanner, 600);
})();

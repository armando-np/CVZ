(() => {
  "use strict";

  const STORAGE_KEY = "cvz_analytics_consent";
  let config = {};
  try {
    config = JSON.parse(document.getElementById("site-config")?.textContent || "{}");
  } catch {
    config = {};
  }

  let loaded = false;
  const measurementId = String(config.ga4MeasurementId || "").trim();

  function storedConsent() {
    try {
      return localStorage.getItem(STORAGE_KEY) || "";
    } catch {
      return "";
    }
  }

  function saveConsent(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // The site remains usable when storage is unavailable.
    }
  }

  function loadAnalytics() {
    if (loaded || !measurementId || storedConsent() !== "accepted") return;
    loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", measurementId, {
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      transport_type: "beacon"
    });

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    script.dataset.cvzAnalytics = "true";
    document.head.append(script);
  }

  function setConsent(value) {
    const normalized = value === "accepted" ? "accepted" : "rejected";
    saveConsent(normalized);
    if (normalized === "accepted") loadAnalytics();
    document.dispatchEvent(new CustomEvent("cvz:consent", { detail: normalized }));
  }

  function track(eventName, parameters = {}) {
    if (storedConsent() !== "accepted") return;
    loadAnalytics();
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, {
        ...parameters,
        page_path: window.location.pathname
      });
    }
  }

  window.cvzAnalytics = {
    getConsent: storedConsent,
    setConsent,
    load: loadAnalytics,
    track
  };
  window.cvzTrack = track;

  if (storedConsent() === "accepted") loadAnalytics();
})();

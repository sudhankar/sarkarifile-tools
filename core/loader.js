(() => {
  "use strict";

  const BASE = new URL("./", document.currentScript?.src || location.href);

  const loadedStyles = new Set();
  const loadedScripts = new Set();

  function loadCss(path) {
    const url = new URL(path, BASE).href;
    if (loadedStyles.has(url)) return Promise.resolve();
    loadedStyles.add(url);

    return new Promise((resolve, reject) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = url;
      link.onload = resolve;
      link.onerror = () => reject(new Error(`Could not load CSS: ${url}`));
      document.head.appendChild(link);
    });
  }

  function loadJs(path) {
    const url = new URL(path, BASE).href;
    if (loadedScripts.has(url)) return Promise.resolve();
    loadedScripts.add(url);

    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = url;
      script.async = true;
      script.onload = resolve;
      script.onerror = () => reject(new Error(`Could not load JS: ${url}`));
      document.head.appendChild(script);
    });
  }

  async function loadPdfMerge() {
    await loadCss("core/core.css");
    await loadCss("tools/pdf-merge/pdf-merge.css");
    await loadJs("tools/pdf-merge/pdf-merge.js");

    if (!window.SarkariFileTools?.initPdfMerge) {
      throw new Error("PDF Merge module did not initialize.");
    }

    document
      .querySelectorAll('.sf-tool[data-sf-tool="pdf-merge"]')
      .forEach(window.SarkariFileTools.initPdfMerge);
  }

  async function boot() {
    const toolNames = new Set(
      Array.from(document.querySelectorAll("[data-sf-tool]"))
        .map(el => el.getAttribute("data-sf-tool"))
        .filter(Boolean)
    );

    for (const name of toolNames) {
      try {
        if (name === "pdf-merge") {
          await loadPdfMerge();
        }
      } catch (error) {
        console.error("SarkariFile tool loader error:", error);
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();

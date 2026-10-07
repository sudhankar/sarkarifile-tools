(function () {
  "use strict";

  var BASE_URL = "https://sarkarifile-tools.pages.dev/";

  function loadCSS(url) {
    return new Promise(function (resolve, reject) {
      var existing = document.querySelector(
        'link[data-sarkarifile-css="' + url + '"]'
      );

      if (existing) {
        resolve();
        return;
      }

      var link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = url;
      link.setAttribute("data-sarkarifile-css", url);

      link.onload = function () {
        resolve();
      };

      link.onerror = function () {
        reject(new Error("Could not load CSS: " + url));
      };

      document.head.appendChild(link);
    });
  }

  function loadJS(url) {
    return new Promise(function (resolve, reject) {
      var existing = document.querySelector(
        'script[data-sarkarifile-js="' + url + '"]'
      );

      if (existing) {
        if (existing.getAttribute("data-loaded") === "true") {
          resolve();
          return;
        }

        existing.addEventListener("load", function () {
          resolve();
        });

        existing.addEventListener("error", function () {
          reject(new Error("Could not load JS: " + url));
        });

        return;
      }

      var script = document.createElement("script");
      script.src = url;
      script.setAttribute("data-sarkarifile-js", url);

      script.onload = function () {
        script.setAttribute("data-loaded", "true");
        resolve();
      };

      script.onerror = function () {
        reject(new Error("Could not load JS: " + url));
      };

      document.head.appendChild(script);
    });
  }

  function initTool(root) {
    if (!root) {
      return Promise.resolve();
    }

    var toolName = root.getAttribute("data-sf-tool");

    if (!toolName) {
      return Promise.resolve();
    }

    /*
     * IMPORTANT:
     * Prevent the same Blogger tool from being initialized
     * more than once while CSS/JS is loading.
     */
    if (
      root.getAttribute("data-sf-initialized") === "true" ||
      root.getAttribute("data-sf-loading") === "true"
    ) {
      return Promise.resolve();
    }

    /*
     * Lock immediately BEFORE starting async loading.
     * This prevents MutationObserver from starting another
     * initialization at the same time.
     */
    root.setAttribute("data-sf-loading", "true");

    if (toolName === "pdf-merge") {
      var coreCSS =
        BASE_URL + "core/core.css";

      var toolCSS =
        BASE_URL + "tools/pdf-merge/pdf-merge.css";

      var toolJS =
        BASE_URL + "tools/pdf-merge/pdf-merge.js";

      return Promise.all([
        loadCSS(coreCSS),
        loadCSS(toolCSS),
        loadJS(toolJS)
      ])
        .then(function () {
          if (
            window.SarkariFileTools &&
            typeof window.SarkariFileTools.initPdfMerge === "function"
          ) {
            window.SarkariFileTools.initPdfMerge(root);

            root.setAttribute(
              "data-sf-initialized",
              "true"
            );

            root.removeAttribute(
              "data-sf-loading"
            );
          } else {
            throw new Error(
              "PDF Merge initializer was not found."
            );
          }
        })
        .catch(function (error) {
          root.removeAttribute(
            "data-sf-loading"
          );

          throw error;
        });
    }

    root.removeAttribute("data-sf-loading");

    return Promise.reject(
      new Error(
        "Unknown SarkariFile tool: " + toolName
      )
    );
  }

  function initAllTools() {
    var tools = document.querySelectorAll(
      "[data-sf-tool]"
    );

    if (!tools.length) {
      return;
    }

    Array.prototype.forEach.call(
      tools,
      function (root) {
        initTool(root).catch(function (error) {
          console.error(
            "SarkariFile tool loader error:",
            error
          );
        });
      }
    );
  }

  function start() {
    /*
     * Initialize tools already present in the page.
     */
    initAllTools();

    /*
     * Blogger may insert post content after page load.
     * MutationObserver watches only for newly added elements.
     *
     * Duplicate initialization is prevented by
     * data-sf-loading / data-sf-initialized.
     */
    if (window.MutationObserver) {
      var observer =
        new MutationObserver(function (mutations) {
          var shouldCheck = false;

          for (
            var i = 0;
            i < mutations.length;
            i++
          ) {
            if (
              mutations[i].type === "childList" &&
              mutations[i].addedNodes &&
              mutations[i].addedNodes.length
            ) {
              shouldCheck = true;
              break;
            }
          }

          if (shouldCheck) {
            initAllTools();
          }
        });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    }
  }

  if (
    document.readyState === "loading"
  ) {
    document.addEventListener(
      "DOMContentLoaded",
      start
    );
  } else {
    start();
  }
})();

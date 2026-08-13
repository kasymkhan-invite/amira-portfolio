(function () {
  // Shrinks an element's font-size until it fits on a single line inside
  // its container, instead of letting the browser wrap or clip it.
  function fitToWidth(el, { min = 15, max = 110 } = {}) {
    if (!el) return;
    const container = el.parentElement;
    if (!container) return;

    function measure() {
      // Reset to nowrap + max size so scrollWidth reflects the "ideal" width.
      el.classList.add("fit-nowrap");
      el.style.fontSize = max + "px";

      const available = container.clientWidth;
      let fontSize = max;

      // Step down until the single-line text fits the container.
      // A binary search keeps this cheap even for big max values.
      let low = min;
      let high = max;
      while (low < high) {
        fontSize = Math.ceil((low + high) / 2);
        el.style.fontSize = fontSize + "px";
        if (el.scrollWidth > available) {
          high = fontSize - 1;
        } else {
          low = fontSize;
        }
      }
      fontSize = low;
      el.style.fontSize = fontSize + "px";

      // If even the minimum size doesn't fit (very narrow screen / very
      // long address), fall back to a graceful two-line wrap instead of
      // forcing an unreadably tiny single line.
      if (el.scrollWidth > available && fontSize <= min) {
        el.classList.remove("fit-nowrap");
        el.style.fontSize = min + "px";
      }
    }

    measure();

    let resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(measure, 120);
    });

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(measure);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    fitToWidth(document.querySelector(".footer-email"), { min: 15, max: 110 });
  });
})();

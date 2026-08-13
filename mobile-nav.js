(function () {
  const menuBtn = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");

  if (!menuBtn || !mobileNav) return;

  function openMenu() {
    menuBtn.classList.add("is-open");
    mobileNav.classList.add("is-open");
    menuBtn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    menuBtn.classList.remove("is-open");
    mobileNav.classList.remove("is-open");
    menuBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  menuBtn.addEventListener("click", function () {
    if (mobileNav.classList.contains("is-open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close menu when a link inside it is tapped
  mobileNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  // Close menu on resize back to desktop width
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      closeMenu();
    }
  });

  // Close on Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });
})();

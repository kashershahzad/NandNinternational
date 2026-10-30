/**
 * NandN International — Main Interactions
 */

(function () {
  "use strict";

  const header = document.getElementById("site-header");
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav__link");
  const backToTop = document.getElementById("back-to-top");
  const contactForm = document.getElementById("contact-form");
  const formFeedback = document.getElementById("form-feedback");
  const yearEl = document.getElementById("year");

  /* ---------- Year ---------- */
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Featured products ---------- */
  if (
    window.NandNProducts &&
    typeof window.NandNProducts.renderProductCards === "function"
  ) {
    window.NandNProducts.renderProductCards("#product-grid");
  }

  if (
    window.NandNProducts &&
    typeof window.NandNProducts.renderProductDetail === "function"
  ) {
    window.NandNProducts.renderProductDetail("#product-detail");
  }

  /* ---------- Vendor gallery ---------- */
  if (window.NandNVendors && typeof window.NandNVendors.renderVendors === "function") {
    window.NandNVendors.renderVendors("#vendor-grid");
  }

  /* ---------- Mobile navigation ---------- */
  function setMenuOpen(isOpen) {
    if (!navToggle || !navMenu) return;
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navMenu.classList.toggle("is-open", isOpen);
    document.body.classList.toggle("nav-open", isOpen);
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const open = navToggle.getAttribute("aria-expanded") === "true";
      setMenuOpen(!open);
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => setMenuOpen(false));
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    });
  }

  /* ---------- Sticky header + scroll spy ---------- */
  const sections = document.querySelectorAll("section[id]");

  function onScroll() {
    const y = window.scrollY;

    if (header) {
      header.classList.toggle("is-scrolled", y > 40);
    }

    if (backToTop) {
      backToTop.classList.toggle("is-visible", y > 600);
    }

    let current = "";
    sections.forEach((section) => {
      const top = section.offsetTop - 120;
      if (y >= top) current = section.getAttribute("id") || "";
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute("href") || "";
      const active = href === `#${current}`;
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Smooth scroll for in-page anchors ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = header ? header.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
      setMenuOpen(false);
    });
  });

  /* ---------- Back to top ---------- */
  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Image loading fallback ---------- */
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", function onImgError() {
      this.removeEventListener("error", onImgError);
      this.classList.add("img-fallback");
      this.alt = (this.alt || "Image") + " (unavailable)";
      this.src =
        "data:image/svg+xml," +
        encodeURIComponent(
          `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
            <rect fill="#2A2420" width="800" height="600"/>
            <text x="400" y="300" fill="#C6A96B" font-family="Georgia,serif" font-size="22" text-anchor="middle">Image unavailable</text>
          </svg>`
        );
    });
  });

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- Contact form validation ---------- */
  function showFeedback(type, message) {
    if (!formFeedback) return;
    formFeedback.textContent = message;
    formFeedback.className = `form-feedback is-${type}`;
    formFeedback.hidden = false;
  }

  function setFieldError(input, message) {
    const wrap = input.closest(".form-field");
    const err = wrap ? wrap.querySelector(".field-error") : null;
    input.setAttribute("aria-invalid", message ? "true" : "false");
    if (err) err.textContent = message || "";
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = contactForm.querySelector("#name");
      const email = contactForm.querySelector("#email");
      const message = contactForm.querySelector("#message");

      let valid = true;

      [name, email, message].forEach((field) => setFieldError(field, ""));

      if (!name.value.trim()) {
        setFieldError(name, "Please enter your name.");
        valid = false;
      }

      if (!email.value.trim()) {
        setFieldError(email, "Please enter your email.");
        valid = false;
      } else if (!isValidEmail(email.value.trim())) {
        setFieldError(email, "Please enter a valid email address.");
        valid = false;
      }

      if (!message.value.trim()) {
        setFieldError(message, "Please enter a message.");
        valid = false;
      } else if (message.value.trim().length < 10) {
        setFieldError(message, "Message should be at least 10 characters.");
        valid = false;
      }

      if (!valid) {
        showFeedback("error", "Please correct the highlighted fields.");
        const firstInvalid = contactForm.querySelector('[aria-invalid="true"]');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // Static site: form is ready for Formspree / EmailJS / custom backend.
      // No message is emailed until an endpoint is configured.
      showFeedback(
        "success",
        "Form validated successfully. Connect Formspree, EmailJS, or your backend to send messages."
      );
      contactForm.reset();
    });

    contactForm.querySelectorAll("input, textarea").forEach((field) => {
      field.addEventListener("input", () => setFieldError(field, ""));
    });
  }
})();

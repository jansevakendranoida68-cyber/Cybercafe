/* ============================================
   Cyber Cafe — Main JavaScript
   Handles: navbar scroll/mobile menu, FAQ accordion,
   scroll-reveal animations, contact form (Phase 1 UI only)
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initFaqAccordion();
  initScrollReveal();
  initContactForm();
  markActiveNavLink();
});

/* ---------- Navbar: scroll shadow + mobile toggle ---------- */
function initNavbar() {
  const navbar = document.querySelector(".navbar");
  const toggleBtn = document.querySelector(".nav-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 12);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("open");
      toggleBtn.setAttribute("aria-expanded", String(isOpen));
      toggleBtn.innerHTML = isOpen ? iconClose() : iconMenu();
    });

    // Close mobile menu when a link is tapped
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
        toggleBtn.setAttribute("aria-expanded", "false");
        toggleBtn.innerHTML = iconMenu();
      });
    });
  }
}

function iconMenu() {
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="20" height="20"><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="18" x2="20" y2="18"></line></svg>';
}
function iconClose() {
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="20" height="20"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
}

/* ---------- FAQ accordion ---------- */
function initFaqAccordion() {
  const items = document.querySelectorAll(".faq-item");
  items.forEach((item, index) => {
    const question = item.querySelector(".faq-question");
    if (!question) return;
    question.addEventListener("click", () => {
      const wasOpen = item.classList.contains("open");
      items.forEach((i) => i.classList.remove("open"));
      if (!wasOpen) item.classList.add("open");
    });
    // First FAQ open by default
    if (index === 0) item.classList.add("open");
  });
}

/* ---------- Scroll reveal (IntersectionObserver) ---------- */
function initScrollReveal() {
  const elements = document.querySelectorAll(".reveal");
  if (!elements.length) return;

  if (!("IntersectionObserver" in window)) {
    elements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "-40px" }
  );

  elements.forEach((el) => observer.observe(el));
}

/* ---------- Contact form (Phase 1: frontend only) ---------- */
function initContactForm() {
  const form = document.getElementById("contact-form");
  const successState = document.getElementById("form-success");
  if (!form || !successState) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // Phase 1 has no backend. Wire this up to an API endpoint
    // or form service (e.g. Formspree, an API route) later.
    form.style.display = "none";
    successState.classList.add("show");
  });
}

/* ---------- Highlight current page in nav ---------- */
function markActiveNavLink() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a, .mobile-menu-inner a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === path || (path === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });
}

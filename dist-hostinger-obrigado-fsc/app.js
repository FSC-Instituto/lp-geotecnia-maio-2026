const progress = document.querySelector(".scroll-progress");
const revealTargets = document.querySelectorAll("[data-reveal]");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealTargets.forEach((target) => observer.observe(target));

let ticking = false;

function updateScrollEffects() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = maxScroll > 0 ? window.scrollY / maxScroll : 0;
  progress.style.transform = `scaleX(${ratio})`;
  ticking = false;
}

window.addEventListener(
  "scroll",
  () => {
    if (!ticking) {
      requestAnimationFrame(updateScrollEffects);
      ticking = true;
    }
  },
  { passive: true }
);

window.addEventListener("resize", updateScrollEffects);
updateScrollEffects();

const methodWheel = document.querySelector("[data-method-wheel]");
const methodCards = methodWheel ? Array.from(methodWheel.querySelectorAll(".method-card")) : [];
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function animateMethodWheel(time = 0) {
  if (!methodWheel || !methodCards.length) return;

  const viewport = methodWheel.closest(".method-wheel");
  const width = viewport ? viewport.clientWidth : window.innerWidth;
  const radius = Math.max(108, Math.min(170, width * 0.28));
  const rotation = prefersReducedMotion ? 0 : time * -0.008;

  methodCards.forEach((card) => {
    const baseAngle = Number(card.dataset.angle || 0);
    const angle = baseAngle + rotation;
    card.style.transform = `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius}px) rotate(${-angle}deg)`;
  });

  if (!prefersReducedMotion) requestAnimationFrame(animateMethodWheel);
}

animateMethodWheel();

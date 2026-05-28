const progress = document.querySelector(".scroll-progress");
const revealTargets = document.querySelectorAll("[data-reveal]");
const parallaxTargets = document.querySelectorAll("[data-parallax]");
const counters = document.querySelectorAll("[data-count]");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealTargets.forEach((target) => observer.observe(target));

const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const target = entry.target;
      const end = Number(target.dataset.count || 0);
      const startTime = performance.now();
      const duration = 1200;

      function tick(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        target.textContent = `+${Math.round(end * eased).toLocaleString("pt-BR")}`;

        if (progress < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
      countObserver.unobserve(target);
    });
  },
  { threshold: 0.6 }
);

counters.forEach((counter) => countObserver.observe(counter));

let ticking = false;

function updateScrollEffects() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = maxScroll > 0 ? window.scrollY / maxScroll : 0;
  progress.style.transform = `scaleX(${ratio})`;

  parallaxTargets.forEach((target) => {
    const rect = target.getBoundingClientRect();
    const speed = Number(target.dataset.speed || 0);
    const offset = (rect.top - window.innerHeight / 2) * speed;
    target.style.transform = `translate3d(0, ${offset}px, 0)`;
  });

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

document.querySelector("form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const activeCampaignTag = form.dataset.activeCampaignTag || "FSC | PEFC | PER | CAPTURA";
  const button = form.querySelector("button");
  const original = button.textContent;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "lead_capture",
    active_campaign_tag: activeCampaignTag,
    lead_form: "pos_fundacoes_captura_video",
  });

  button.textContent = "Informações solicitadas";
  button.disabled = true;

  window.setTimeout(() => {
    button.textContent = original;
    button.disabled = false;
  }, 2400);
});

function scrollToLead() {
  const target = document.querySelector("#lead");
  if (!target) return;

  const topbar = document.querySelector(".topbar");
  const offset = (topbar?.getBoundingClientRect().height || 0) + 42;
  const targetTop = target.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({
    top: Math.max(0, targetTop),
    behavior: "smooth"
  });
}

document.querySelectorAll('a[href="#lead"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    window.history.pushState(null, "", "#lead");
    scrollToLead();
  });
});

if (window.location.hash === "#lead") {
  window.setTimeout(scrollToLead, 120);
}

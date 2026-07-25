// Work item accordion
document.querySelectorAll(".work-item__row").forEach((btn) => {
  const panel = document.getElementById(btn.dataset.target);

  panel.querySelectorAll("img").forEach((img) => {
    img.addEventListener("load", () => {
      if (btn.getAttribute("aria-expanded") === "true") {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });

  btn.addEventListener("click", () => {
    const expanded = btn.getAttribute("aria-expanded") === "true";

    document.querySelectorAll(".work-item__row").forEach((other) => {
      if (other !== btn) {
        other.setAttribute("aria-expanded", "false");
        document.getElementById(other.dataset.target).style.maxHeight = null;
      }
    });

    btn.setAttribute("aria-expanded", String(!expanded));
    panel.style.maxHeight = expanded ? null : panel.scrollHeight + "px";
  });
});

// Custom cursor
const cursor = document.querySelector(".cursor-dot");
if (cursor && matchMedia("(hover: hover) and (pointer: fine)").matches) {
  window.addEventListener("mousemove", (e) => {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
  });
  document.querySelectorAll("a, button").forEach((el) => {
    el.addEventListener("mouseenter", () => cursor.classList.add("is-active"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("is-active"));
  });
}

// Hide corner marks once scrolled past the hero
const cornerMarks = document.querySelectorAll(".corner-mark");
if (cornerMarks.length) {
  const toggleCorners = () => {
    const hidden = window.scrollY > window.innerHeight * 0.6;
    cornerMarks.forEach((el) => el.classList.toggle("is-hidden", hidden));
  };
  toggleCorners();
  window.addEventListener("scroll", toggleCorners, { passive: true });
}

// Scroll-triggered reveal
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && revealEls.length) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("is-visible"));
}

// Hero particle field
(() => {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;

  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const ctx = canvas.getContext("2d");
  let width, height, particles, dpr;
  let mouse = { x: null, y: null };

  const ACCENT = "255, 91, 61";
  const COUNT_DENSITY = 18000; // px^2 per particle

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.parentElement.clientWidth;
    height = canvas.parentElement.clientHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.min(140, Math.floor((width * height) / COUNT_DENSITY));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.4 + 0.4,
    }));
  }

  function step() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
    });

    const linkDist = Math.min(140, width * 0.09);
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < linkDist) {
          ctx.strokeStyle = `rgba(${ACCENT}, ${0.12 * (1 - dist / linkDist)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      if (mouse.x !== null) {
        const dx = particles[i].x - mouse.x;
        const dy = particles[i].y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 160) {
          ctx.strokeStyle = `rgba(${ACCENT}, ${0.25 * (1 - dist / 160)})`;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    }

    particles.forEach((p) => {
      ctx.fillStyle = `rgba(${ACCENT}, 0.55)`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });

    if (!reduceMotion) requestAnimationFrame(step);
  }

  canvas.parentElement.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  canvas.parentElement.addEventListener("mouseleave", () => {
    mouse.x = null;
    mouse.y = null;
  });

  window.addEventListener("resize", resize);
  resize();
  step();
  if (reduceMotion) step(); // draw one static frame
})();

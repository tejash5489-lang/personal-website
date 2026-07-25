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
const cursorLabel = cursor && cursor.querySelector(".cursor-dot__label");
if (cursor && matchMedia("(hover: hover) and (pointer: fine)").matches) {
  window.addEventListener("mousemove", (e) => {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
  });

  document.querySelectorAll("a, button:not(.work-item__row)").forEach((el) => {
    el.addEventListener("mouseenter", () => cursor.classList.add("is-active"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("is-active"));
  });

  document.querySelectorAll(".work-item__row").forEach((row) => {
    const setLabel = () => {
      if (cursorLabel) {
        cursorLabel.textContent = row.getAttribute("aria-expanded") === "true" ? "Close" : "View";
      }
    };
    row.addEventListener("mouseenter", () => {
      setLabel();
      cursor.classList.add("is-label");
    });
    row.addEventListener("click", setLabel);
    row.addEventListener("mouseleave", () => {
      cursor.classList.remove("is-label");
    });
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

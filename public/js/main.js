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

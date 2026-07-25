import * as THREE from "/js/vendor/three.module.min.js";

const canvas = document.getElementById("bg-canvas");
if (canvas) {
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isCoarsePointer = matchMedia("(pointer: coarse)").matches;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 9);

  // Soft round sprite for glowy points
  const spriteCanvas = document.createElement("canvas");
  spriteCanvas.width = spriteCanvas.height = 64;
  const sctx = spriteCanvas.getContext("2d");
  const grad = sctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.4, "rgba(255,255,255,0.6)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  sctx.fillStyle = grad;
  sctx.fillRect(0, 0, 64, 64);
  const spriteTexture = new THREE.CanvasTexture(spriteCanvas);

  // Particle field: an elongated diagonal cloud, echoing a streak of flight
  const COUNT = isCoarsePointer ? 900 : 1800;
  const positions = new Float32Array(COUNT * 3);
  const colors = new Float32Array(COUNT * 3);
  const sizes = new Float32Array(COUNT);

  const accent = new THREE.Color("#ff5b3d");
  const cream = new THREE.Color("#f2f0ea");

  for (let i = 0; i < COUNT; i++) {
    // Bias distribution along a diagonal axis for a "wing streak" feel
    const t = (Math.random() - 0.5) * 2;
    const spread = Math.random();
    const along = t * 9;
    const perp = (Math.random() - 0.5) * (2.5 + Math.abs(t) * 1.5);
    const depth = (Math.random() - 0.5) * 6;

    positions[i * 3] = along * 0.85 - perp * 0.4;
    positions[i * 3 + 1] = along * 0.4 + perp * 0.9;
    positions[i * 3 + 2] = depth;

    const mixed = accent.clone().lerp(cream, Math.random() * 0.85);
    colors[i * 3] = mixed.r;
    colors[i * 3 + 1] = mixed.g;
    colors[i * 3 + 2] = mixed.b;

    sizes[i] = (0.35 + Math.random() * 0.9) * (spread > 0.9 ? 1.8 : 1);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

  const material = new THREE.PointsMaterial({
    size: 0.14,
    map: spriteTexture,
    transparent: true,
    opacity: 0.75,
    vertexColors: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);

  function resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener("resize", resize);
  resize();

  // Mouse parallax (smoothed)
  let targetX = 0, targetY = 0, curX = 0, curY = 0;
  window.addEventListener("mousemove", (e) => {
    targetX = (e.clientX / window.innerWidth - 0.5) * 2;
    targetY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  let scrollFrac = 0;
  function updateScroll() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    scrollFrac = max > 0 ? window.scrollY / max : 0;
  }
  window.addEventListener("scroll", updateScroll, { passive: true });
  updateScroll();

  let visible = !document.hidden;
  document.addEventListener("visibilitychange", () => { visible = !document.hidden; });

  const clock = new THREE.Clock();

  function renderFrame() {
    const dt = clock.getDelta();

    curX += (targetX - curX) * 0.04;
    curY += (targetY - curY) * 0.04;

    points.rotation.y += dt * 0.06;
    points.rotation.x = curY * 0.15 + scrollFrac * 0.6;
    points.rotation.z = curX * 0.06 + scrollFrac * 0.25;

    camera.position.x = curX * 0.6;
    camera.position.y = -curY * 0.4;
    camera.position.z = 9 - scrollFrac * 2.2;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  }

  if (reduceMotion) {
    renderFrame();
  } else {
    renderer.setAnimationLoop(() => {
      if (visible) renderFrame();
    });
  }
}

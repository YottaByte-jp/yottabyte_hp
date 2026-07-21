const intro = document.querySelector(".intro");
const introCanvas = document.querySelector(".intro__canvas");
const heroCanvas = document.querySelector(".hero-visual__canvas");
const scrollAtmosphereCanvas = document.querySelector(".scroll-atmosphere__canvas");
const profilePhoto = document.querySelector(".profile__photo img");
const revealTargets = document.querySelectorAll("[data-reveal]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const root = document.documentElement;

if (profilePhoto) {
  profilePhoto.addEventListener("error", () => {
    profilePhoto.removeAttribute("src");
  });
}

class IntroDataStream {
  constructor(canvas, container) {
    this.canvas = canvas;
    this.container = container;
    this.context = canvas.getContext("2d", { alpha: true });
    this.columns = [];
    this.glyphs = "01{}[]<>/\\|+-=AIWEBYB";
    this.startedAt = performance.now();
    this.duration = 2850;
    this.resize = this.resize.bind(this);
    this.animate = this.animate.bind(this);

    this.resize();
    window.addEventListener("resize", this.resize);

    if (prefersReducedMotion.matches) {
      this.finish();
    } else {
      this.frame = window.requestAnimationFrame(this.animate);
      window.setTimeout(() => this.finish(), this.duration + 180);
    }
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = Math.floor(this.width * this.dpr);
    this.canvas.height = Math.floor(this.height * this.dpr);
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    this.context.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);

    const columnWidth = this.width < 680 ? 18 : 24;
    const count = Math.ceil(this.width / columnWidth) + 6;

    this.columns = Array.from({ length: count }, (_, index) => ({
      x: index * columnWidth - columnWidth * 3,
      y: Math.random() * -this.height,
      speed: 9 + Math.random() * 18,
      length: 8 + Math.floor(Math.random() * 18),
      size: 10 + Math.random() * 6,
      offset: Math.floor(Math.random() * this.glyphs.length),
    }));
  }

  drawGlyph(char, x, y, alpha, size) {
    this.context.fillStyle = `rgba(8, 8, 8, ${alpha})`;
    this.context.font = `${size}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
    this.context.fillText(char, x, y);
  }

  drawColumn(column, frame, progress) {
    column.y += column.speed * (1.16 - progress * 0.62);

    if (column.y - column.length * column.size > this.height + 80) {
      column.y = Math.random() * -this.height * 0.45;
      column.speed = 9 + Math.random() * 18;
    }

    for (let i = 0; i < column.length; i += 1) {
      const y = column.y - i * column.size * 1.34;
      if (y < -40 || y > this.height + 40) continue;

      const charIndex = (frame + i * 7 + column.offset) % this.glyphs.length;
      const alpha = Math.max(0, (1 - i / column.length) * 0.24 * (1 - progress * 0.3));
      this.drawGlyph(this.glyphs[charIndex], column.x, y, alpha, column.size);
    }
  }

  animate(now) {
    const elapsed = now - this.startedAt;
    const progress = Math.min(elapsed / this.duration, 1);
    const exit = Math.max(0, (progress - 0.68) / 0.32);

    this.context.clearRect(0, 0, this.width, this.height);
    this.context.globalAlpha = 1 - exit * 0.45;

    const frame = Math.floor(now / 55);
    this.columns.forEach((column) => this.drawColumn(column, frame, progress));

    this.context.globalAlpha = 1;

    if (progress < 1) {
      this.frame = window.requestAnimationFrame(this.animate);
    }
  }

  finish() {
    window.removeEventListener("resize", this.resize);
    if (this.frame) window.cancelAnimationFrame(this.frame);
    this.container?.remove();
  }
}

if (introCanvas && intro) {
  new IntroDataStream(introCanvas, intro);
} else if (intro) {
  window.setTimeout(() => {
    intro.remove();
  }, 2600);
}

class HeroNetwork {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d", { alpha: true });
    this.nodes = [];
    this.frame = null;
    this.pointer = { x: 0, y: 0 };
    this.resize = this.resize.bind(this);
    this.animate = this.animate.bind(this);
    this.handlePointerMove = this.handlePointerMove.bind(this);

    this.resize();
    window.addEventListener("resize", this.resize);
    window.addEventListener("pointermove", this.handlePointerMove, { passive: true });

    if (prefersReducedMotion.matches) {
      this.renderStatic();
    } else {
      this.animate();
    }
  }

  resize() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.width = Math.max(320, rect.width);
    this.height = Math.max(420, rect.height);
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = Math.floor(this.width * this.dpr);
    this.canvas.height = Math.floor(this.height * this.dpr);
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    this.context.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);

    const targetCount = Math.round(Math.min(92, Math.max(52, this.width / 16)));
    this.nodes = Array.from({ length: targetCount }, (_, index) => this.createNode(index, targetCount));
    this.renderStatic();
  }

  createNode(index, total) {
    const ring = index / total;
    const angle = ring * Math.PI * 18 + Math.random() * 0.8;
    const radius = 0.7 + Math.random() * 1.8;
    const spread = 210 + Math.random() * 260;

    return {
      x: Math.cos(angle) * spread * (0.45 + Math.random() * 0.55),
      y: (Math.random() - 0.5) * 360,
      z: Math.sin(angle) * spread,
      radius: radius * 0.72,
      orbit: 0.45 + Math.random() * 0.8,
    };
  }

  handlePointerMove(event) {
    const rect = this.canvas.getBoundingClientRect();
    this.pointer.x = (event.clientX - rect.left) / rect.width - 0.5;
    this.pointer.y = (event.clientY - rect.top) / rect.height - 0.5;
  }

  project(node, time) {
    const pointerTiltX = this.pointer.y * 0.16;
    const pointerTiltY = this.pointer.x * 0.22;
    const rotationY = time * 0.18 + pointerTiltY;
    const rotationX = -0.24 + Math.sin(time * 0.16) * 0.08 + pointerTiltX;
    const cosY = Math.cos(rotationY * node.orbit);
    const sinY = Math.sin(rotationY * node.orbit);
    const cosX = Math.cos(rotationX);
    const sinX = Math.sin(rotationX);
    const x1 = node.x * cosY - node.z * sinY;
    const z1 = node.x * sinY + node.z * cosY;
    const y1 = node.y * cosX - z1 * sinX;
    const z2 = node.y * sinX + z1 * cosX;
    const depth = 760;
    const scale = depth / (depth + z2);

    return {
      x: this.width / 2 + x1 * scale,
      y: this.height / 2 + y1 * scale,
      z: z2,
      scale,
      radius: node.radius * scale,
    };
  }

  drawPlane(time) {
    const centerX = this.width / 2;
    const centerY = this.height / 2;
    const glow = this.context.createRadialGradient(
      centerX,
      centerY,
      0,
      centerX,
      centerY,
      Math.max(this.width, this.height) * 0.52
    );
    glow.addColorStop(0, "rgba(29, 118, 104, 0.13)");
    glow.addColorStop(0.45, "rgba(29, 118, 104, 0.04)");
    glow.addColorStop(1, "rgba(29, 118, 104, 0)");
    this.context.fillStyle = glow;
    this.context.fillRect(0, 0, this.width, this.height);

    this.context.save();
    this.context.translate(centerX, centerY);
    this.context.rotate(time * 0.045);
    this.context.strokeStyle = "rgba(29, 118, 104, 0.04)";
    this.context.lineWidth = 1;

    for (let i = 0; i < 5; i += 1) {
      const radius = 90 + i * 64;
      this.context.beginPath();
      this.context.ellipse(0, 0, radius * 1.32, radius * 0.42, 0, 0, Math.PI * 2);
      this.context.stroke();
    }

    this.context.restore();
  }

  drawScene(time) {
    const projected = this.nodes.map((node) => this.project(node, time)).sort((a, b) => a.z - b.z);
    const edges = [];

    this.drawPlane(time);
    this.context.lineWidth = 0.85;

    for (let i = 0; i < projected.length; i += 1) {
      const a = projected[i];

      for (let j = i + 1; j < projected.length; j += 1) {
        const b = projected[j];
        const distance = Math.hypot(a.x - b.x, a.y - b.y);

        if (distance < 132) {
          const alpha = (1 - distance / 132) * 0.14 * Math.min(a.scale, b.scale);
          this.context.strokeStyle = `rgba(29, 118, 104, ${alpha})`;
          this.context.beginPath();
          this.context.moveTo(a.x, a.y);
          this.context.lineTo(b.x, b.y);
          this.context.stroke();
          edges.push({ a, b, distance, alpha });
        }
      }
    }

    this.drawPackets(edges, time);
    projected.forEach((node) => this.drawHub(node));
  }

  drawPackets(edges, time) {
    const visibleEdges = edges
      .filter((edge, index) => index % 3 === 0 && edge.distance > 32)
      .slice(0, 46);

    visibleEdges.forEach((edge, index) => {
      const offset = (time * (0.18 + (index % 5) * 0.025) + index * 0.173) % 1;
      const x = edge.a.x + (edge.b.x - edge.a.x) * offset;
      const y = edge.a.y + (edge.b.y - edge.a.y) * offset;
      const packetSize = 1.1 + Math.min(edge.a.scale, edge.b.scale) * 1.4;

      this.context.fillStyle = `rgba(29, 118, 104, ${0.28 + edge.alpha * 1.8})`;
      this.context.fillRect(x - packetSize * 1.5, y - packetSize * 0.5, packetSize * 3, packetSize);
    });
  }

  drawHub(node) {
    const size = Math.max(1.8, node.radius * 1.8);
    this.context.strokeStyle = `rgba(29, 118, 104, ${0.18 + node.scale * 0.14})`;
    this.context.lineWidth = 0.9;
    this.context.beginPath();
    this.context.arc(node.x, node.y, size, 0, Math.PI * 2);
    this.context.stroke();
  }

  render(time = 0) {
    this.context.clearRect(0, 0, this.width, this.height);
    this.drawScene(time);
  }

  renderStatic() {
    this.render(0);
  }

  animate(timestamp = 0) {
    const time = timestamp * 0.001;
    this.render(time);
    this.frame = window.requestAnimationFrame(this.animate);
  }
}

if (heroCanvas) {
  new HeroNetwork(heroCanvas);
}

class ScrollAtmosphereNetwork {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d", { alpha: true });
    this.nodes = [];
    this.scrollProgress = 0;
    this.visibility = 0;
    this.resize = this.resize.bind(this);
    this.animate = this.animate.bind(this);
    this.handleScroll = this.handleScroll.bind(this);

    this.resize();
    this.handleScroll();
    window.addEventListener("resize", this.resize);
    window.addEventListener("scroll", this.handleScroll, { passive: true });
    this.frame = window.requestAnimationFrame(this.animate);
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = Math.floor(this.width * this.dpr);
    this.canvas.height = Math.floor(this.height * this.dpr);
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    this.context.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);

    const targetCount = Math.round(Math.min(78, Math.max(42, this.width / 22)));
    this.nodes = Array.from({ length: targetCount }, (_, index) => this.createNode(index, targetCount));
  }

  createNode(index, total) {
    const ring = index / total;
    const angle = ring * Math.PI * 18 + Math.random() * 0.8;
    const radius = 0.7 + Math.random() * 1.8;
    const spread = Math.min(this.width, 980) * (0.24 + Math.random() * 0.28);

    return {
      x: Math.cos(angle) * spread * (0.45 + Math.random() * 0.55),
      y: (Math.random() - 0.5) * Math.min(this.height * 0.64, 420),
      z: Math.sin(angle) * spread,
      radius: radius * 0.72,
      orbit: 0.45 + Math.random() * 0.8,
      phase: Math.random() * Math.PI * 2,
    };
  }

  handleScroll() {
    const scrollY = window.scrollY || window.pageYOffset || 0;
    const heroHeight = document.querySelector(".hero")?.offsetHeight || window.innerHeight;
    const documentScrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const afterHero = Math.max(0, (scrollY - heroHeight * 0.24) / (heroHeight * 0.58));

    this.visibility = Math.min(1, afterHero);
    this.scrollProgress = Math.min(1, scrollY / documentScrollable);
    root.style.setProperty("--scroll-alpha", (this.visibility * 0.82).toFixed(3));
  }

  project(node, time) {
    const handoff = Math.min(1, this.visibility);
    const pointerDriftX = Math.sin(time * 0.12 + node.phase) * 0.018;
    const pointerDriftY = Math.cos(time * 0.1 + node.phase) * 0.014;
    const rotationY = time * (0.16 - this.scrollProgress * 0.04) + this.scrollProgress * 0.46 + pointerDriftX;
    const rotationX = -0.24 + Math.sin(time * 0.16) * 0.08 + this.scrollProgress * 0.18 + pointerDriftY;
    const cosY = Math.cos(rotationY * node.orbit);
    const sinY = Math.sin(rotationY * node.orbit);
    const cosX = Math.cos(rotationX);
    const sinX = Math.sin(rotationX);
    const x1 = node.x * cosY - node.z * sinY;
    const z1 = node.x * sinY + node.z * cosY;
    const y1 = node.y * cosX - z1 * sinX;
    const z2 = node.y * sinX + z1 * cosX;
    const depth = 760 + this.scrollProgress * 80;
    const scale = depth / (depth + z2);
    const centerX = this.width / 2 + (this.width * -0.1) * this.scrollProgress * handoff;
    const centerY = this.height / 2 + (this.height * -0.1) * this.scrollProgress * handoff;

    return {
      x: centerX + x1 * scale,
      y: centerY + y1 * scale,
      z: z2,
      scale,
      radius: node.radius * scale,
    };
  }

  drawField(time) {
    const centerX = this.width / 2 - this.width * 0.1 * this.scrollProgress;
    const centerY = this.height / 2 - this.height * 0.1 * this.scrollProgress;
    const radius = Math.max(this.width, this.height) * 0.52;
    const glow = this.context.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);

    glow.addColorStop(0, `rgba(29, 118, 104, ${0.12 + this.scrollProgress * 0.06})`);
    glow.addColorStop(0.45, "rgba(29, 118, 104, 0.045)");
    glow.addColorStop(1, "rgba(29, 118, 104, 0)");
    this.context.fillStyle = glow;
    this.context.fillRect(0, 0, this.width, this.height);

    this.context.save();
    this.context.translate(centerX, centerY);
    this.context.rotate(time * 0.045 + this.scrollProgress * 0.28);
    this.context.strokeStyle = "rgba(29, 118, 104, 0.04)";
    this.context.lineWidth = 1;

    for (let i = 0; i < 5; i += 1) {
      const size = 90 + i * 64 + this.scrollProgress * 34;
      this.context.beginPath();
      this.context.ellipse(0, 0, size * 1.32, size * 0.42, 0, 0, Math.PI * 2);
      this.context.stroke();
    }

    this.context.restore();
  }

  drawNetwork(time) {
    const projected = this.nodes.map((node) => this.project(node, time)).sort((a, b) => a.z - b.z);
    const edges = [];
    const maxDistance = 132 + this.scrollProgress * 24;

    for (let i = 0; i < projected.length; i += 1) {
      const a = projected[i];

      for (let j = i + 1; j < projected.length; j += 1) {
        const b = projected[j];
        const distance = Math.hypot(a.x - b.x, a.y - b.y);

        if (distance < maxDistance) {
          const alpha = (1 - distance / maxDistance) * 0.14 * Math.min(a.scale, b.scale);
          this.context.strokeStyle = `rgba(29, 118, 104, ${alpha})`;
          this.context.lineWidth = 0.85;
          this.context.beginPath();
          this.context.moveTo(a.x, a.y);
          this.context.lineTo(b.x, b.y);
          this.context.stroke();
          edges.push({ a, b, alpha, distance });
        }
      }
    }

    edges
      .filter((edge, index) => index % 3 === 0 && edge.distance > 32)
      .slice(0, 42)
      .forEach((edge, index) => {
        const offset = (time * (0.16 + (index % 5) * 0.022) + this.scrollProgress * 0.32 + index * 0.173) % 1;
        const x = edge.a.x + (edge.b.x - edge.a.x) * offset;
        const y = edge.a.y + (edge.b.y - edge.a.y) * offset;
        const packetSize = 1.1 + Math.min(edge.a.scale, edge.b.scale) * 1.4;

        this.context.fillStyle = `rgba(29, 118, 104, ${0.24 + edge.alpha * 1.8})`;
        this.context.fillRect(x - packetSize * 1.5, y - packetSize * 0.5, packetSize * 3, packetSize);
      });

    projected.forEach((node) => {
      const radius = Math.max(1.8, node.radius * 1.8);
      this.context.strokeStyle = `rgba(29, 118, 104, ${0.18 + node.scale * 0.14})`;
      this.context.lineWidth = 0.9;
      this.context.beginPath();
      this.context.arc(node.x, node.y, radius, 0, Math.PI * 2);
      this.context.stroke();
    });
  }

  animate(timestamp = 0) {
    const time = timestamp * 0.001;
    this.context.clearRect(0, 0, this.width, this.height);

    if (this.visibility > 0.01) {
      this.context.globalAlpha = this.visibility;
      this.drawField(time);
      this.drawNetwork(time);
      this.context.globalAlpha = 1;
    }

    this.frame = window.requestAnimationFrame(this.animate);
  }
}

class ScrollAtmosphereFallback {
  constructor() {
    this.ticking = false;
    this.update = this.update.bind(this);
    this.requestUpdate = this.requestUpdate.bind(this);

    this.update();
    window.addEventListener("scroll", this.requestUpdate, { passive: true });
    window.addEventListener("resize", this.requestUpdate);
  }

  requestUpdate() {
    if (this.ticking) return;
    this.ticking = true;
    window.requestAnimationFrame(this.update);
  }

  update() {
    const scrollY = window.scrollY || window.pageYOffset || 0;
    const heroHeight = document.querySelector(".hero")?.offsetHeight || window.innerHeight;
    const afterHero = Math.max(0, (scrollY - heroHeight * 0.48) / (heroHeight * 0.5));
    const alpha = Math.min(0.72, afterHero * 0.72);

    root.style.setProperty("--scroll-alpha", alpha.toFixed(3));
    this.ticking = false;
  }
}

if (scrollAtmosphereCanvas && !prefersReducedMotion.matches) {
  new ScrollAtmosphereNetwork(scrollAtmosphereCanvas);
} else {
  new ScrollAtmosphereFallback();
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealTargets.forEach((target) => revealObserver.observe(target));

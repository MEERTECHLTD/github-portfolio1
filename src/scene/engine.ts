/* The systems map, live. Projects are nodes, domains are hubs, and a system
   that spans two domains sits between them. Hover a node to see what it is;
   select it to open its case study. About ten draw calls, no textures. */
import {
  AdditiveBlending, BufferAttribute, BufferGeometry, Color, DynamicDrawUsage, Fog, Group, LineBasicMaterial, LineSegments,
  PerspectiveCamera, Points, Scene, ShaderMaterial, Vector3, WebGLRenderer,
} from "three";
import { buildMap, type MapNode } from "./layout";

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const damp = (c: number, t: number, l: number, dt: number) => c + (t - c) * (1 - Math.exp(-l * dt));
const css = (name: string, fb: string) => { const c = new Color(); try { c.set(getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fb); } catch { c.set(fb); } return c; };

const nodeVert = /* glsl */ `
  attribute float aSize; attribute vec3 aColor; attribute float aGlow;
  uniform float uScale;
  varying vec3 vColor; varying float vGlow;
  void main() {
    vColor = aColor; vGlow = aGlow;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * uScale / -mv.z;
    gl_Position = projectionMatrix * mv;
  }`;
const nodeFrag = /* glsl */ `
  precision mediump float;
  varying vec3 vColor; varying float vGlow;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float core = smoothstep(0.2, 0.17, d);
    float ring = smoothstep(0.035, 0.0, abs(d - 0.33)) * (0.35 + vGlow);
    float halo = smoothstep(0.5, 0.1, d) * (0.1 + vGlow * 0.45);
    float a = core + ring + halo;
    if (a < 0.01) discard;
    gl_FragColor = vec4(vColor * (0.85 + vGlow * 0.6), a);
  }`;

export interface MapEvents { onHover?: (node: MapNode | null, x: number, y: number) => void; onSelect?: (node: MapNode) => void }

export class SystemsMap {
  readonly canvas = document.createElement("canvas");
  private renderer: WebGLRenderer;
  private scene = new Scene();
  private camera = new PerspectiveCamera(30, 1, 0.5, 120);
  private root = new Group();
  private nodes: MapNode[];
  private edges: { a: number; b: number; primary: boolean }[];
  private geo = new BufferGeometry();
  private mat: ShaderMaterial;
  private edgeGeo = new BufferGeometry();
  private pulseGeo = new BufferGeometry();
  private glow: number[];
  private host: HTMLElement;
  private labels: HTMLElement[] = [];
  private running = false; private raf = 0; private last = 0; private time = 0;
  private reduced: boolean;
  private az = 0.62; private el = 0.6; private userAz = 0; private userEl = 0;
  private px = 0; private py = 0; private tx = 0; private ty = 0;
  private drag: { id: number; x: number; y: number; az: number; el: number; moved: boolean } | null = null;
  private hover = -1; private filter: string | null = null;
  private events: MapEvents;
  private col = { ink: new Color(), ink3: new Color(), mark: new Color(), ok: new Color(), cool: new Color(), bg: new Color() };
  private slow = { n: 0, t: 0, stage: 0 };
  private v = new Vector3();
  private screen: { x: number; y: number; z: number }[] = [];

  constructor(host: HTMLElement, opts: { reduced: boolean; lowPower: boolean; events?: MapEvents }) {
    this.host = host; this.reduced = opts.reduced; this.events = opts.events ?? {};
    const map = buildMap();
    this.nodes = map.nodes; this.edges = map.edges;
    this.glow = this.nodes.map(() => 0);
    this.canvas.className = "sm-canvas";
    this.canvas.setAttribute("aria-hidden", "true");
    this.renderer = new WebGLRenderer({ canvas: this.canvas, antialias: !opts.lowPower, alpha: true, powerPreference: "high-performance", stencil: false, failIfMajorPerformanceCaveat: true });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio || 1, opts.lowPower ? 1.5 : 2));
    this.renderer.setClearAlpha(0);
    for (const k of ["ink", "ink3", "mark", "ok", "cool", "bg"] as const) this.col[k].copy(css({ ink: "--ink", ink3: "--ink-3", mark: "--mark", ok: "--ok", cool: "--cool", bg: "--bg" }[k], "#ffffff"));
    this.scene.fog = new Fog(this.col.bg.getHex(), 22, 46);
    this.scene.add(this.root);

    const n = this.nodes.length;
    const pos = new Float32Array(n * 3), size = new Float32Array(n);
    this.nodes.forEach((nd, i) => { pos.set([nd.x, nd.y, nd.z], i * 3); size[i] = nd.kind === "hub" ? 2.5 : 1.25 + nd.r * 4.2; });
    this.geo.setAttribute("position", new BufferAttribute(pos, 3));
    this.geo.setAttribute("aSize", new BufferAttribute(size, 1));
    this.geo.setAttribute("aColor", new BufferAttribute(new Float32Array(n * 3), 3).setUsage(DynamicDrawUsage));
    this.geo.setAttribute("aGlow", new BufferAttribute(new Float32Array(n), 1).setUsage(DynamicDrawUsage));
    this.mat = new ShaderMaterial({ vertexShader: nodeVert, fragmentShader: nodeFrag, transparent: true, depthWrite: false, uniforms: { uScale: { value: 300 } } });
    const pts = new Points(this.geo, this.mat); pts.frustumCulled = false;

    const e = new Float32Array(this.edges.length * 6);
    this.edges.forEach((ed, i) => { const a = this.nodes[ed.a]!, b = this.nodes[ed.b]!; e.set([a.x, a.y, a.z, b.x, b.y, b.z], i * 6); });
    this.edgeGeo.setAttribute("position", new BufferAttribute(e, 3));
    this.edgeGeo.setAttribute("color", new BufferAttribute(new Float32Array(this.edges.length * 6), 3).setUsage(DynamicDrawUsage));
    const lines = new LineSegments(this.edgeGeo, new LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.9 }));

    // One pulse per primary edge: work flowing from each system into its domain.
    const prim = this.edges.filter((x) => x.primary);
    this.pulseGeo.setAttribute("position", new BufferAttribute(new Float32Array(prim.length * 3), 3).setUsage(DynamicDrawUsage));
    this.pulseGeo.setAttribute("aSize", new BufferAttribute(new Float32Array(prim.length).fill(0.55), 1));
    this.pulseGeo.setAttribute("aColor", new BufferAttribute(new Float32Array(prim.length * 3).map((_, i) => [this.col.mark.r, this.col.mark.g, this.col.mark.b][i % 3]!), 3));
    this.pulseGeo.setAttribute("aGlow", new BufferAttribute(new Float32Array(prim.length).fill(0.6), 1));
    const pulses = new Points(this.pulseGeo, new ShaderMaterial({ vertexShader: nodeVert, fragmentShader: nodeFrag, transparent: true, depthWrite: false, blending: AdditiveBlending, uniforms: this.mat.uniforms }));
    pulses.frustumCulled = false;
    // Orbit rings around each hub: the reach of a domain, drawn like a plan.
    const ring: number[] = [];
    this.nodes.filter((nd) => nd.kind === "hub").forEach((hb) => {
      for (const r of [1.6, 3.3]) for (let k = 0; k < 72; k++) {
        const a = (k / 72) * Math.PI * 2, b = ((k + 1) / 72) * Math.PI * 2;
        if (r > 2 && k % 2) continue; // outer ring dashed
        ring.push(hb.x + Math.cos(a) * r, hb.y, hb.z + Math.sin(a) * r, hb.x + Math.cos(b) * r, hb.y, hb.z + Math.sin(b) * r);
      }
    });
    const ringGeo = new BufferGeometry(); ringGeo.setAttribute("position", new BufferAttribute(new Float32Array(ring), 3));
    const rings = new LineSegments(ringGeo, new LineBasicMaterial({ color: this.col.ink, transparent: true, opacity: 0.09 }));
    this.root.add(rings, lines, pts, pulses);

    host.prepend(this.canvas);
    host.querySelectorAll<HTMLElement>("[data-sm-label]").forEach((l) => { const i = this.nodes.findIndex((nd) => nd.id === l.dataset.smLabel); if (i >= 0) { this.labels[i] = l; } });
    new ResizeObserver(() => this.resize()).observe(host);
    new IntersectionObserver((en) => (en.some((x) => x.isIntersecting) ? this.start() : this.stop()), { rootMargin: "100px" }).observe(host);
    document.addEventListener("visibilitychange", () => (document.hidden ? this.stop() : this.start()));
    const c = this.canvas;
    c.style.touchAction = "pan-y";
    c.addEventListener("pointermove", (ev) => this.move(ev));
    c.addEventListener("pointerdown", (ev) => { this.drag = { id: ev.pointerId, x: ev.clientX, y: ev.clientY, az: this.userAz, el: this.userEl, moved: false }; if (ev.pointerType === "mouse") c.setPointerCapture(ev.pointerId); });
    c.addEventListener("pointerup", (ev) => { const d = this.drag; this.drag = null; if (d && !d.moved) { const i = this.pick(ev); if (i >= 0 && this.nodes[i]!.kind === "project") this.events.onSelect?.(this.nodes[i]!); } });
    c.addEventListener("pointercancel", () => { this.drag = null; });
    c.addEventListener("pointerleave", () => { this.tx = 0; this.ty = 0; this.setHover(-1, 0, 0); });
    c.addEventListener("webglcontextlost", (ev) => { ev.preventDefault(); this.stop(); host.classList.remove("sm-live"); });
    this.resize();
    this.paint(0);
  }

  setFilter(domain: string | null) { this.filter = domain; this.kick(); }
  focusNode(id: string | null) { this.setHover(id ? this.nodes.findIndex((n) => n.id === id) : -1, 0, 0, true); }

  private resize() {
    const w = this.host.clientWidth, h = this.host.clientHeight;
    if (!w || !h) return;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h; this.camera.updateProjectionMatrix();
    this.mat.uniforms.uScale!.value = h * this.renderer.getPixelRatio() * 0.9;
    this.kick();
  }
  private local(ev: PointerEvent) { const r = this.canvas.getBoundingClientRect(); return { x: ev.clientX - r.left, y: ev.clientY - r.top, w: r.width, h: r.height }; }
  private pick(ev: PointerEvent): number {
    const p = this.local(ev); let best = -1, bd = 26 * 26;
    this.screen.forEach((s, i) => { if (s.z > 1) return; const d = (s.x - p.x) ** 2 + (s.y - p.y) ** 2; if (d < bd) { bd = d; best = i; } });
    return best;
  }
  private move(ev: PointerEvent) {
    const p = this.local(ev);
    this.tx = (p.x / p.w) * 2 - 1; this.ty = (p.y / p.h) * 2 - 1;
    if (this.drag && this.drag.id === ev.pointerId) {
      const dx = ev.clientX - this.drag.x, dy = ev.clientY - this.drag.y;
      if (Math.abs(dx) + Math.abs(dy) > 5) this.drag.moved = true;
      this.userAz = this.drag.az - dx * 0.006;
      if (ev.pointerType === "mouse") this.userEl = clamp(this.drag.el + dy * 0.003, -0.3, 0.5);
    } else if (ev.pointerType === "mouse") { const i = this.pick(ev); this.setHover(i, p.x, p.y); }
    this.kick();
  }
  private setHover(i: number, x: number, y: number, silent = false) {
    if (i === this.hover && silent) return;
    this.hover = i;
    this.canvas.style.cursor = i >= 0 && this.nodes[i]!.kind === "project" ? "pointer" : "grab";
    if (!silent) { const s = this.screen[i]; this.events.onHover?.(i >= 0 ? this.nodes[i]! : null, s ? s.x : x, s ? s.y : y); }
    this.kick();
  }

  private start() {
    if (this.running) return;
    if (this.reduced) { this.kick(); return; }
    this.running = true; this.last = performance.now();
    const tick = (now: number) => {
      if (!this.running) return;
      const raw = (now - this.last) / 1000; this.last = now;
      if (this.guard(raw)) return;
      this.paint(Math.min(0.05, raw));
      this.raf = requestAnimationFrame(tick);
    };
    this.raf = requestAnimationFrame(tick);
  }
  private stop() { this.running = false; cancelAnimationFrame(this.raf); }
  private pending = false;
  private kick() { if (this.running || this.pending) return; this.pending = true; requestAnimationFrame(() => { this.pending = false; this.paint(this.reduced ? 10 : 0.016); }); }
  /* If the device cannot hold about 24 frames a second: lower resolution, then stop animating. */
  private guard(frame: number): boolean {
    const g = this.slow; if (g.stage > 1 || frame > 0.5) return false;
    g.n++; g.t += frame; if (g.n < 40) return false;
    const avg = g.t / g.n; g.n = 0; g.t = 0; if (avg < 0.042) return false;
    g.stage++;
    if (g.stage === 1) { this.renderer.setPixelRatio(1); this.resize(); return false; }
    this.reduced = true; this.stop(); this.kick(); return true;
  }

  private paint(dt: number) {
    if (!this.reduced) this.time += dt;
    const colA = this.geo.attributes.aColor as BufferAttribute, glowA = this.geo.attributes.aGlow as BufferAttribute;
    const h = this.hover, hn = h >= 0 ? this.nodes[h]! : null;
    const linked = new Set<number>();
    if (h >= 0) this.edges.forEach((e) => { if (e.a === h) linked.add(e.b); if (e.b === h) linked.add(e.a); });
    this.nodes.forEach((n, i) => {
      const inFilter = !this.filter || n.domains.includes(this.filter as never);
      const on = i === h || linked.has(i);
      const target = on ? 1 : hn || !inFilter ? 0 : n.kind === "hub" ? 0.35 : 0.12;
      this.glow[i] = damp(this.glow[i]!, target, 8, dt);
      const base = n.kind === "hub" ? this.col.ink : n.status === "production" ? this.col.ok : n.status === "substantial" ? this.col.cool : this.col.ink3;
      const c = i === h ? this.col.mark : base;
      const dim = (hn && !on) || !inFilter ? 0.28 : 1;
      colA.setXYZ(i, c.r * dim, c.g * dim, c.b * dim);
      glowA.setX(i, this.glow[i]!);
      const l = this.labels[i];
      if (l) l.classList.toggle("on", i === h || (n.kind === "hub" && (!this.filter || inFilter)) || (linked.has(i) && n.kind === "project") || (!hn && inFilter && l.dataset.pin === "1"));
    });
    colA.needsUpdate = glowA.needsUpdate = true;
    const ec = this.edgeGeo.attributes.color as BufferAttribute;
    this.edges.forEach((e, i) => {
      const on = e.a === h || e.b === h;
      const inF = !this.filter || (this.nodes[e.a]!.domains.includes(this.filter as never) && this.nodes[e.b]!.domains.includes(this.filter as never));
      const c = on ? this.col.mark : this.col.ink;
      const k = on ? 0.95 : (hn ? 0.06 : e.primary ? 0.3 : 0.14) * (inF ? 1 : 0.3);
      ec.setXYZ(i * 2, c.r * k, c.g * k, c.b * k); ec.setXYZ(i * 2 + 1, c.r * k, c.g * k, c.b * k);
    });
    ec.needsUpdate = true;
    const pp = this.pulseGeo.attributes.position as BufferAttribute;
    this.edges.filter((x) => x.primary).forEach((e, i) => {
      const a = this.nodes[e.a]!, b = this.nodes[e.b]!;
      const t = (this.time * 0.16 + i * 0.37) % 1, u = t * t * (3 - 2 * t);
      pp.setXYZ(i, a.x + (b.x - a.x) * u, a.y + (b.y - a.y) * u, a.z + (b.z - a.z) * u);
    });
    pp.needsUpdate = true;

    this.px = damp(this.px, this.tx, 4, dt); this.py = damp(this.py, this.ty, 4, dt);
    const narrow = clamp((1.25 - this.camera.aspect) / 0.7, 0, 1);
    const drift = this.reduced ? 0 : this.time * 0.035;
    this.az = damp(this.az, 0.62 + drift + this.userAz + (this.drag ? 0 : this.px * -0.12), 3.5, dt);
    this.el = damp(this.el, clamp(0.6 + this.userEl + (this.drag ? 0 : this.py * 0.05), 0.1, 1.0), 3.5, dt);
    const dist = 26 + narrow * 12, ce = Math.cos(this.el);
    this.camera.position.set(Math.sin(this.az) * ce * dist, Math.sin(this.el) * dist, Math.cos(this.az) * ce * dist);
    this.camera.lookAt(0, 0, 0);
    this.renderer.render(this.scene, this.camera);

    const w = this.host.clientWidth, hgt = this.host.clientHeight;
    this.nodes.forEach((n, i) => {
      const v = this.v.set(n.x, n.y, n.z).project(this.camera);
      const s = (this.screen[i] = { x: (v.x * 0.5 + 0.5) * w, y: (-v.y * 0.5 + 0.5) * hgt, z: v.z });
      const l = this.labels[i];
      if (l) l.style.transform = `translate3d(${s.x.toFixed(1)}px, ${s.y.toFixed(1)}px, 0)`;
    });
  }
}

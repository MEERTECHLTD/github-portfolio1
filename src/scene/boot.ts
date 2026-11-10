/* Starts the live systems map when it is worth starting. The static SVG map
   is already in the page (with a real link on every node), so nothing is lost
   if this never runs: no WebGL, software rendering, reduced data or a script
   error all leave the SVG in place. */
import type { SystemsMap } from "./engine";
import type { MapNode } from "./layout";

const host = document.querySelector<HTMLElement>("[data-sm-host]");
const tip = document.querySelector<HTMLElement>("[data-sm-tip]");
let map: SystemsMap | null = null;

function ok(): boolean {
  try {
    const c = document.createElement("canvas");
    const gl = (c.getContext("webgl2", { failIfMajorPerformanceCaveat: true }) || c.getContext("webgl", { failIfMajorPerformanceCaveat: true })) as WebGLRenderingContext | null;
    if (!gl) return false;
    const info = gl.getExtension("WEBGL_debug_renderer_info");
    const r = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : "";
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return !/swiftshader|llvmpipe|software|basic render/i.test(r);
  } catch { return false; }
}
const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
const lowPower = matchMedia("(max-width: 760px)").matches || (navigator.hardwareConcurrency ?? 8) <= 4;
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

async function load() {
  if (map || !host || !ok() || conn?.saveData) return;
  try {
    const { SystemsMap } = await import("./engine");
    map = new SystemsMap(host, {
      reduced, lowPower,
      events: {
        onHover: (n: MapNode | null, x: number, y: number) => {
          if (!tip) return;
          if (!n || n.kind !== "project") { tip.hidden = true; return; }
          tip.hidden = false;
          tip.querySelector("[data-n]")!.textContent = n.label;
          tip.querySelector("[data-s]")!.textContent = n.statusLabel ?? "";
          tip.style.transform = `translate3d(${Math.round(x + 14)}px, ${Math.round(y + 14)}px, 0)`;
        },
        onSelect: (n: MapNode) => { if (n.href) location.href = n.href; },
      },
    });
    host.classList.add("sm-live");
    document.querySelectorAll<HTMLButtonElement>("[data-sm-filter]").forEach((b) =>
      b.addEventListener("click", () => {
        const on = b.getAttribute("aria-pressed") === "true";
        document.querySelectorAll("[data-sm-filter]").forEach((x) => x.setAttribute("aria-pressed", "false"));
        b.setAttribute("aria-pressed", String(!on));
        map?.setFilter(on ? null : b.dataset.smFilter!);
      }),
    );
    // Hovering a project in the page lights its node on the map.
    document.querySelectorAll<HTMLElement>("[data-sm-node]").forEach((el) => {
      el.addEventListener("pointerenter", () => map?.focusNode(el.dataset.smNode!));
      el.addEventListener("pointerleave", () => map?.focusNode(null));
    });
  } catch (err) {
    console.warn("[portfolio] live systems map unavailable; the static map stays.", err);
  }
}
if (host) {
  const idle = (cb: () => void) => ("requestIdleCallback" in window ? requestIdleCallback(cb, { timeout: 1800 }) : setTimeout(cb, 400));
  const afterLoad = (cb: () => void) => (document.readyState === "complete" ? cb() : addEventListener("load", cb, { once: true }));
  if (lowPower) {
    const ev = ["pointerdown", "touchstart", "keydown", "scroll", "wheel"] as const;
    const go = () => { ev.forEach((e) => removeEventListener(e, go)); afterLoad(() => idle(load)); };
    ev.forEach((e) => addEventListener(e, go, { passive: true, once: true }));
  } else afterLoad(() => idle(load));
}

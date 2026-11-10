/** Fixed ambient backdrop: deep ink + aurora blooms + fine grid + film grain. */
export function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink">
      {/* aurora blooms */}
      <div className="absolute -left-[10%] -top-[15%] h-[55vh] w-[55vh] rounded-full bg-accent-indigo/20 blur-[120px] animate-aurora" />
      <div
        className="absolute right-[-10%] top-[5%] h-[50vh] w-[50vh] rounded-full bg-accent-teal/15 blur-[130px] animate-aurora"
        style={{ animationDelay: '-6s' }}
      />
      <div
        className="absolute bottom-[-15%] left-[30%] h-[45vh] w-[45vh] rounded-full bg-accent-fuchsia/10 blur-[140px] animate-aurora"
        style={{ animationDelay: '-12s' }}
      />
      {/* grid */}
      <div className="absolute inset-0 grid-bg radial-fade opacity-60" />
      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.55))]" />
      {/* grain */}
      <div className="absolute inset-0 noise opacity-[0.025] mix-blend-soft-light" />
    </div>
  )
}

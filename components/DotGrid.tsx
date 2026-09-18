/**
 * A faint dot-grid, used as a uniform background texture across otherwise
 * empty page areas (About hero, section backgrounds). Meant to be nearly
 * subliminal — evokes a data grid/scatter field without competing with
 * content. Same component everywhere for visual consistency.
 */
export default function DotGrid({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    >
      <defs>
        <pattern id="dot-grid" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.5" fill="var(--muted)" />
        </pattern>
        <radialGradient id="dot-fade" cx="50%" cy="30%" r="75%">
          <stop offset="0%" stopColor="white" stopOpacity="0.9" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="dot-mask">
          <rect width="100%" height="100%" fill="url(#dot-fade)" />
        </mask>
      </defs>
      <rect width="100%" height="100%" fill="url(#dot-grid)" opacity="0.35" mask="url(#dot-mask)" />
    </svg>
  );
}

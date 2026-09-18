/**
 * A large "Data Scientist" wordmark rendered behind the hero photo.
 *
 * Deliberately the one big motion moment on the page (per the request to
 * make this specific element large and eye-catching) — a slow gradient
 * sweep across outlined type, evoking a signal passing through, in the
 * same signal/amber palette used throughout. Kept low-opacity and behind
 * the photo so it reads as background art rather than competing with the
 * actual heading text.
 */
export default function HeroWordmark() {
  return (
    <p
      aria-hidden="true"
      className="pointer-events-none select-none whitespace-nowrap font-display text-[5rem] font-semibold leading-none tracking-tight opacity-[0.16] animate-[text-shimmer_10s_linear_infinite] bg-clip-text text-transparent sm:text-[7rem] lg:text-[8.5rem]"
      style={{
        backgroundImage:
          "linear-gradient(90deg, var(--signal) 0%, var(--amber) 25%, var(--signal) 50%, var(--amber) 75%, var(--signal) 100%)",
        backgroundSize: "200% 100%",
      }}
    >
      Data Scientist
    </p>
  );
}

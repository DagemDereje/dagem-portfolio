"use client";

import { useRef, useState, useEffect } from "react";

type EmbedStatus = "idle" | "loading" | "loaded" | "slow";

export interface LiveAppEmbedProps {
  /** Base URL of the deployed Streamlit app, e.g. https://my-app.streamlit.app */
  appUrl: string;
  /** Display name used in headings, button labels, and the iframe's accessible title */
  appName: string;
  /** Short description shown in the preview card before the app loads */
  description: string;
  /** Optional screenshot/preview image shown before the app loads */
  previewImageSrc?: string;
  /** Iframe height in pixels. Streamlit apps generally need real vertical space. */
  height?: number;
  /**
   * How long to wait for the iframe to report itself loaded before showing
   * a "this is taking a while" message. Streamlit Cloud free-tier apps that
   * have been asleep can take up to ~30-60s to wake, so this is intentionally
   * generous. Defaults to 45 seconds.
   */
  wakeTimeoutMs?: number;
}

/**
 * Embeds a deployed Streamlit Community Cloud app inside a portfolio page.
 *
 * Design notes (read before changing behavior):
 *
 * - The iframe is only created after the visitor clicks "Try Interactive
 *   Demo" (lazy loading) — never on initial page load.
 * - Streamlit Community Cloud officially supports iframe embedding for
 *   PUBLIC apps via the `?embedded=true` query parameter, which also hides
 *   Streamlit's own chrome (menu, footer, "made with Streamlit" badge).
 *   See: https://docs.streamlit.io/deploy/streamlit-community-cloud/share-your-app/embed-your-app
 * - IMPORTANT LIMITATION: a browser deliberately does not tell the parent
 *   page *why* an iframe failed to render (blocked by X-Frame-Options/CSP,
 *   blocked by third-party-cookie settings, etc.) — that information is
 *   withheld for cross-origin security reasons. This component therefore
 *   cannot reliably distinguish "still waking up" from "actually blocked."
 *   It uses a generous timeout as an honest proxy for "this is taking too
 *   long," not a real diagnosis, and always offers the direct-link fallback
 *   rather than asserting a definitive error it can't actually confirm.
 * - Sleeping Streamlit apps have a documented quirk where waking up via an
 *   iframe is less reliable than a direct navigation (community reports of
 *   a stuck "redirected too many times" state). The fallback link exists
 *   specifically to route around this when it happens.
 */
export default function LiveAppEmbed({
  appUrl,
  appName,
  description,
  previewImageSrc,
  height = 800,
  wakeTimeoutMs = 45000,
}: LiveAppEmbedProps) {
  const [status, setStatus] = useState<EmbedStatus>("idle");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const embedUrl = `${appUrl}${appUrl.includes("?") ? "&" : "?"}embedded=true`;

  const handleTryDemo = () => {
    setStatus("loading");
  };

  useEffect(() => {
    if (status !== "loading") return;
    timeoutRef.current = setTimeout(() => {
      setStatus((current) => (current === "loading" ? "slow" : current));
    }, wakeTimeoutMs);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [status, wakeTimeoutMs]);

  const handleIframeLoad = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setStatus("loaded");
  };

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      {/* Header — always visible regardless of embed state */}
      <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4">
        <div className="flex items-center gap-2">
          <span
            className={`h-2 w-2 rounded-full ${status === "loaded" ? "bg-signal" : "bg-border"}`}
            aria-hidden="true"
          />
          <h3 className="font-display text-sm font-semibold text-ink">
            Try {appName}
          </h3>
        </div>
        <a
          href={appUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-muted underline-offset-2 hover:text-ink hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal rounded"
        >
          Open Full Application ↗
        </a>
      </div>

      {/* Preview state — nothing has been loaded yet */}
      {status === "idle" && (
        <div className="p-6">
          {previewImageSrc && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={previewImageSrc}
              alt={`Screenshot of the ${appName} application`}
              className="mb-4 w-full rounded-lg border border-border object-cover"
              loading="lazy"
            />
          )}
          <p className="mb-4 text-sm text-muted">{description}</p>
          <button
            type="button"
            onClick={handleTryDemo}
            className="inline-flex items-center gap-2 rounded-lg bg-ink px-4 py-2.5 text-sm font-semibold text-paper transition hover:bg-signal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
          >
            Try Interactive Demo
          </button>
          <p className="mt-2 text-xs text-muted">
            Loads the real deployed application below. If it doesn&apos;t
            finish loading within a minute or so, use &quot;Open Full
            Application&quot; above — that tends to wake a sleeping app
            more reliably than waiting here.
          </p>
        </div>
      )}

      {/* Loading / slow / loaded states — iframe is mounted for all three
          so it keeps loading in the background even while we show a
          status message on top of it. */}
      {(status === "loading" || status === "slow" || status === "loaded") && (
        <div className="relative" style={{ height }}>
          {status !== "loaded" && (
            <div
              className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-surface px-6 text-center"
              role="status"
              aria-live="polite"
            >
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-signal" />
              {status === "loading" ? (
                <p className="max-w-sm text-sm text-muted">
                  Starting the interactive demo… if this takes longer than
                  about a minute, use &quot;Open Full Application ↗&quot;
                  above instead.
                </p>
              ) : (
                <div className="max-w-sm space-y-3">
                  <p className="text-sm text-muted">
                    This is taking longer than usual — the app may be
                    waking up from sleep. You can keep waiting, or open it
                    directly instead.
                  </p>
                  <a
                    href={appUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-semibold text-ink transition hover:border-signal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
                  >
                    Open Full Application ↗
                  </a>
                </div>
              )}
            </div>
          )}
          <iframe
            src={embedUrl}
            title={`${appName} — live interactive application`}
            onLoad={handleIframeLoad}
            className="h-full w-full border-0"
            allow="clipboard-write"
          />
        </div>
      )}
    </div>
  );
}

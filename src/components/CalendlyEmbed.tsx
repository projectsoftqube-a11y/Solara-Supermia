import { useEffect, useRef } from "react";

const CALENDLY_SCRIPT = "https://assets.calendly.com/assets/external/widget.js";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (opts: { url: string; parentElement: HTMLElement }) => void;
    };
  }
}

type CalendlyEmbedProps = {
  /** Full Calendly scheduling URL, e.g. https://calendly.com/solara-supermia/30min */
  url: string;
  className?: string;
  /**
   * Fired once the invitee completes a booking. Use this to route to a
   * confirmation page yourself — it avoids Calendly's "You are leaving
   * Calendly" interstitial, which the dashboard redirect always shows for
   * embedded widgets.
   */
  onEventScheduled?: () => void;
};

function isCalendlyEvent(e: MessageEvent): boolean {
  return (
    typeof e.origin === "string" &&
    e.origin.includes("calendly.com") &&
    typeof e.data === "object" &&
    e.data !== null &&
    "event" in e.data
  );
}

/**
 * Inline Calendly scheduler.
 *
 * The widget script is injected once and shared across mounts. We call
 * initInlineWidget() ourselves rather than relying on the script's own
 * auto-scan, because that scan only runs on first load — on client-side
 * route changes the widget would otherwise render blank.
 */
export function CalendlyEmbed({ url, className = "", onEventScheduled }: CalendlyEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Keep the latest callback without re-subscribing the message listener.
  const onScheduledRef = useRef(onEventScheduled);
  onScheduledRef.current = onEventScheduled;

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (isCalendlyEvent(e) && e.data.event === "calendly.event_scheduled") {
        onScheduledRef.current?.();
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const init = () => {
      if (cancelled || !containerRef.current || !window.Calendly) return;
      containerRef.current.innerHTML = "";
      window.Calendly.initInlineWidget({ url, parentElement: containerRef.current });
    };

    if (window.Calendly) {
      init();
      return () => {
        cancelled = true;
      };
    }

    let script = document.querySelector<HTMLScriptElement>(`script[src="${CALENDLY_SCRIPT}"]`);
    if (!script) {
      script = document.createElement("script");
      script.src = CALENDLY_SCRIPT;
      script.async = true;
      document.body.appendChild(script);
    }
    script.addEventListener("load", init);

    return () => {
      cancelled = true;
      script?.removeEventListener("load", init);
    };
  }, [url]);

  return (
    <div
      ref={containerRef}
      className={`calendly-inline-widget w-full min-w-0 ${className}`}
      data-url={url}
    />
  );
}

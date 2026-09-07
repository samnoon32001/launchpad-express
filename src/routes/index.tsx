import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Launch — Cinematic Website Launcher" },
      {
        name: "description",
        content:
          "Enter any website URL and experience a cinematic countdown before launch. Minimal, smooth, and premium.",
      },
      { property: "og:title", content: "Launch — Cinematic Website Launcher" },
      {
        property: "og:description",
        content:
          "Enter any website URL and experience a cinematic countdown before launch.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: LaunchPage,
});

type Phase = "idle" | "countdown" | "launching";

const COUNTDOWN_FROM = 10;

function normalizeUrl(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const withProtocol = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;
  try {
    const url = new URL(withProtocol);
    if (!url.hostname.includes(".")) return null;
    return url.toString();
  } catch {
    return null;
  }
}

function LaunchPage() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [count, setCount] = useState(COUNTDOWN_FROM);
  const targetRef = useRef<string | null>(null);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      timersRef.current.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  useEffect(() => {
    if (phase !== "countdown") return;
    if (count === 0) {
      const t = window.setTimeout(() => setPhase("launching"), 900);
      timersRef.current.push(t);
      return;
    }
    const t = window.setTimeout(() => setCount((c) => c - 1), 1000);
    timersRef.current.push(t);
  }, [phase, count]);

  useEffect(() => {
    if (phase !== "launching") return;
    const t = window.setTimeout(() => {
      if (targetRef.current) window.location.href = targetRef.current;
    }, 1800);
    timersRef.current.push(t);
  }, [phase]);

  const launch = () => {
    const normalized = normalizeUrl(url);
    if (!url.trim()) {
      setError("Please enter a website URL.");
      return;
    }
    if (!normalized) {
      setError("That doesn't look like a valid URL. Try something like example.com");
      return;
    }
    setError("");
    targetRef.current = normalized;
    setCount(COUNTDOWN_FROM);
    setPhase("countdown");
  };

  return (
    <main className="launch-stage">
      {/* Ambient background glow */}
      <div className="glow glow-a" aria-hidden />
      <div className="glow glow-b" aria-hidden />
      <div className="grain" aria-hidden />

      {/* Input screen */}
      <section
        className={`panel ${phase === "idle" ? "panel-show" : "panel-hide"}`}
        aria-hidden={phase !== "idle"}
      >
        <p className="eyebrow">Prepare for liftoff</p>
        <h1 className="title">Launch your website</h1>
        <p className="subtitle">
          Enter a destination and we&apos;ll count you down.
        </p>

        <div className="launch-form">
          <input
            type="url"
            inputMode="url"
            placeholder="Enter website URL"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              if (error) setError("");
            }}
            onKeyDown={(e) => e.key === "Enter" && launch()}
            className={`url-input ${error ? "url-input-error" : ""}`}
            aria-label="Website URL"
            aria-invalid={!!error}
          />
          <button type="button" onClick={launch} className="launch-button">
            LAUNCH
          </button>
        </div>
        <p className={`error-text ${error ? "error-visible" : ""}`} role="alert">
          {error || "\u00A0"}
        </p>
      </section>

      {/* Countdown screen */}
      <section
        className={`panel countdown-panel ${
          phase === "countdown" ? "panel-show" : "panel-hide"
        }`}
        aria-hidden={phase !== "countdown"}
      >
        {phase === "countdown" && count > 0 && (
          <div key={count} className="count-number">
            {count}
          </div>
        )}
        {phase === "countdown" && count === 0 && (
          <div key="zero" className="count-number count-zero">
            0
          </div>
        )}
      </section>

      {/* Launching screen */}
      <section
        className={`panel ${phase === "launching" ? "panel-show" : "panel-hide"}`}
        aria-hidden={phase !== "launching"}
      >
        <div className="launching-text">
          {"LAUNCHING".split("").map((ch, i) => (
            <span key={i} style={{ animationDelay: `${i * 70}ms` }}>
              {ch}
            </span>
          ))}
          <span className="dots">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </span>
        </div>
        <div className="launch-ring" aria-hidden />
      </section>
    </main>
  );
}

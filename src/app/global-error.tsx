"use client";

import type { CSSProperties } from "react";

/**
 * Last-resort boundary for errors thrown by the root layout itself. It replaces
 * the whole document, so it carries its own minimal styles instead of relying
 * on globals.css.
 */
export default function GlobalError({ retry }: { error: unknown; retry: () => void }) {
  return (
    <html lang="en">
      <body style={styles.body}>
        <title>This page didn't load</title>
        <div style={styles.card}>
          <h1 style={styles.heading}>This page didn't load</h1>
          <p style={styles.text}>
            Something went wrong on our end. You can try refreshing or head back home.
          </p>
          <div style={styles.actions}>
            <button onClick={() => retry()} style={{ ...styles.button, ...styles.primary }}>
              Try again
            </button>
            {/* A plain anchor on purpose: the router may be what failed. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/" style={{ ...styles.button, ...styles.secondary }}>
              Go home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}

const styles = {
  body: {
    font: "15px/1.5 system-ui, -apple-system, sans-serif",
    background: "#fafafa",
    color: "#111",
    display: "grid",
    placeItems: "center",
    minHeight: "100vh",
    margin: 0,
    padding: "1.5rem",
  },
  card: { maxWidth: "28rem", width: "100%", textAlign: "center", padding: "2rem" },
  heading: { fontSize: "1.25rem", margin: "0 0 0.5rem" },
  text: { color: "#4b5563", margin: "0 0 1.5rem" },
  actions: { display: "flex", gap: "0.5rem", justifyContent: "center", flexWrap: "wrap" },
  button: {
    padding: "0.5rem 1rem",
    borderRadius: "0.375rem",
    font: "inherit",
    cursor: "pointer",
    textDecoration: "none",
    border: "1px solid transparent",
  },
  primary: { background: "#111", color: "#fff" },
  secondary: { background: "#fff", color: "#111", borderColor: "#d1d5db" },
} satisfies Record<string, CSSProperties>;

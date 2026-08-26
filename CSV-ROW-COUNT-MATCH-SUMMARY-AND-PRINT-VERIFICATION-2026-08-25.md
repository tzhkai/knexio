# CSV Row Count, Match Summary, and Print Preview Verification — 2026-08-25

The blank-row CSV workflow now exposes a labelled select with 3, 6, 10, 15, and 25 row options. The generator normalizes any value to a practical 1–25 range, uses the selected count in its filename and status feedback, and keeps the existing browser-local UTF-8 BOM, CRLF, quoted-cell export format.

Related resources now report a polite live match summary above the card grid. It accurately handles zero, one, multiple, filtered, and query-specific states. Search/filter changes still create no custom analytics event; only a subsequent card click can use the consent-gated event path.

The template also offers a browser-local **Preview & print** dialog with a six-row printable table, review checklist, Escape close path, focus target, and print-only CSS that hides unrelated site chrome. The preview entry point and all new selector controls were visually checked at desktop and 375px mobile widths. The actual browser print dialog is intentionally user-controlled and was not automatically opened. All 68 tests passed, and the production build prerendered 34 routes.

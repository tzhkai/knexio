# Auto Date, Project Name, and Title Preference Verification — 2026-08-25

The print-preview dialog now captures the user’s current local date when the preview is opened, formats it as a readable English date, and places it at the right side of the printable header. It uses a semantic `time` element with an ISO `dateTime` value; the browser’s print dialog remains user-initiated.

The new optional project-name field is trimmed, capped at 80 characters, rendered as text in the preview title, and converted to a safe lowercase slug for Markdown and CSV filenames. Empty names retain the neutral `research-to-priority-plan` filename. The existing downloadable workbook keeps the custom name in its browser-provided `download` filename where supported.

The **Only match titles** preference now persists locally under `knexio.bridge-guide.title-only.v1`. The storage value is only `true` or `false`; it contains no search terms, project content, or identity information. Storage exceptions fall back safely to off. All 72 tests passed, the Cloudflare build prerendered 34 routes, and desktop/375px mobile review confirmed readable stacked form controls without horizontal overflow.

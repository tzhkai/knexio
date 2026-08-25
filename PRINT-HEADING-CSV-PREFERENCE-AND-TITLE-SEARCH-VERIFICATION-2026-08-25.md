# Print Heading, CSV Preference, and Title-Only Search Verification — 2026-08-25

The template now includes an optional 80-character print-heading field. Its text is trimmed before rendering in the print-preview document, is rendered as ordinary React text rather than HTML, and is included in print-only output above the plan title. An empty field leaves the existing title intact.

The selected CSV blank-row count is stored only in the browser under `knexio.priority-plan.blank-row-count.v1`. Reads and writes are guarded so private browsing, disabled storage, or storage exceptions fall back safely to the default 6 rows. The preference stores only the selected number; no content or identity data is sent or tracked.

Related resources now offer an accessible **Only match titles** checkbox. When enabled, matching and the live count are limited to titles, while category filtering and consent-gated click behavior remain unchanged. Search/filter changes still are not tracked. All 70 tests passed, including storage fallbacks and title-only matching. The production build prerendered 34 routes; desktop and 375px mobile screenshots confirmed clear stacked controls without horizontal overflow. The print dialog itself remains user-initiated.

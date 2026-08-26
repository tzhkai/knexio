# Resource Highlight, Empty State, and Blank CSV Verification — 2026-08-25

Search result text now uses React-rendered segments and `<mark>` elements rather than injecting HTML. Matching is case-insensitive, preserves the original text casing, and works in resource kind, title, and description. The test suite explicitly covers text containing angle brackets to ensure matching remains plain text rather than executable markup.

When no result matches, the resource block now provides a clear recovery message and two editorially selected, directly related resources: Markdown Preview and the Evidence Matrix guide. They are not presented as popularity or user-rating claims. The links retain the existing consent-gated click behavior, while searches and empty-state appearances are not tracked.

The template adds a **CSV · 6 blank rows** option for print or direct manual entry. It retains the priority-table header, adds six empty eight-column rows, and remains a browser-local UTF-8 BOM CSV with CRLF and quoted cells. All 66 tests passed; the Cloudflare production build prerendered 34 routes. Desktop and 375px mobile review found the six template controls, resource search, and cards readable without horizontal overflow.

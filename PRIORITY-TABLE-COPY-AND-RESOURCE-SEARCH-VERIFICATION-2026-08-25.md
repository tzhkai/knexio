# Priority Table Copy and Resource Search Verification — 2026-08-25

The priority-plan template now offers a **Copy priority table** action in addition to full Markdown copy. Its clipboard payload contains only the `Priority record` heading, table header, separator, and one editable placeholder row; it deliberately excludes the decision context, evidence table, and review checklist. The existing local status toast reports success or a copy fallback without sending template text.

Related resources now include local keyword search across each resource’s kind, stable slug, title, and description. The selected **All resources**, **Tools**, or **Reading** filter constrains the result set first; a clear control appears only for a non-empty query, and a useful empty state offers recovery guidance. Search queries and filter changes are not tracked.

Filter and search result cards receive a short opacity/vertical-transform transition using `requestAnimationFrame`; the transition is disabled under `prefers-reduced-motion`. Unit tests cover focused-table scope and search combinations. Cloudflare build prerendered 34 routes; desktop and 375px mobile review confirmed legible template actions, search field, filters, cards, and no horizontal overflow.

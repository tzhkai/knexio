# Topic Share and Next-Path Verification — 2026-08-25

All four topic pages now render a task-driven next-path card after their primary reading path. The sequence is Research → Planning → Meetings → Writing → Research, with copy that explains the next move rather than implying user behavior or content popularity.

Completion summaries now support a plain-text format or a canonical original-link format. When the latter is selected, optional `utm_source`, `utm_medium`, and `utm_campaign` values are added only when the user enables tracking; the default remains the canonical URL with no UTM values.

Desktop (1280px) and mobile (375px) screenshot review confirmed that each next-path card remains legible, flows after the related path, and stacks without horizontal overflow. Completion controls are rendered only after local progress reaches 100%; automated tests cover canonical UTM URL generation and all four recommendation destinations.

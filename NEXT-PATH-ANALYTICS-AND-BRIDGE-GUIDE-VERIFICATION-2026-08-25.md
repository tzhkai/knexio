# Next-Path Analytics and Bridge Guide Verification — 2026-08-25

The “Next path” card now calls the configured analytics tracker only after the existing site-analytics consent state is true. The sole custom event is `next_path_click`; its application-level payload contains only `from_topic`, `to_topic`, and the fixed `interaction: next_path_card` value. The implementation intentionally excludes prompt text, local path progress, UTM values, form entries, and direct identifiers. When analytics is rejected or no tracker is present, no custom event is sent and the internal navigation continues normally.

The card uses a small hover elevation only on hover-capable devices that do not request reduced motion, plus a press-scale response and a visible keyboard focus outline. The Privacy Policy now documents the event purpose, fields, gate, and storage boundary.

The new **Turn a research brief into a priority plan without hiding uncertainty** guide is published in both Research & decisions and Planning & priorities, with a source-preserving prompt, six explanatory sections, practical steps, human review checks, a canonical route, and a truthful `2026-08-25` sitemap `lastmod`. Desktop and 375px mobile review confirmed the guide, both topic shelves, privacy disclosure, and next-path card layout are readable without horizontal overflow.

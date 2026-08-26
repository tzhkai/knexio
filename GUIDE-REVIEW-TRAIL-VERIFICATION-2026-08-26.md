# Guide review trail verification

**Date:** 26 August 2026  
**Scope:** Local preview of the Research Brief guide.

## Existing experience retained

The guide continues to expose a generated, active-section table of contents; a long-form reading progress indicator; contextual next-workflow links; sequential reading; and topic-aware recommended reading. The new feature therefore does not create a second table of contents or a duplicate related-reading shelf.

## New reader-owned interaction

The **Reader-owned review trail** appears within the existing `Run a human check` section. It exposes each guide-specific human-check item as a checkbox, reports numeric and percentage completion through a semantic progress bar, provides a copyable Markdown review record, and asks for confirmation before clearing local marks.

Its accessible local preview rendered all five Research Brief checks, the copy action, reset action, privacy boundary, and a 0–100% progress state. The local storage key is guide-scoped (`workflow-library:guide-review:<slug>`), and the component does not emit an analytics event, send the checklist, or infer that a reader has verified the underlying claims. Desktop and 375px full-page reviews found the new module readable without clipping.

Browser interaction additionally confirmed that selecting the check label updates the visible state from `0 of 5` to `1 of 5` and the percentage from `0%` to `20%`. The earlier direct-input automation attempt did not toggle the native control, but the label-triggered interaction works as intended.

# Markdown Template, Resource Analytics, and Long-Form Progress Verification — 2026-08-25

The research-to-priority template now offers a browser-local Markdown download alongside the uploaded Excel workbook. The Markdown record preserves the decision boundary, evidence table, priority record, status values, and human review checklist. Its download implementation uses a local Blob and does not send the template contents anywhere.

Related-resource cards now call `related_resource_click` only when the existing site-analytics consent is allowed and the configured tracker is present. The application-level event payload is fixed to `from_guide`, `resource_kind`, `resource_slug`, and `interaction: related_resources`; it contains no local template content, prompt text, UTM values, progress, form data, or direct identifier. Privacy Policy disclosures now cover both custom event categories.

Reading progress is now enabled for nine editorially selected long-form core guides across Research, Planning, and Meetings. The existing clamped, accessible, reduced-motion-compatible component is reused with one stable reading-surface target per guide. Production build prerendered 34 routes, and desktop/mobile checks covered the bridge guide, evidence matrix, weekly priorities, and decision brief without horizontal overflow.

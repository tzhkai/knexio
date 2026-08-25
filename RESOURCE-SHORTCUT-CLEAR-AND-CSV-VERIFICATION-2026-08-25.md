# Resource Search Shortcut, Clear Action, and CSV Verification — 2026-08-25

The related-resources search now supports `/` as a global focus shortcut when no modifier keys are held and the user is not already entering text. It does not intercept slash inside inputs, textareas, selects, or editable content. The search field visibly shows the shortcut hint, supports Escape to clear an active query, and keeps a dedicated **Clear** control available in both empty and populated states. Clearing returns focus to the field.

The priority-plan template now offers a browser-local CSV download. It contains one RFC 4180-style quoted header row and one editable priority row, uses CRLF line endings, escapes embedded double quotes, and begins with a UTF-8 BOM for compatible spreadsheet import. It includes only the priority-table columns, not evidence or review-checklist data.

All 64 tests passed, including shortcut detection and CSV escaping. The production build prerendered 34 routes. Desktop and 375px mobile checks confirmed the five template actions and the search/clear controls remain readable without horizontal overflow.

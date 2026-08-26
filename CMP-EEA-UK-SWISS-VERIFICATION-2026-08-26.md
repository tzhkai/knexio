# Google CMP verification — 2026-08-26

## Current configuration evidence

The published Privacy Policy states that the Google AdSense base script is installed and that the account has a published Google Privacy & messaging European regulations message. It also correctly separates this advertising-consent route from the site’s optional local analytics preference.

The logged-in AdSense Privacy & messaging route was opened in the sandbox browser, but its central message list did not render after repeated view checks. No message, targeting, choice, or publication setting was changed.

## Test status

| Journey step | Status | Evidence / next action |
|---|---|---|
| EEA/UK/Swiss initial display | Unknown | Current sandbox browser does not provide a verified eligible regional exit, and the backend list failed to render. Test from an eligible regional network or official Google preview. |
| Reject flow | Unknown | Requires a real eligible-region or official-preview rendering. |
| Manage options | Unknown | Requires a real eligible-region or official-preview rendering. |
| Withdraw / reopen choices | Unknown | Requires a real eligible-region or official-preview rendering. |
| Site local analytics choice | Pass | Public Privacy Policy and site UI disclose that optional site analytics is separate from Google advertising consent. |

## 2026-08-26 live-site observation

The public guide was opened in the sandbox browser without interacting with a consent control. The browser loaded the AdSense base script for `ca-pub-2596567349043393` and a Google ad iframe. In that browser context, neither `window.googlefc` nor `window.__tcfapi` was available, and no identifiable Google Funding Choices consent frame was present. The site-local analytics banner was visible.

This is **not** a failed Google CMP verdict. The sandbox has not been established as an EEA, UK, or Swiss visitor, so a European regulations message may legitimately not render there. The visible local banner remains a separate analytics preference and must not be represented as Google advertising consent.

The authenticated AdSense Privacy & messaging central list again failed to render in this sandbox session. The previously saved official-preview record remains the only positive account-level preview evidence: it recorded a published `European regulations message - knexio.xyz`, site binding, English default language, Consent and Manage options, and preview step 1 of 4. No account setting was changed during this retry.

| Check | 2026-08-26 observation | Interpretation |
|---|---|---|
| AdSense base script | Loaded on the public guide | Technical prerequisite observed; not a CMP journey result. |
| Google Funding Choices / TCF API | Not observable in current sandbox browser context | Inconclusive outside a verified EEA/UK/Swiss network. |
| Site-local analytics banner | Visible | Separate from Google advertising consent; not evidence of Google CMP coverage. |
| Privacy & messaging message list | Did not render in authenticated sandbox backend | Backend UI limitation in this session; does not negate the prior official-preview record. |

## Policy Center recheck

The logged-in Policy Center finished loading on 2026-08-26 and displayed “目前不存在任何问题” (“There are currently no issues”), with language stating that no site issue was stopping or limiting ad serving. No No-CMP, low-coverage, or European-regulations warning was displayed in that view.

This is an account-policy snapshot, not proof that a live visitor in every regulated region can complete the consent journey. The four real-region steps remain Unknown until tested through a verified EEA/UK/Swiss network or a currently accessible official preview.

## Configuration safety boundary

No Google CMP message setting was modified. Any configuration change that publishes or republishs a message will be treated as an external-account change and confirmed with the user before execution.

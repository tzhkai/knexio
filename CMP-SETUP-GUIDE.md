# Google Privacy & messaging setup record

**Status recorded:** 15 August 2026  
**Site:** `https://knexio.xyz`  
**AdSense publisher ID:** `ca-pub-2596567349043393`

## Current state

The public site does not load Google AdSense, remarketing, or advertising-measurement tags. Its bespoke Cookie interface now stores only the choice for optional site analytics. It intentionally does not collect, store, or signal a Google advertising preference, so it cannot conflict with a future certified consent management platform (CMP).

The shared browser session was unable to access the AdSense publisher account because it was signed in as `tianzhenkai@gmail.com`. The publisher indicated that the relevant AdSense account is associated with `tzhkai6@gmail.com`; configuration must be completed from that account in the publisher’s own browser because the shared-session takeover view was blank.

## Required Privacy & messaging configuration

1. Sign in to AdSense as `tzhkai6@gmail.com` and open **Privacy & messaging**.
2. Under **European regulations**, create a message and select only `knexio.xyz`.
3. Use **English (en)** as the default language. Add `English (en-GB)` only if it will be reviewed separately.
4. Turn on **Do not consent** for all eligible EEA, UK, and Swiss regions. The message should offer an equally discoverable refusal path.
5. Turn on **Close (do not consent)**.
6. Use `knexio.xyz | EEA-UK-CH | v1 | 2026-08` as the internal-only message name.
7. Enter `https://knexio.xyz/privacy/` as the privacy policy URL.
8. Preview mobile and desktop layouts. Publish only after confirming the selected site, languages, refusal path, and policy URL.

## Before enabling AdSense code

The publisher must first complete and publish the Google Privacy & messaging European regulations message, replace the real publisher identity and privacy contact on the Privacy Policy page, and verify the live message from an eligible EEA, UK, or Swiss location. The custom site Cookie interface should remain limited to site analytics after the Google CMP message is live.

## Official references

1. [Google AdSense — Create a European regulations message](https://support.google.com/adsense/answer/10960768?hl=en)
2. [Google AdSense — Consent management requirements for publishers](https://support.google.com/adsense/answer/13554116?hl=en)
3. [Google — Help with the EU user consent policy](https://www.google.com/intl/en_uk/about/company/user-consent-policy-help/)

# Article image sharing

Tap Share on a loaded district/category article. Review the 360x540 card with photo, Telugu headline, editable description and srsnews.in footer. Check the review box, then Share image opens the native sheet with a 1080x1620 PNG. Copy article link is separate: image pixels cannot carry a tappable link or an automatic WhatsApp caption.

The description is Markdown-parsed article body text, not a generated summary and no longer limited to 180 characters. It can be edited before export. The centre logo band is removed. A title can use up to four lines, then ends with an ellipsis. The description uses as many complete 24-point lines as fit in the remaining space, ending with an ellipsis only when it exceeds that space. The website footer stays visible. Text length, including an empty description, never disables image export.

Image/layout readiness and the review checkbox still apply. No photos permission is needed. Failed/slow photos settle to a branded fallback after 10 seconds, with Retry available. There is no logo asset or logo-readiness gate.

Native libraries: react-native-view-shot 5.1.0, expo-sharing ~57.0.22 and expo-clipboard ~57.0.2. Expo selected versions support Expo Go; runtime behaviour still needs device validation. The optional incoming-sharing config plugin is intentionally not installed for this outgoing-file feature.

## Device checks before merging/releasing

- iPhone Expo Go: short/long Telugu headline and description, vowel signs, conjuncts, image/no-image/video thumbnail and failed/slow URL.
- Verify PNG is 1080x1620 and visually matches the preview. Check WhatsApp chat/status and another installed target.
- Cancel share, rapid taps, background/foreground, reopen, copy/paste link.
- Navigate rapidly between two articles or fail the second request: never share the first article as the second.
- Long text must NOT disable export. Check one- and four-line titles, very long Telugu text, empty descriptions and edits. Description line count should expand/shrink with the title; ellipsis and footer must remain visible. Re-review after edits.
- Check small phones (horizontal preview scroll), large accessibility fonts, iPad sheet, Android via EAS.
- Website links open the web today. Universal Links/App Links and QR/status presets are follow-up work.

The Redux single result is now an array with latest-request guards. Only the loaded route ID can open a share snapshot. No capture file is deleted immediately after sheet dismissal; it is released on a later capture or by app temporary-file cleanup.

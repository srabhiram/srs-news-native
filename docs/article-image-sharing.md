# Article image sharing

Tap Share on a loaded district/category article. Review the 360x540 card with photo, centred SRS News logo, Telugu headline, editable excerpt and footer. Check the review box, then Share image opens the native sheet with a 1080x1620 PNG. Copy article link is separate: image pixels cannot carry a tappable link or an automatic WhatsApp caption.

The excerpt is Markdown-parsed body text cut at whole-word boundaries, not a generated summary. It can be edited before export. Titles/descriptions are measured without truncation; long text disables image export rather than silently clipping it. No photos permission is needed. Failed/slow photos settle to a branded fallback after 10 seconds, with Retry available. A missing local logo blocks export.

Native libraries: react-native-view-shot 5.1.0, expo-sharing ~57.0.22 and expo-clipboard ~57.0.2. Expo selected versions support Expo Go; runtime behaviour still needs device validation. The optional incoming-sharing config plugin is intentionally not installed for this outgoing-file feature.

## Device checks before merging/releasing

- iPhone Expo Go: short/long Telugu headline and description, vowel signs, conjuncts, image/no-image/video thumbnail and failed/slow URL.
- Verify PNG is 1080x1620 and visually matches the preview. Check WhatsApp chat/status and another installed target.
- Cancel share, rapid taps, background/foreground, reopen, copy/paste link.
- Navigate rapidly between two articles or fail the second request: never share the first article as the second.
- Long text must disable export. Shortening description must remeasure and re-enable after review.
- Check small phones (horizontal preview scroll), large accessibility fonts, iPad sheet, Android via EAS.
- Website links open the web today. Universal Links/App Links and QR/status presets are follow-up work.

The Redux single result is now an array with latest-request guards. Only the loaded route ID can open a share snapshot. No capture file is deleted immediately after sheet dismissal; it is released on a later capture or by app temporary-file cleanup.

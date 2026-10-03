# Article sharing

Tap Share on a loaded district/category article. There is no preview screen. The 360x540 card (photo, Telugu title, date and category/district, description, srsnews.in footer) is rendered off-screen, captured as a 1080x1620 PNG with react-native-view-shot, and the native share sheet opens right away.

- iOS: React Native `Share.share({ message: "<title>\n<article url>", url: <png file> })`. The sheet receives the image plus the title and link.
- Android: React Native's Share ignores file URLs, so expo-sharing shares the image only (no title or link). Untested.
- Photos that fail or take over 10 seconds fall back to the branded placeholder.

How a target app combines image and text is up to that app. WhatsApp on iOS commonly sends the image and may drop the text, so check it on a device. If it drops the text, the title and link can be pasted by hand.

## Device checks

- iPhone Expo Go: short/long Telugu titles, image/no-image, WhatsApp chat, Messages, Notes (to see text and image both arrive).
- Cancel the sheet, rapid taps, switching articles.

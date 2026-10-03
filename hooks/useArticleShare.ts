import { useRef, type RefObject } from 'react';
import { Platform, Share, View } from 'react-native';
import { captureRef, releaseCapture } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';

export function useArticleShare(cardRef: RefObject<View | null>) {
  const lastCapture = useRef<string | null>(null);
  async function shareCard(title: string, url: string) {
    if (Platform.OS === 'web' || !cardRef.current) {
      throw new Error('Sharing needs the native app.');
    }
    const raw = await captureRef(cardRef, { format: 'png', result: 'tmpfile', width: 1080, height: 1620 });
    if (lastCapture.current) releaseCapture(lastCapture.current);
    lastCapture.current = raw;
    const fileUrl = raw.startsWith('file://') ? raw : `file://${raw}`;
    const message = `${title}\n${url}`;
    if (Platform.OS === 'ios') {
      // iOS share sheet receives the image and the text (title + link) together.
      await Share.share({ message, url: fileUrl });
    } else {
      // React Native's Share ignores files on Android; expo-sharing sends the image only.
      await Sharing.shareAsync(fileUrl, { mimeType: 'image/png', dialogTitle: title });
    }
    // Keep the file until the next capture: targets may read it after the sheet closes.
  }
  return { shareCard };
}

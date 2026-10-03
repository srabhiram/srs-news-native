import { useRef, useState, type RefObject } from 'react';
import { Platform, View } from 'react-native';
import { captureRef, releaseCapture } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';

export function useArticleShare(cardRef: RefObject<View | null>) {
  const lock = useRef(false);
  const lastCapture = useRef<string | null>(null);
  const [busy, setBusy] = useState(false);
  async function shareImage(ready: boolean) {
    if (lock.current || !ready || !cardRef.current) return;
    lock.current = true;
    setBusy(true);
    try {
      if (Platform.OS === 'web' || !(await Sharing.isAvailableAsync())) {
        throw new Error('Image sharing needs the native app. You can still copy the article link.');
      }
      const raw = await captureRef(cardRef, {
        format: 'png', result: 'tmpfile', width: 1080, height: 1620,
      });
      if (lastCapture.current) releaseCapture(lastCapture.current);
      lastCapture.current = raw;
      await Sharing.shareAsync(raw.startsWith('file://') ? raw : `file://${raw}`, {
        mimeType: 'image/png', UTI: 'public.png', dialogTitle: 'Share SRS News',
      });
      // Retain until next capture/app exit: targets may read after sheet dismissal.
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }
  return { busy, shareImage };
}


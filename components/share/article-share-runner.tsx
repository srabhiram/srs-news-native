import React, { useEffect, useRef, useState } from 'react';
import { Alert, View } from 'react-native';
import { NewsShareCard } from './news-share-card';
import { useArticleShare } from '@/hooks/useArticleShare';
import type { NewsItem } from '@/store/news/news-type';

export type ShareSnapshot = { article: NewsItem; url: string; description: string };

// Renders the card off-screen, captures it, and opens the native share sheet.
// There is no preview UI. Parent mounts this once per tap and unmounts it via onDone.
export function ArticleShareRunner({ snapshot, onDone }: { snapshot: ShareSnapshot; onDone: () => void }) {
  const cardRef = useRef<View>(null);
  const { shareCard } = useArticleShare(cardRef);
  const candidate = snapshot.article.image || snapshot.article.videoThumbnail || undefined;
  const [imageUri, setImageUri] = useState(candidate);
  const [imageLoaded, setImageLoaded] = useState(!candidate);
  const [laidOut, setLaidOut] = useState(false);
  const started = useRef(false);

  // Slow or broken photos fall back to the branded placeholder after 10 seconds.
  useEffect(() => {
    if (!imageUri || imageLoaded) return;
    const t = setTimeout(() => { setImageUri(undefined); setImageLoaded(true); }, 10000);
    return () => clearTimeout(t);
  }, [imageUri, imageLoaded]);

  useEffect(() => {
    if (!laidOut || !imageLoaded || started.current) return;
    started.current = true;
    // Let the card's text-measurement passes settle before capturing.
    const t = setTimeout(async () => {
      try {
        await shareCard(snapshot.article.news_title, snapshot.url);
      } catch (e) {
        Alert.alert('Cannot share', e instanceof Error ? e.message : 'Could not share. Try again.');
      } finally {
        onDone();
      }
    }, 400);
    return () => { clearTimeout(t); started.current = false; };
  }, [laidOut, imageLoaded]);

  return (
    <View pointerEvents="none" style={{ position: 'absolute', left: -5000, top: 0 }}>
      <NewsShareCard ref={cardRef} article={snapshot.article} description={snapshot.description}
        imageUri={imageUri} onLayout={() => setLaidOut(true)}
        onImageLoad={() => setImageLoaded(true)}
        onImageError={() => { setImageUri(undefined); setImageLoaded(true); }} />
    </View>
  );
}

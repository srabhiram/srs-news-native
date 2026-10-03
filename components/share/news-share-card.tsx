import React, { forwardRef } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import type { NewsItem } from '@/store/news/news-type';

type Props = {
  article: NewsItem;
  description: string;
  imageUri?: string;
  label: string;
  published: string;
  onLayout: () => void;
  onImageLoad: () => void;
  onImageError: () => void;
  onLogoLoad: () => void;
  onLogoError: () => void;
  onTextHeight: (kind: 'title' | 'description', height: number) => void;
};
export const NewsShareCard = forwardRef<View, Props>(function NewsShareCard(p, ref) {
  return (
    <View ref={ref} collapsable={false} onLayout={p.onLayout} style={styles.card}>
      {p.imageUri ? (
        <Image source={{ uri: p.imageUri }} resizeMode="contain" onLoad={p.onImageLoad}
          onError={p.onImageError} style={styles.photo} />
      ) : (
        <View style={[styles.photo, styles.center]}><Text style={styles.fallback}>SRS News</Text></View>
      )}
      <View style={styles.band}>
        <Image source={require('@/assets/images/icon.png')} resizeMode="contain"
          onLoad={p.onLogoLoad} onError={p.onLogoError} style={styles.logo} />
      </View>
      <View style={styles.copy}>
        <Text allowFontScaling={false} onLayout={e => p.onTextHeight('title', e.nativeEvent.layout.height)}
          style={styles.title}>{p.article.news_title}</Text>
        <Text key={p.description} allowFontScaling={false} onLayout={e => p.onTextHeight('description', e.nativeEvent.layout.height)}
          style={styles.description}>{p.description}</Text>
        <View style={styles.footer}>
          <Text allowFontScaling={false} style={styles.meta}>{p.label} · {p.published}</Text>
          <Text allowFontScaling={false} style={styles.meta}>SRS News · srsnews.in</Text>
        </View>
      </View>
    </View>
  );
});
const styles = StyleSheet.create({
  card: { width: 360, height: 540, backgroundColor: '#fff' },
  photo: { width: 360, height: 180, backgroundColor: '#f3f3f3' },
  center: { alignItems: 'center', justifyContent: 'center' },
  fallback: { fontSize: 28, color: '#555', fontWeight: '700' },
  band: { height: 54, backgroundColor: '#151515', alignItems: 'center', justifyContent: 'center' },
  logo: { width: 46, height: 46 },
  copy: { height: 306, paddingHorizontal: 16, paddingVertical: 12 },
  title: { color: '#171717', fontSize: 22, lineHeight: 30, fontWeight: '700', flexShrink: 0 },
  description: { color: '#444', fontSize: 16, lineHeight: 24, marginTop: 8, flexShrink: 0 },
  footer: { marginTop: 'auto', paddingTop: 8 },
  meta: { color: '#555', fontSize: 11, lineHeight: 16 },
});


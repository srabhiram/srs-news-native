import React, { forwardRef, useState } from 'react';
import { Image, Platform, Text, View } from 'react-native';
import type { NewsItem } from '@/store/news/news-type';
import { categoryNames, distname } from '@/libs/navbar-items';

function metaLine(a: NewsItem) {
  const parts: string[] = [];
  // PostgreSQL uses a space, microseconds and short timezone offsets.
  // Hermes/iOS only reliably parses the ISO form with millisecond precision.
  const timestamp = (a.created_at || '').trim()
    .replace(/^(\d{4}-\d{2}-\d{2})\s+/, '$1T')
    .replace(/(\.\d{3})\d+/, '$1')
    .replace(/([+-]\d{2})(\d{2})$/, '$1:$2')
    .replace(/([+-]\d{2})$/, '$1:00');
  const d = new Date(timestamp);
  if (!isNaN(d.getTime())) {
    const p2 = (n: number) => String(n).padStart(2, '0');
    parts.push(`${p2(d.getDate())}/${p2(d.getMonth() + 1)}/${p2(d.getFullYear() % 100)}`);
  }
  const label = a.category?.trim() ? categoryNames(a.category.trim()) : a.district?.trim() ? distname(a.district.trim()) : '';
  if (label) parts.push(label);
  return parts.join('  \u2022  ');
}

const DESCRIPTION_LINE_HEIGHT = 24;
const TITLE_HEIGHT_CLASSES = ['h-[30px]', 'h-[60px]', 'h-[90px]', 'h-[120px]'];
type Props = {
  article: NewsItem;
  description: string;
  imageUri?: string;
  onLayout: () => void;
  onImageLoad: () => void;
  onImageError: () => void;
};
export const NewsShareCard = forwardRef<View, Props>(function NewsShareCard(p, ref) {
  const [titleLines, setTitleLines] = useState(4);
  const metadata = metaLine(p.article);
  const [descriptionLines, setDescriptionLines] = useState(1);
  return (
    <View ref={ref} collapsable={false} onLayout={p.onLayout} className="w-[360px] h-[540px] bg-white overflow-hidden">
      {p.imageUri ? (
        <Image source={{ uri: p.imageUri }} resizeMode="contain" onLoad={p.onImageLoad}
          onError={p.onImageError} className="w-[360px] h-[180px] bg-[#f3f3f3]" />
      ) : (
        <View className="w-[360px] h-[180px] bg-[#f3f3f3] items-center justify-center"><Text className="text-[28px] text-[#555] font-bold">SRS News</Text></View>
      )}
      <View className="h-[360px] px-4 py-3">
        <Text key={p.article.news_title} allowFontScaling={false} numberOfLines={4} ellipsizeMode="tail"
          onTextLayout={e => {
            // Native Text can measure its four-line cap instead of its visible text.
            // Use the actual line count to reclaim unused title space.
            const lines = Math.max(1, Math.min(4, e.nativeEvent.lines.length));
            setTitleLines(previous => previous === lines ? previous : lines);
          }}
          className={`text-[#171717] text-[22px] leading-[30px] font-bold shrink-0 ${Platform.OS === 'web' ? '' : TITLE_HEIGHT_CLASSES[titleLines - 1]}`}>{p.article.news_title}</Text>
        {!!metadata && (
          <Text allowFontScaling={false} numberOfLines={1} ellipsizeMode="tail"
            className="shrink-0 mt-2 text-[#B91C1C] text-[13px] leading-[18px] font-semibold">{metadata}</Text>
        )}
        <View className="flex-1 min-h-0 mt-2 overflow-hidden" onLayout={e => {
          // Use the actual space left by the title, keeping the footer visible.
          const lines = Math.max(1, Math.floor(e.nativeEvent.layout.height / DESCRIPTION_LINE_HEIGHT));
          setDescriptionLines(previous => previous === lines ? previous : lines);
        }}>
          <Text key={p.description} allowFontScaling={false}
            numberOfLines={descriptionLines} ellipsizeMode="tail"
            className="text-[#444] text-[16px] leading-[24px]">{p.description}</Text>
        </View>
        <View className="shrink-0 pt-2">
          <Text allowFontScaling={false} className="text-[#555] text-[12px] leading-[16px] font-semibold">srsnews.in</Text>
        </View>
      </View>
    </View>
  );
});

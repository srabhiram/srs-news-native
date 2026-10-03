import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { format, isValid, parseISO } from 'date-fns';
import { NewsShareCard } from './news-share-card';
import { useArticleShare } from '@/hooks/useArticleShare';
import { categoryNames, distname } from '@/libs/navbar-items';
import type { NewsItem } from '@/store/news/news-type';

export type ShareSnapshot = { article: NewsItem; url: string; description: string };
// Parent remounts this for each frozen article, resetting readiness and capture state.
export function NewsSharePreview({ snapshot, onClose }: { snapshot: ShareSnapshot; onClose: () => void }) {
  const cardRef = useRef<View>(null);
  const { busy, shareImage } = useArticleShare(cardRef);
  const candidate = snapshot.article.image || snapshot.article.videoThumbnail || undefined;
  const [imageUri, setImageUri] = useState(candidate);
  const [imageLoaded, setImageLoaded] = useState(!candidate);
  const [imageNotice, setImageNotice] = useState('');
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [laidOut, setLaidOut] = useState(false);
  const [description, setDescription] = useState(snapshot.description);
  const [heights, setHeights] = useState({ title: 0, description: 0 });
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [approved, setApproved] = useState(false);
  const [imageAttempt, setImageAttempt] = useState(0);
  const textFits = heights.title > 0 && heights.description > 0 && heights.title <= 120
    && heights.description <= 120 && heights.title + heights.description + 8 <= 242;
  // The card uses platform Telugu-capable system fonts, not async custom fonts.
  const ready = laidOut && logoLoaded && imageLoaded && textFits && !!description.trim() && approved;
  useEffect(() => {
    if (!imageUri || imageLoaded) return;
    const timeout = setTimeout(() => {
      setImageUri(undefined); setImageLoaded(true);
      setImageNotice('Photo timed out. Preview uses the SRS News fallback.');
      setApproved(false);
    }, 10000);
    return () => clearTimeout(timeout);
  }, [imageUri, imageLoaded, imageAttempt]);
  const date = parseISO(snapshot.article.created_at || '');
  const published = isValid(date) ? format(date, 'dd MMM yyyy') : 'SRS News';
  const label = (snapshot.article.district ? distname(snapshot.article.district)
    : categoryNames(snapshot.article.category)) || 'SRS News';
  async function exportImage() {
    setError('');
    try { await shareImage(ready); }
    catch (e) { setError(e instanceof Error ? e.message : 'Could not share image. Try again.'); }
  }
  async function copyLink() {
    try { await Clipboard.setStringAsync(snapshot.url); setCopied(true); }
    catch { setError('Could not copy the link. Try again.'); }
  }
  return (
    <Modal visible animationType="slide" onRequestClose={() => { if (!busy) onClose(); }}>
      <View style={styles.screen}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <Text style={styles.heading}>Share SRS News</Text>
          <Text style={styles.note}>Review the photo and excerpt. The image has no tappable link; copy the link for your caption.</Text>
          <ScrollView horizontal contentContainerStyle={styles.cardContainer}>
            <NewsShareCard key={imageAttempt} ref={cardRef} article={snapshot.article} description={description}
              imageUri={imageUri} label={label} published={published} onLayout={() => setLaidOut(true)}
              onLogoLoad={() => setLogoLoaded(true)} onLogoError={() => { setLogoError(true); setLogoLoaded(false); }}
              onImageLoad={() => setImageLoaded(true)}
              onImageError={() => { setImageUri(undefined); setImageLoaded(true); setApproved(false); setImageNotice('Photo unavailable. Preview uses the SRS News fallback.'); }}
              onTextHeight={(kind, height) => setHeights(previous => previous[kind] === height ? previous : { ...previous, [kind]: height })} />
          </ScrollView>
          {!!imageNotice && <Text style={styles.note}>{imageNotice}</Text>}
          {!!imageNotice && candidate && <Pressable accessibilityRole="button" disabled={busy} onPress={() => {
            setImageUri(candidate); setImageLoaded(false); setImageNotice(''); setApproved(false);
            setLogoLoaded(false); setLaidOut(false); setImageAttempt(n => n + 1);
          }}><Text style={styles.link}>Retry photo</Text></Pressable>}
          <Text style={styles.label}>Description (article excerpt, not an automatic summary)</Text>
          <TextInput accessibilityLabel="Share card description" multiline editable={!busy} value={description}
            style={styles.input} onChangeText={value => {
              setDescription(value); setApproved(false); setHeights(previous => ({ ...previous, description: 0 }));
            }} />
          {!description.trim() && <Text style={styles.error}>Add a short description before sharing.</Text>}
          {heights.title > 120 && <Text style={styles.error}>Title is too long for this card. Image export is blocked; copy the link instead.</Text>}
          {heights.description > 0 && !textFits && <Text style={styles.error}>Text does not fit. Shorten the description. Nothing will be clipped in an exported image.</Text>}
          {logoError && <Text style={styles.error}>Logo failed to load. Close and reopen the preview.</Text>}
          {(!imageLoaded || !logoLoaded || !laidOut) && !logoError && <ActivityIndicator accessibilityLabel="Preparing card" />}
          <Pressable accessibilityRole="checkbox" accessibilityState={{ checked: approved, disabled: busy }}
            disabled={busy} onPress={() => setApproved(v => !v)} style={styles.review}>
            <Text>{approved ? '☑' : '☐'} I reviewed the photo, title and description</Text>
          </Pressable>
          {!!error && <Text accessibilityRole="alert" style={styles.error}>{error}</Text>}
          <Pressable accessibilityRole="button" accessibilityState={{ disabled: !ready || busy || Platform.OS === 'web' }}
            disabled={!ready || busy || Platform.OS === 'web'} onPress={exportImage}
            style={[styles.button, (!ready || busy || Platform.OS === 'web') && styles.disabled]}>
            <Text style={styles.buttonText}>{busy ? 'Opening share sheet...' : 'Share image'}</Text>
          </Pressable>
          {Platform.OS === 'web' && <Text style={styles.note}>Use the native app to share a PNG.</Text>}
          <Pressable accessibilityRole="button" disabled={busy} onPress={copyLink} style={styles.secondary}>
            <Text>{copied ? 'Link copied' : 'Copy article link'}</Text>
          </Pressable>
          <Text selectable style={styles.note}>{snapshot.url}</Text>
          <Pressable accessibilityRole="button" disabled={busy} onPress={onClose} style={styles.secondary}><Text>Close</Text></Pressable>
        </ScrollView>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f4f4f4', paddingTop: 48 },
  scroll: { padding: 16, paddingBottom: 48 },
  heading: { fontSize: 24, fontWeight: '700', color: '#171717' },
  note: { color: '#555', fontSize: 14, lineHeight: 21, marginVertical: 10 },
  cardContainer: { paddingVertical: 12, flexGrow: 1, justifyContent: 'center' },
  label: { fontSize: 14, color: '#222', marginTop: 12 },
  input: { backgroundColor: '#fff', color: '#222', borderWidth: 1, borderColor: '#bbb', borderRadius: 8, minHeight: 92, padding: 12, textAlignVertical: 'top', fontSize: 16 },
  review: { paddingVertical: 16 },
  error: { color: '#a11', fontSize: 14, marginVertical: 8 },
  link: { color: '#1255a0', paddingVertical: 8 },
  button: { backgroundColor: '#151515', padding: 16, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  disabled: { opacity: 0.4 },
  secondary: { padding: 16, backgroundColor: '#fff', borderRadius: 8, alignItems: 'center', marginTop: 10 },
});


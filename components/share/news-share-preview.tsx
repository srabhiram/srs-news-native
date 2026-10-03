import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { NewsShareCard } from './news-share-card';
import { useArticleShare } from '@/hooks/useArticleShare';
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
  const [laidOut, setLaidOut] = useState(false);
  const [description, setDescription] = useState(snapshot.description);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [approved, setApproved] = useState(false);
  const [imageAttempt, setImageAttempt] = useState(0);
  // The card uses platform Telugu-capable system fonts, not async custom fonts.
  const ready = laidOut && imageLoaded && approved;
  useEffect(() => {
    if (!imageUri || imageLoaded) return;
    const timeout = setTimeout(() => {
      setImageUri(undefined); setImageLoaded(true);
      setImageNotice('Photo timed out. Preview uses the SRS News fallback.');
      setApproved(false);
    }, 10000);
    return () => clearTimeout(timeout);
  }, [imageUri, imageLoaded, imageAttempt]);
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
              imageUri={imageUri} onLayout={() => setLaidOut(true)}
              onImageLoad={() => setImageLoaded(true)}
              onImageError={() => { setImageUri(undefined); setImageLoaded(true); setApproved(false); setImageNotice('Photo unavailable. Preview uses the SRS News fallback.'); }} />
          </ScrollView>
          {!!imageNotice && <Text style={styles.note}>{imageNotice}</Text>}
          {!!imageNotice && candidate && <Pressable accessibilityRole="button" disabled={busy} onPress={() => {
            setImageUri(candidate); setImageLoaded(false); setImageNotice(''); setApproved(false);
            setLaidOut(false); setImageAttempt(n => n + 1);
          }}><Text style={styles.link}>Retry photo</Text></Pressable>}
          <Text style={styles.label}>Description (article excerpt, not an automatic summary)</Text>
          <TextInput accessibilityLabel="Share card description" multiline editable={!busy} value={description}
            style={styles.input} onChangeText={value => {
              setDescription(value); setApproved(false);
            }} />
          <Text style={styles.note}>Text fills the available card space. Long titles and descriptions end with an ellipsis; they never block export.</Text>
          {(!imageLoaded || !laidOut) && <ActivityIndicator accessibilityLabel="Preparing card" />}
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

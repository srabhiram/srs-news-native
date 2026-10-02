import MarkdownIt from 'markdown-it';
import type Token from 'markdown-it/lib/token.mjs';

const parser = new MarkdownIt({ html: false });
function text(tokens: Token[]): string {
  return tokens.map(token => {
    if (token.type === 'image' || token.type === 'html_inline' || token.type === 'html_block') return '';
    if (token.children) return text(token.children);
    if (token.type === 'softbreak' || token.type === 'hardbreak' || token.type.endsWith('_close')) return ' ';
    return token.content;
  }).join('');
}

/** Extract whole words, not a generated summary or a cut Telugu grapheme. Review in preview. */
export function shareDescription(body: string, limit = 180): string {
  const plain = text(parser.parse(body, {})).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  const words = plain.split(' ');
  const selected: string[] = [];
  for (const word of words) {
    if (selected.length && [...selected, word].join(' ').length > limit) break;
    selected.push(word);
  }
  return selected.join(' ');
}


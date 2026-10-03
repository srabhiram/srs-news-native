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

/** Plain article text. The card handles truncation using its available line count. */
export function shareDescription(body: string): string {
  return text(parser.parse(body, {})).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

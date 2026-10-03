export function articleUrl(type: string, param: string, id: string): string {
  if (!['district', 'category'].includes(type) || !param || !id) {
    throw new Error('This article has no supported public link.');
  }
  return `https://srsnews.in/${[type, param, id].map(encodeURIComponent).join('/')}`;
}


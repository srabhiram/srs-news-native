export interface NewsItem {
  id: string;
  news_title: string;
  content: string;
  content_1: string;
  content_2: string;
  extra_content: string;
  image: string;
  video: string;
  videoThumbnail: string;
  district: string;
  category: string;
  author: string;
  comments: string[];
  likes: number;
  views: number;
  created_at: string;
  updated_at: string;
}

export interface NewsState {
  list: Record<string, NewsItem[]>;
  single: Record<string, NewsItem>;
  listLoading: Record<string, boolean>;
  loading: boolean;
  listError: Record<string, string | null>;
  error: string | null;
}

import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchNews, fetchSingleNews } from "@/services/news.service";

export const fetchNewsThunk = createAsyncThunk(
  "news/fetchNews",
  async (
    {
      type = "",
      page = 1,
      content = false,
      noLimit = false,
    }: {
      type?: string;
      page?: number;
      content?: boolean;
      noLimit?: boolean;
    },
    { rejectWithValue }
  ) => {
    try {
      const data = await fetchNews({
        type,
        pageParams: page,
        content,
        noLimit,
      });

      return { data, key: `${type}_${page}` };
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchSingleNewsThunk = createAsyncThunk(
  "news/fetchSingleNews",
  async (
    {
      type,
      param,
      newsId,
      content = false,
      page = 1,
    }: {
      type: string;
      param: string;
      newsId: string;
      content?: boolean;
      page?: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const data = await fetchSingleNews({
        type,
        param,
        newsId,
        content,
        page,
      });
      return { data };
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

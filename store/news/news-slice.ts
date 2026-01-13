import { createSlice } from "@reduxjs/toolkit";
import { fetchNewsThunk, fetchSingleNewsThunk } from "./news-thunk";
import { NewsState } from "./news-type";

const initialState: NewsState = {
  list: {},
  single: {},
  listLoading: {},
  listError: {},
  loading: false,
  error: null,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    clearError(state, action) {
      const key = action.payload;
      state.error = null;
      state.listError[key] = null
    },
    clearSingleNews(state) {
      state.single = {};
    },
  },
  extraReducers: (builder) => {
    builder
      // LIST
      .addCase(fetchNewsThunk.pending, (state, action) => {
        const key = action.meta.arg.type;
        state.listLoading[key!] = true;
        state.listError[key!] = null;
      })
      .addCase(fetchNewsThunk.fulfilled, (state, action) => {
        const key = action.meta.arg.type;
        state.listLoading[key!] = false;
        state.list[action.payload.key] = action.payload.data;
      })
      .addCase(fetchNewsThunk.rejected, (state, action) => {
        const key = action.meta.arg.type;
        state.listLoading[key!] = false;
        state.listError[key!] = action.payload as string;
      })

      // SINGLE
      .addCase(fetchSingleNewsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingleNewsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.single = action.payload.data;
      })
      .addCase(fetchSingleNewsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearSingleNews } = newsSlice.actions;
export default newsSlice.reducer;

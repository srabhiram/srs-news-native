import {configureStore} from "@reduxjs/toolkit";
import newsReducer from "./news/news-slice"
export const store = configureStore({
    reducer: {
        news:newsReducer
    },
    devTools: true
})
export type Rootstate = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
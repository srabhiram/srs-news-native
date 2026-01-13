import { api } from "./api";

interface FetchNewsOptions {
  content?: boolean;
  pageParams?: number;
  noLimit?: boolean;
  type?: string;
}

export async function fetchNews({
  content = false,
  pageParams = 1,
  noLimit = false,
  type = "",
}: FetchNewsOptions = {}) {
  try {
  
    const res = await api.get("/api/news/all", {
      params: {
        page: pageParams,
        content,
        noLimit,
        ...(type && { type }),
      },
    });
    return res.data.newsArticles
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Fetch news failed"
    );
  }
}

export async function fetchSingleNews({
   type,
  param,
  content = false,
  page = 1,
  newsId
}:{
  type:string,
  param:string,
  content:boolean,
  page?:number,
  newsId:string
}){
  try {
    const res = await api.get(`/api/news/${type}/${param}/${newsId}?content=${content}&page=${page}`,{
       headers: {
    "Cache-Control": "no-store",
  },
    }
    )
    return res.data.newsArticles
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message :"Failed to fetch single article"
    )
  }
}
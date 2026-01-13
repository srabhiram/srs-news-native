import FeaturedContent from "@/components/featured-content";
import NewsTabs from "@/components/news-tabs";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useEffect } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "./global.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, Rootstate } from "@/store";
import { fetchNewsThunk } from "@/store/news/news-thunk";

export default function Index() {
 const dispatch = useDispatch<AppDispatch>()
  const cacheKey = "trending_1";
  const {list,listLoading}  = useSelector((s:Rootstate)=>s.news)
  const trendingNews = list[cacheKey] ?? []
  const loading = listLoading["trending"]
 
   useEffect(() => {
     if (!list[cacheKey]) {
       dispatch(fetchNewsThunk({ type: "trending" }));
     }
   }, [dispatch,list]);
  return (
    <GluestackUIProvider>
      <SafeAreaView className="" edges={["bottom"]}>
        <ScrollView>
          <FeaturedContent trendingNews={trendingNews} loading={loading}/>
          <NewsTabs />
        </ScrollView>
      </SafeAreaView>
    </GluestackUIProvider>
  );
}

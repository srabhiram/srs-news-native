import { ArticleShareRunner, type ShareSnapshot } from "@/components/share/article-share-runner";
import { articleUrl } from "@/libs/article-url";
import { shareDescription } from "@/libs/share-description";
import SingleScreenLoader from "@/components/skeleton/single-screen-loader";
import YoutubePlay from "@/components/youtube-player";
import useViewTracker from "@/hooks/useViewsTracker";
import { categoryNames, distname } from "@/libs/navbar-items";
import { AppDispatch, Rootstate } from "@/store";
import { fetchSingleNewsThunk } from "@/store/news/news-thunk";
import { format, parseISO } from "date-fns";
import { useLocalSearchParams } from "expo-router";
import { Eye } from "lucide-react-native";
import React, { useEffect, useMemo, useState } from "react";
import { Alert, Image, Pressable, ScrollView, Text, View } from "react-native";
import Markdown from "react-native-markdown-display";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

/* ---------------------------------- */
/* Markdown + NativeWind Rules */
/* ---------------------------------- */
const markdownRules = {
  paragraph: (_: any, children: any) => (
    <Text className="text-xl text-gray-800 leading-10 mb-4">{children}</Text>
  ),
  strong: (_: any, children: any) => (
    <Text className="font-semibold">{children}</Text>
  ),
  em: (_: any, children: any) => <Text className="italic">{children}</Text>,
  heading1: (_: any, children: any) => (
    <Text className="text-2xl font-bold mb-4">{children}</Text>
  ),
  heading2: (_: any, children: any) => (
    <Text className="text-xl font-semibold mb-3">{children}</Text>
  ),
  bullet_list: (_: any, children: any) => (
    <View className="mb-4 pl-2">{children}</View>
  ),
  list_item: (_: any, children: any) => (
    <Text className="text-xl leading-9 mb-2">• {children}</Text>
  ),
  image: (node: any) => (
    <Image
      source={{ uri: node.attributes.src }}
      resizeMode="contain"
      className="w-full h-64 rounded-lg my-4 bg-black"
    />
  ),
};

/* ---------------------------------- */
/* Screen */
/* ---------------------------------- */
const SingleNewsId = () => {
  const params = useLocalSearchParams<{ type: string; param: string; id: string }>();
  const routeType = Array.isArray(params.type) ? params.type[0] : params.type;
  const routeParam = Array.isArray(params.param) ? params.param[0] : params.param;
  const routeId = Array.isArray(params.id) ? params.id[0] : params.id;
  const [shareSnapshot, setShareSnapshot] = useState<ShareSnapshot | null>(null);
  const [views,setViews] = useState(0)
  const dispatch = useDispatch<AppDispatch>();
  const { single, loading, error } = useSelector((s: Rootstate) => s.news);
  const data = single.find(article => String(article.id) === routeId);
  useEffect(() => { setShareSnapshot(null); }, [routeId, routeType, routeParam]);
  /* Fetch News */
  useEffect(() => {
    if (routeType && routeParam && routeId) {
      dispatch(
        fetchSingleNewsThunk({
          type: routeType,
          param: routeParam,
          newsId: routeId,
          content: true,
        })
      );
    }
  }, [dispatch, routeType, routeParam, routeId]);
useViewTracker(routeId,setViews)
  /* Memoized Content */
  const content = useMemo(
    () =>
      data?.content_1
        ? `${data.content_1}\n\n${data.content_2 || ""}`
        : data?.content ?? "",
    [data]
  );

  // /* Loading State */
  if (loading) {
    return (
     <SingleScreenLoader/>
    );
  }

  /* Empty State */
  if (!data) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <Text className="text-gray-500">News not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
          <View className="w-full max-h-96 px-2 pt-1 border-gray-50 border-2">
        {data?.image && (
            <Image
              source={{ uri: data.image }}
              resizeMode="contain"
              className="w-full h-full rounded"
            />
          )}
          {data.video && (
            <YoutubePlay videoUri={data.video} key={data.id}/>
          )}
          </View>

        <View className="px-4 py-5">
          {/* Title */}
          <Text className="text-2xl font-bold text-gray-900 leading-10">
            {data.news_title}
          </Text>

          {/* Meta */}
          <View className="flex-row justify-between items-center">

          <Text className="text-base text-gray-500">
            By {data.author}
            
          </Text>
          <View className="flex-row gap-1 items-center">
<Eye className="text-base text-gray-500"/>
          <Text className="text-base text-gray-500 mb-4">
            {data.views||views}
          </Text>
          </View>
          </View>
          <View className="flex-row justify-between items-center">
            <Text className="text-base text-gray-500 mb-4">
{format(parseISO(data.created_at), "dd MMM yyyy")}
            </Text>
            <Pressable accessibilityRole="button" accessibilityLabel="Share article"
              disabled={!!shareSnapshot || loading || !!error || !data || String(data.id) !== routeId}
              onPress={() => {
                try {
                  setShareSnapshot({ article: { ...data }, url: articleUrl(routeType, routeParam, routeId),
                    description: shareDescription(content) });
                } catch (e) {
                  Alert.alert("Cannot share", e instanceof Error ? e.message : "No article link available.");
                }
              }} style={{ padding: 12 }}>
              <Text>Share</Text>
            </Pressable>
          </View>
          {/* Category / District */}
          <Text className="text-xl font-bold text-gray-800 leading-10 mb-3">
            {data?.district
              ? distname(data.district)
              : categoryNames(data.category)}

            {": "}
          </Text>

          {/* Markdown Content */}
          <Markdown rules={markdownRules} key={data.id}>
            {content}
          </Markdown>
        </View>
      </ScrollView>
      {shareSnapshot && <ArticleShareRunner key={`${shareSnapshot.article.id}-${shareSnapshot.url}`}
        snapshot={shareSnapshot} onDone={() => setShareSnapshot(null)} />}
    </SafeAreaView>
  );
};

export default SingleNewsId;

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
import { Image, ScrollView, Text, View } from "react-native";
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
  const params: any = useLocalSearchParams();
  const [views,setViews] = useState(0)
  const dispatch = useDispatch<AppDispatch>();
  const { single, loading } = useSelector((s: Rootstate) => s.news);
  const data = single[0];
  /* Fetch News */
  useEffect(() => {
    if (params.type && params.param && params.id) {
      dispatch(
        fetchSingleNewsThunk({
          type: params.type,
          param: params.param,
          newsId: params.id,
          content: true,
        })
      );
    }
  }, [dispatch, params.type, params.param, params.id]);
useViewTracker(params.id,setViews)
  /* Memoized Content */
  const content = useMemo(
    () =>
      data?.content_1
        ? `${data.content_1}\n\n${data.content_2}`
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
            <Text>
              Share
            </Text>
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
    </SafeAreaView>
  );
};

export default SingleNewsId;

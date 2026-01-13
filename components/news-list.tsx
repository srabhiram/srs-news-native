import { Pressable, Text, View, Image } from "react-native";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { VStack } from "./ui/vstack";
import { Box } from "./ui/box";
import { format, parseISO } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, Rootstate } from "@/store";
import { fetchNewsThunk } from "@/store/news/news-thunk";
import { NewsItem } from "@/store/news/news-type";

type Props = {
  category: "latest" | "video";
};

export default function NewsList({ category }: Props) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const cacheKey = `${category}_1`;

  const { list, listLoading } = useSelector((s: Rootstate) => s.news);
  const newsList:NewsItem[] = list[cacheKey] ?? [];
const loading = listLoading[category]
  useEffect(() => {
    if (!list[cacheKey]) {
      dispatch(fetchNewsThunk({ type: category }));
    }
  }, [dispatch, category, cacheKey, list]);

  if (loading && newsList.length === 0) {
    return <Text className="text-center text-zinc-500">Loading...</Text>;
  }

  return (
    <Box>
      <VStack space="md">
        {newsList.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => {
              const path = item.district
                ? `district/${item.district}`
                : `category/${item.category}`;

              router.push(`/${path}/${item.id}`);
            }}
            className="flex-row gap-3 px-2 py-1"
          >
            {/* IMAGE */}
            <Image
              source={{ uri: item.image || item.videoThumbnail }}
              className="w-36 h-28 aspect-video rounded-lg bg-zinc-200"
              resizeMode="cover"
            />

            {/* TEXT */}
            <View className="flex-1">
              <Text className="text-lg font-semibold" numberOfLines={2}>
                {item.news_title}
              </Text>
              <Text className="text-xs text-zinc-500 mt-1">
                {format(parseISO(item.created_at), "dd MMM yyyy")}
              </Text>
            </View>
          </Pressable>
        ))}
      </VStack>
    </Box>
  );
}

import { NewsItem } from "@/store/news/news-type";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";


type Props = {
  trendingNews: NewsItem[];
  loading:boolean
};

function pickRandomItems<T>(list: T[], count = 4): T[] {
  return [...list].sort(() => 0.5 - Math.random()).slice(0, count);
}

export default function FeaturedContent({ trendingNews,loading }: Props) {
  const router = useRouter();


  const featured = useMemo(() => {
    if (!trendingNews?.length) return [];
    return pickRandomItems(trendingNews, 4);
  }, [trendingNews]);
  const SKELETON_DATA = Array.from({ length: 5 });

  if (loading)
    return (
      <View className="mt-4">
        <View className="flex-row justify-between items-center px-4 mb-2">
          <Text className="text-lg font-bold">ట్రెండింగ్</Text>
          <Text className="text-sm text-blue-600">మరిన్ని</Text>
        </View>

        <FlatList
          data={SKELETON_DATA}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          renderItem={() => (
            <View className="mr-3 w-64">
              <View className="rounded-xl overflow-hidden bg-zinc-100">
                {/* Image Skeleton */}
                <View className="w-full h-32 bg-zinc-300" />

                {/* Text Skeleton */}
                <View className="p-3">
                  <View className="h-4 bg-zinc-300 rounded w-5/6 mb-2" />
                  <View className="h-4 bg-zinc-300 rounded w-4/6" />
                </View>
              </View>
            </View>
          )}
        />
      </View>
    );

  const [main, ...others] = featured;

  return (
    <View className="mt-3">
      {/* MAIN FEATURED */}
      {/* <Pressable
        onPress={() => router.push(`/news/${main.id}`)}
        className="px-4"
      >
        <View className="rounded-2xl overflow-hidden bg-zinc-200">
          <Image
            source={{ uri: main.image }}
            className="w-full h-52"
            resizeMode="cover"
          />

          <View className="absolute bottom-0 left-0 right-0 bg-black/60 p-4">
            <Text className="text-xs text-yellow-400 mb-1">
              {main.district? main.district.toUpperCase():main.category.toUpperCase()}
            </Text>
            <Text
              className="text-white text-lg font-bold"
              numberOfLines={2}
            >
              {main.news_title}
            </Text>
          </View>
        </View>
      </Pressable> */}

      {/* TRENDING STRIP */}
      <View className="mt-4">
        <View className="flex-row justify-between items-center px-4 mb-2">
          <Text className="text-xl font-bold">ట్రెండింగ్</Text>
          <Text className="text-base text-blue-600">మరిన్ని</Text>
        </View>

        <FlatList
          data={others}
          horizontal
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          renderItem={({ item }) => (
            <Pressable
             onPress={() => {
              const path = item.district
                ? `district/${item.district}`
                : `category/${item.category}`;

              router.push(`/${path}/${item.id}`);
            }}
              className="mr-3 w-64"
            >
              <View className="rounded-xl overflow-hidden bg-zinc-100">
                <Image
                  source={{ uri: item.image }}
                  className="w-full h-36"
                  resizeMode="cover"
                />
                <View className="p-3">
                  <Text className="text-lg font-semibold" numberOfLines={2}>
                    {item.news_title}
                  </Text>
                </View>
              </View>
            </Pressable>
          )}
        />
      </View>
    </View>
  );
}

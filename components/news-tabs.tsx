import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import NewsList from "./news-list";

const TABS = [
  { key: "latest", label: "తాజా" },
  { key: "video", label: "వీడియో" },
] as const;

export default function NewsTabs() {
  const [activeTab, setActiveTab] = useState<"latest" | "video">("latest");
  const [loading, setLoading] = useState(false);

  return (
    <View className="my-4">
      {/* TAB BAR */}
      <View className="flex-row border-b border-zinc-200 mx-4 ">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;

          return (
            <Pressable
              key={tab.key}
              onPress={() => setActiveTab(tab.key)}
              className="flex-1 py-3 items-center"
            >
              <View className="flex-row items-center gap-2">
                {tab.key === "video" && (
                  <MaterialIcons
                    name="ondemand-video"
                    size={20}
                    color={isActive ? "#5424c3" : "#71717a"}
                  />
                )}

                <Text
                  className={`text-lg font-semibold ${
                    isActive ? "text-[#5424c3]" : "text-zinc-500"
                  }`}
                >
                  {tab.label}
                </Text>
              </View>

              {isActive && (
                <View className="mt-2 h-[3px] w-8 rounded-full bg-[#5424c3]" />
              )}
            </Pressable>
          );
        })}
      </View>

      {/* TAB CONTENT */}
      <NewsList category={activeTab} />
    </View>
  );
}

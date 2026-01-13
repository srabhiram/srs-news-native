import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useViewTracker = (
  newsId: string,
  setViews: (views: number) => void
) => {
  useEffect(() => {
    if (!newsId) return;

    const key = `viewed-news-${newsId}`;
    let cancelled = false;

    const trackView = async () => {
      try {
        // 🔐 Safe get
        const keys = await AsyncStorage.getAllKeys()
        const alreadyViewed = await AsyncStorage.getItem(key);
        console.log(keys,"h")
        if (alreadyViewed) return;

        // Only send view update in production
        if(__DEV__) return

        const res = await fetch(
          `${process.env.EXPO_PUBLIC_BACKEND_API}/api/news/update/views/${newsId}`,
          { method: "POST" }
        );

        const data = await res.json();

        if (!cancelled && data[0]?.views !== undefined) {
          setViews(data[0].views);

          // ✅ Mark as viewed
          await AsyncStorage.setItem(key, "true");
        }
      } catch (err) {
        console.error("Error incrementing views:", err);
      }
    };

    trackView();

    return () => {
      cancelled = true;
    };
  }, [newsId]);
};

export default useViewTracker;

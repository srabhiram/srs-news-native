import Navbar from "@/components/navbar";
import { store } from "@/store";
import { Stack } from "expo-router";
import { StatusBar, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
export default function RootLayout() {
  return (
    <>
      <StatusBar barStyle={"dark-content"} />
      <Provider store={store}>
        <View className="flex-1 bg-white">
          {/* Fixed navbar */}
          <Navbar />
          <SafeAreaProvider>
            {/* Screen content */}
            <View className="flex-1">
              <Stack screenOptions={{ headerShown: false }} />
            </View>
          </SafeAreaProvider>
        </View>
      </Provider>
    </>
  );
}

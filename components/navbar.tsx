import { districts, navbarItems } from "@/libs/navbar-items";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { memo, useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GradientWrapper from "./linear-gradient";

interface UserDataProps {
  userData?: {
    id: string;
    name: string;
    email: string;
    isAdmin: boolean;
  } | null;
}

function Navbar({ userData }: UserDataProps) {
  const router = useRouter();

  const [districtOpen, setDistrictOpen] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [isDrawable, setIsDrawable] = useState(false);

  const screenWidth = Dimensions.get("window").width;
  const slideAnim = useRef(new Animated.Value(-288)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isDrawable ? 0 : -288,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isDrawable]);

  return (
    <GradientWrapper>
      <SafeAreaView edges={["top"]}>
        {/* TOP BAR */}
        <View className="flex-row justify-between items-center min-h-[56px] px-4 py-2">
          <TouchableOpacity
            onPress={() => setIsDrawable(true)}
            className="px-2 py-2 -ml-2"
          >
            <MaterialIcons name="menu" size={28} color="white" />
          </TouchableOpacity>

          <View className="flex-1 items-center justify-center px-4">
            <TouchableOpacity onPress={()=>{router.push("/")}}>

            <Image
              source={require("@/assets/images/logo2.png")}
              style={{
                width: Math.min(100, screenWidth * 0.3),
                height: 50,
              }}
              resizeMode="contain"
              />
              </TouchableOpacity>
          </View>

          <Pressable className="bg-white px-4 py-2 rounded-lg" onPress={()=>router.push("/login")}>
            <Text className="text-black text-sm font-semibold">Login</Text>
          </Pressable>
        </View>

        {/* DRAWER */}
        <Modal visible={isDrawable} transparent animationType="none">
          <SafeAreaView className="flex-1" edges={["top", "left"]}>
            <Pressable
              className="flex-1 bg-black/30"
              onPress={() => setIsDrawable(false)}
            >
              <Animated.View
                style={{ transform: [{ translateX: slideAnim }] }}
                className="bg-white w-72 h-full absolute left-0 top-0 shadow-xl"
              >
                <Pressable className="flex-1">
                  {/* HEADER */}
                  <View className="flex-row justify-between px-5 py-4 border-b border-gray-200">
                    <Text className="text-lg font-semibold">Menu</Text>
                    <TouchableOpacity onPress={() => setIsDrawable(false)}>
                      <MaterialIcons name="close" size={24} />
                    </TouchableOpacity>
                  </View>

                  {/* SINGLE VERTICAL SCROLLER */}
                  <FlatList
                    data={districtOpen ? districts : []}
                    keyExtractor={(item) => item.value}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    ListHeaderComponent={
                      <View className="px-5 py-2">
                        {/* NAV ITEMS */}
                        {navbarItems.map((item, index) => (
                          <Pressable
                            key={index}
                            className="py-1"
                            onPress={() => {
                              setIsDrawable(false);
                              router.push(`/${item.href}`);
                            }}
                          >
                            <Text className="text-xl font-semibold">
                              {item.name}
                            </Text>
                          </Pressable>
                        ))}

                        {/* ACCORDION HEADER */}
                        <Pressable
                          onPress={() => setDistrictOpen((p) => !p)}
                          className="flex-row justify-between py-3"
                        >
                          <Text className="text-xl font-semibold">
                            జిల్లాలు
                          </Text>
                          <AntDesign
                            name={districtOpen ? "up" : "down"}
                            size={16}
                          />
                        </Pressable>
                      </View>
                    }
                    renderItem={({ item }) => (
                      <Pressable
                        onPress={() => {
                          setSelectedDistrict(item.value);
                          setDistrictOpen(false);
                          setIsDrawable(false);
                          router.push(`/district/${item.value}`);
                        }}
                        className="px-6 py-3"
                      >
                        <Text className="text-lg text-gray-700">
                          {item.label}
                        </Text>
                      </Pressable>
                    )}
                  />
                </Pressable>
              </Animated.View>
            </Pressable>
          </SafeAreaView>
        </Modal>
      </SafeAreaView>
    </GradientWrapper>
  );
}

export default memo(Navbar);

import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";
import { ReactNode } from "react";

export default function GradientWrapper({ children }: { children: ReactNode }) {
  return (
   <LinearGradient
  colors={["#b51f1f", "#5424c3", "#1c5ce6"]}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 0 }}
  className=" justify-center"
>

      {children}
    </LinearGradient>
  );
}

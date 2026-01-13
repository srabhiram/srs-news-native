import {
  FormControl,
  FormControlLabel,
  FormControlError,
  FormControlErrorText,
  FormControlErrorIcon,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { AlertCircleIcon } from "@/components/ui/icon";
import { Input, InputField, InputSlot, InputIcon } from "@/components/ui/input";
import { Button, ButtonText, ButtonSpinner } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { LinearGradient } from "expo-linear-gradient";
import { KeyboardAvoidingView, Platform, Pressable } from "react-native";
import { Eye, EyeOff } from "lucide-react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const emailInvalid = emailTouched && !email;
  const passwordInvalid = passwordTouched && password.length < 6;
  const router = useRouter()
  const handleSubmit = async () => {
    setEmailTouched(true);
    setPasswordTouched(true);

    if (!email || password.length < 6) return;

    setLoading(true);

    // simulate API
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 justify-center px-5"
    >
      <Box className="rounded-2xl border border-zinc-200 bg-white/10 p-6 dark:border-zinc-900 dark:bg-zinc-800">
        {/* HEADER */}
        <VStack space="xs" className="mb-6">
          <Text className="text-3xl font-bold text-center">
            స్వాగతం 👋
          </Text>
          <Text className="text-center text-zinc-500">
            మీ ఖాతాలోకి లాగిన్ చేయండి
          </Text>
        </VStack>

        <VStack space="xl">
          {/* EMAIL */}
          <FormControl isInvalid={emailInvalid}>
            <FormControlLabel>
              <FormControlLabelText>యూజర్ పేరు</FormControlLabelText>
            </FormControlLabel>

            <Input>
              <InputField
                placeholder="మీ ఇమెయిల్ నమోదు చేయండి"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                onBlur={() => setEmailTouched(true)}
              />
            </Input>

            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>
                ఇమెయిల్ తప్పనిసరి
              </FormControlErrorText>
            </FormControlError>
          </FormControl>

          {/* PASSWORD */}
          <FormControl isInvalid={passwordInvalid}>
            <FormControlLabel>
              <FormControlLabelText>పాస్వర్డ్</FormControlLabelText>
            </FormControlLabel>

            <Input>
              <InputField
                placeholder="మీ పాస్వర్డ్"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                onBlur={() => setPasswordTouched(true)}
              />

              <InputSlot onPress={() => setShowPassword(!showPassword)}>
                <InputIcon
                  as={showPassword ? EyeOff : Eye}
                  className="text-zinc-500"
                />
              </InputSlot>
            </Input>

            <FormControlHelper>
              <FormControlHelperText>
                కనీసం 6 అక్షరాలు అవసరం
              </FormControlHelperText>
            </FormControlHelper>

            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>
                పాస్వర్డ్ చాలా చిన్నది
              </FormControlErrorText>
            </FormControlError>
          </FormControl>

          {/* CTA */}
          <LinearGradient
            colors={["#b51f1f", "#5424c3", "#1c5ce6"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="rounded-xl"
          >
            <Button
              onPress={handleSubmit}
              isDisabled={loading}
              className="bg-transparent h-12"
            >
              {loading ? (
                <ButtonSpinner color="white" />
              ) : (
                <ButtonText className="text-white text-lg font-semibold">
                  లాగిన్
                </ButtonText>
              )}
            </Button>
          </LinearGradient>

          {/* FOOTER */}
          <Pressable>
            <Text className="text-center text-sm text-zinc-500">
              ఖాతా లేదా?{" "}
              <Pressable className="text-[#5424c3] font-semibold" onPress={()=>router.push("/signup")}>
               <Text> సైన్ అప్ చేయండి</Text>
              </Pressable>
            </Text>
          </Pressable>
        </VStack>
      </Box>
    </KeyboardAvoidingView>
  );
}

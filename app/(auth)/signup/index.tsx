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

export default function Signup() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nameTouched, setNameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmTouched, setConfirmTouched] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const nameInvalid = nameTouched && name.length < 2;
  const emailInvalid = emailTouched && !email;
  const passwordInvalid = passwordTouched && password.length < 6;
  const confirmInvalid =
    confirmTouched && password !== confirmPassword;
  const handleSignup = async () => {
    setNameTouched(true);
    setEmailTouched(true);
    setPasswordTouched(true);
    setConfirmTouched(true);

    if (
      name.length < 2 ||
      !email ||
      password.length < 6 ||
      password !== confirmPassword
    ) {
      return;
    }

    setLoading(true);

    // simulate API call
    setTimeout(() => {
      setLoading(false);
      router.replace("/login");
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
            ఖాతా సృష్టించండి ✨
          </Text>
          <Text className="text-center text-zinc-500">
            కొత్త ఖాతాను సులభంగా ప్రారంభించండి
          </Text>
        </VStack>

        <VStack space="xl">
          {/* NAME */}
          <FormControl isInvalid={nameInvalid}>
            <FormControlLabel>
              <FormControlLabelText>పేరు</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                placeholder="మీ పేరు"
                value={name}
                onChangeText={setName}
                onBlur={() => setNameTouched(true)}
              />
            </Input>
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>
                కనీసం 2 అక్షరాలు అవసరం
              </FormControlErrorText>
            </FormControlError>
          </FormControl>

          {/* EMAIL */}
          <FormControl isInvalid={emailInvalid}>
            <FormControlLabel>
              <FormControlLabelText>ఇమెయిల్</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                placeholder="మీ ఇమెయిల్"
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
                placeholder="పాస్వర్డ్"
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

          {/* CONFIRM PASSWORD */}
          <FormControl isInvalid={confirmInvalid}>
            <FormControlLabel>
              <FormControlLabelText>పాస్వర్డ్ నిర్ధారించండి</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                placeholder="మళ్లీ పాస్వర్డ్ నమోదు చేయండి"
                secureTextEntry={!showConfirm}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                onBlur={() => setConfirmTouched(true)}
              />
              <InputSlot onPress={() => setShowConfirm(!showConfirm)}>
                <InputIcon
                  as={showConfirm ? EyeOff : Eye}
                  className="text-zinc-500"
                />
              </InputSlot>
            </Input>
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>
                పాస్వర్డ్‌లు సరిపోలడం లేదు
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
              onPress={handleSignup}
              isDisabled={loading}
              className="bg-transparent h-12"
            >
              {loading ? (
                <ButtonSpinner color="white" />
              ) : (
                <ButtonText className="text-white text-lg font-semibold">
                  సైన్ అప్
                </ButtonText>
              )}
            </Button>
          </LinearGradient>

          {/* FOOTER */}
          <Pressable onPress={() => router.push("/login")}>
            <Text className="text-center text-sm text-zinc-500">
              ఇప్పటికే ఖాతా ఉందా?{" "}
              <Pressable className="text-[#5424c3] font-semibold" onPress={()=>router.push("/login")}>
              <Text>  లాగిన్ చేయండి</Text>
              </Pressable>
            </Text>
          </Pressable>
        </VStack>
      </Box>
    </KeyboardAvoidingView>
  );
}

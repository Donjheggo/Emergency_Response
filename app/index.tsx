import { View, Image, ScrollView } from "react-native";
import { Text } from "~/components/ui/text";
import { Link } from "expo-router";

export default function Screen() {
  return (
    <ScrollView className="h-full bg-secondary">
      <View className="min-h-[80vh] flex justify-center items-center gap-5 p-6">
        <Text className="text-4xl text-primary font-semibold">
          Emergeny Response
        </Text>
        <Image
          source={require("../assets/images/auth.png")}
          resizeMode="contain"
          // className="w-[120] h-[120]"
          style={{ width: 200, height: 200 }}
        />
        <Text className="text-red-800 font-semibold text-lg px-5 text-center">
          Ready to assist in times of need, whenever you are.
        </Text>
        <Link
          href="./(auth)/sign-in"
          className="w-full border border-primary bg-primary rounded-lg p-5 items-center flex justify-center overflow-hidden"
        >
          <Text className="text-xl text-center text-white">
            Sign in to Get Started
          </Text>
        </Link>

        <Link
          href="./(auth)/sign-up"
          className="w-full border border-primary rounded-lg p-5 items-center flex justify-center overflow-hidden"
        >
          <Text className="text-xl text-center text-primary">Sign up</Text>
        </Link>
      </View>
    </ScrollView>
  );
}

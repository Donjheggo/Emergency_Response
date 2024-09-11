import { View } from "react-native";
import { Text } from "~/components/ui/text";
import { Link } from "expo-router";

export default function Screen() {
  return (
    <View className="flex-1 justify-center items-center gap-5 p-6 bg-secondary/30">
      <Text className="text-3xl">Emergeny Response</Text>
      <Text className="text-md">Sign in to get started.</Text>
      <Link href="./(auth)/sign-in">
        <Text>Sign in</Text>
      </Link>
    </View>
  );
}

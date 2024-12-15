import {
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Text } from "~/components/ui/text";

const Verify = () => {
  return (
    <SafeAreaView className="h-full bg-background">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView>
          <View className="w-full flex flex-col justify-center gap-3 px-5 mt-5">
            {/* <EmergencyForm /> */}
            <Text>Verify Form here</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Verify;

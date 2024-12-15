import {
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import EmergencyForm from "~/components/home/emergency-form";

const Home = () => {
  return (
    <SafeAreaView className="h-full bg-background">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView>
          <View className="w-full flex flex-col justify-center gap-3 px-5 mt-5">
            <EmergencyForm />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Home;

import { View, SafeAreaView, ScrollView } from "react-native";
import { Text } from "~/components/ui/text";
import EmergencyForm from "~/components/home/emergency-form";
import { Siren } from "lucide-react-native";

const Home = () => {
  return (
    <SafeAreaView className="h-full">
      <ScrollView>
        <View className="w-full flex flex-col justify-center gap-3 px-5">
          <EmergencyForm />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

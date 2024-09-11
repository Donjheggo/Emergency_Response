import { View, Text } from "react-native";
import { Redirect } from "expo-router";
import { useAuth } from "~/providers/auth-provider";

const Reports = () => {
  const { user } = useAuth();
  if (!user) {
    return <Redirect href="/sign-in" />;
  }
  return (
    <View>
      <Text>Reports</Text>
    </View>
  );
};

export default Reports;

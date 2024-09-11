import { View, Text } from "react-native";
import { Redirect } from "expo-router";
import { useAuth } from "~/providers/auth-provider";

const Home = () => {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href="/sign-in" />;
  }
  return (
    <View>
      <Text>Email: {user?.email}</Text>
    </View>
  );
};

export default Home;

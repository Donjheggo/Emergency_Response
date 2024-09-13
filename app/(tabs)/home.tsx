import { View, Text } from "react-native";
import { useAuth } from "~/providers/auth-provider";

const Home = () => {
  const { user } = useAuth();

  return (
    <View>
      <Text>Email: {user?.email}</Text>
    </View>
  );
};

export default Home;

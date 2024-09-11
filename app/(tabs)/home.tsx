import { View, Text } from "react-native";
import React, { useContext } from "react";
import { SessionContext } from "./_layout";

const Home = () => {
  const session = useContext(SessionContext)

  return (
    <View>
      <Text>{session ? session.email : "No Session"}</Text>
    </View>
  );
};

export default Home;

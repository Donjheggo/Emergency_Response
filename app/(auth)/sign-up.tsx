import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";

const SignUp = () => {
  return (
    <View>
      <Text>Name Input</Text>
      <Text>Email Input</Text>
      <Text>Password Input</Text>
      <Text>Create Account Button</Text>
      <Link href="./sign-in" className="text-primary text-2xl">Sign in</Link>
    </View>
  );
};

export default SignUp;

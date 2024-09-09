import { View, Text } from "react-native";
import { Link } from "expo-router";
import React from "react";

const SignIn = () => {
  return (
    <View>
      <Text className="text-3xl">SignIn</Text>
      <View className="mt-5">
        <Text>Name Input</Text>
        <Text>Email Input</Text>
        <Text>Password Input</Text>
        <Text>Create Account Button</Text>
        <Link href="./sign-up" className="text-2xl text-primary">Sign up</Link>
      </View>
    </View>
  );
};

export default SignIn;

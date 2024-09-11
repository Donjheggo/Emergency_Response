import React from "react";
import { View, Image, SafeAreaView, ScrollView, AppState } from "react-native";
import { supabase } from "~/lib/supabase";
import { Slot } from "expo-router";

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

const AuthLayout = () => {
  return (
    <SafeAreaView className="h-full bg-secondary">
      <ScrollView>
        <View className="min-h-[70vh] flex justify-center items-center gap-5 p-6">
          <Image
            source={require("../../assets/images/adaptive-icon.png")}
            resizeMode="contain"
            // className="w-[120] h-[120]"
            style={{ width: 100, height: 100 }}
          />
          <Slot />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AuthLayout;

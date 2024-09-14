import { View, Image, SafeAreaView, ScrollView, AppState } from "react-native";
import { supabase } from "~/lib/supabase";
import { router, Slot } from "expo-router";
import { useAuth } from "~/context/auth-context";
import { useEffect } from "react";

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

const AuthLayout = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      router.push("/home");
    }
  }, [user]);

  return (
    <SafeAreaView className="h-full bg-secondary">
      <ScrollView>
        <View className="min-h-[50vh] flex justify-center items-center gap-5 p-6">
          <Image
            source={require("../../assets/images/auth.png")}
            resizeMode="contain"
            // className="w-[120] h-[120]"
            style={{ width: 200, height: 200 }}
          />
          <Slot />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AuthLayout;

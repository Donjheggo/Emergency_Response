import React, { useState } from "react";
import { View } from "react-native";
import { Text } from "~/components/ui/text";
import { supabase } from "~/lib/supabase";
import { Button } from "~/components/ui/button";
import { useAuth } from "~/context/auth-context";
import { Redirect } from "expo-router";
import { ThemeToggle } from "~/components/theme-toggle";
import { LogOut } from "lucide-react-native";

const Settings = () => {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href="/sign-in" />;
  }

  const [loading, setLoading] = useState(false);

  async function signOut() {
    setLoading(true);
    await supabase.auth.signOut();
    setLoading(false);
  }

  return (
    <View className="px-5 flex flex-col space-x-5">
      <ThemeToggle />
      <Button
        size="lg"
        disabled={loading}
        onPress={signOut}
        variant="destructive"
        className="mt-5 flex flex-row"
      >
        <LogOut color="#fff" />
        <Text className="ml-2">Sign Out</Text>
      </Button>
    </View>
  );
};

export default Settings;

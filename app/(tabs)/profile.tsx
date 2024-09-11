import { View } from "react-native";
import { Text } from "~/components/ui/text";
import { supabase } from "~/lib/supabase";
import { router } from "expo-router";
import { Button } from "~/components/ui/button";
import React, { useState, useContext } from "react";
import { SessionContext } from "./_layout";


const Profile = () => {
  const session = useContext(SessionContext)
  const [isLoading, setLoading] = useState(false);

  async function signOut() {
    setLoading(true);
    await supabase.auth.signOut();
    router.replace("/sign-in");
    setLoading(false);
  }

  return (
    <View>
      <Text className="text-2xl">Profile</Text>
      <Text>{session ? session.user.email : 'No Account'}</Text>
      <Button disabled={isLoading} onPress={signOut} variant="secondary">
        <Text>Sign out</Text>
      </Button>
    </View>
  );
};

export default Profile;

import { View } from "react-native";
import { Text } from "~/components/ui/text";
import { supabase } from "~/lib/supabase";
import { router } from "expo-router";
import { Button } from "~/components/ui/button";
import React, { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";

const Profile = () => {
  const [isLoading, setLoading] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

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
      <Button onPress={signOut} variant="secondary">
        <Text>Sign out</Text>
      </Button>
    </View>
  );
};

export default Profile;

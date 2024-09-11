import { View } from "react-native";
import { Text } from "~/components/ui/text";
import { supabase } from "~/lib/supabase";
import { Redirect } from "expo-router";
import { Button } from "~/components/ui/button";
import React, { useState, useEffect } from "react";
import { useAuth } from "~/providers/auth-provider";
import { Alert } from "react-native";

type UserData = {
  name: string;
  email: string;
};

const Profile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  async function signOut() {
    setLoading(true);
    await supabase.auth.signOut();
    setLoading(false);
  }

  useEffect(() => {
    if (user) getProfile();
  }, [user]);

  async function getProfile() {
    try {
      if (!user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase
        .from("user")
        .select()
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUserData({ name: data?.name, email: data?.email });
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    }
  }

  if (!user) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <View>
      <Text className="text-2xl">Profile</Text>
      <Text>Name: {userData?.name ?? "No name added yet"}</Text>
      <Text>Email: {userData?.email}</Text>
      <Button disabled={loading} onPress={signOut} variant="secondary">
        <Text>Sign out</Text>
      </Button>
    </View>
  );
};

export default Profile;

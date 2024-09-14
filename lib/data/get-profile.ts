import { supabase } from "../supabase";
import { Alert } from "react-native";

export async function getProfile(userId: string) {
  try {
    const { data, error, status } = await supabase
      .from("user")
      .select()
      .eq("id", userId)
      .single();

    if (error && status !== 406) {
      throw error;
    }
    return data;
  } catch (error) {
    if (error instanceof Error) {
      Alert.alert(error.message);
    }
  }
}

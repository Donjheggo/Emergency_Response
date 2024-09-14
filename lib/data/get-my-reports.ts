import { supabase } from "../supabase";
import { Alert } from "react-native";

export async function getEmergencyWithResponder(userId: string) {
  try {
    const { data, error } = await supabase
      .from("emergency")
      .select(`*, responder ( type ) `)
      .eq("userId", userId);

    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    if (error instanceof Error) {
      Alert.alert(error.message);
    }
  }
}

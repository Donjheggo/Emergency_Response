import { supabase } from "../supabase";
import { Alert } from "react-native";

export type ResponderT = {
  id: string;
  type: string;
};

export async function getResponders() {
  try {
    const { data, error } = await supabase.from("responder").select("id, type");

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

export async function getResponder(id: string) {
  try {
    const { data, error } = await supabase
      .from("responder")
      .select("*")
      .eq("id", id);

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

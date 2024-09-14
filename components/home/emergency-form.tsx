import { View } from "react-native";
import { useEffect, useState } from "react";
import { Text } from "~/components/ui/text";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "~/context/auth-context";
import { Alert } from "react-native";
import { router } from "expo-router";
import { getResponders, type ResponderT } from "~/lib/data/responders";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { supabase } from "~/lib/supabase";

export type EmergencyT = {
  userId: string;
  reponderId: string | undefined;
  description?: string;
  address: string;
};

const EmergencyForm = () => {
  const { user } = useAuth();
  const [responders, setResponders] = useState<ResponderT[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState({
    userId: user?.id,
    responderId: "",
    status: "pending",
    description: "",
    address: "",
  });

  useEffect(() => {
    const fetchResponders = async () => {
      const responder = await getResponders();
      if (responder) setResponders(responder);
    };

    fetchResponders();
  }, []);

  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 5,
    right: 12,
  };

  const handleSubmit = async () => {
    if (!form.responderId || !form.address || !form.description) {
      Alert.alert("Please fill out all fields.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from("emergency").insert(form);
      if (error) Alert.alert(error.message);
      Alert.alert("Emergency Submitted Successfully.");
      setLoading(false);
      router.replace("/reports");
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
        setLoading(false);
      }
      setLoading(false);
    }
  };

  return (
    <>
      <View>
        <Label nativeID="email" className="pb-1">
          Responder
        </Label>
        <Select
          defaultValue={{ value: "", label: "" }}
          onValueChange={(value) =>
            setForm({ ...form, responderId: value?.value || "" })
          }
        >
          <SelectTrigger>
            <SelectValue
              className="text-foreground text-sm native:text-lg"
              placeholder="Select a responder"
            />
          </SelectTrigger>
          <SelectContent insets={contentInsets}>
            <SelectGroup>
              {responders?.map((item, index) => (
                <SelectItem key={index} label={item.type} value={item.id}>
                  {item.type}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </View>
      <View>
        <Label nativeID="email" className="pb-1">
          Description
        </Label>
        <Textarea
          placeholder="Isulat diri ang panghitabo."
          value={form.description}
          onChangeText={(e) => setForm({ ...form, description: e })}
          aria-labelledby="Description"
        />
      </View>
      <View>
        <Label nativeID="email" className="pb-1">
          Address
        </Label>
        <Input
          placeholder="Purok, Street, Barangay"
          value={form.address}
          onChangeText={(e) => setForm({ ...form, address: e })}
          aria-labelledby="Address"
          aria-errormessage="inputError"
          keyboardType="default"
        />
      </View>

      <Button
        size="lg"
        onPress={handleSubmit}
        disabled={loading}
        variant="default"
        className="text-white mt-2"
      >
        <Text>Submit Emergency</Text>
      </Button>
    </>
  );
};

export default EmergencyForm;

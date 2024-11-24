import { Locate } from "lucide-react-native";
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
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { decode } from "base64-arraybuffer";
import { Image } from "react-native";

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
  const [form, setForm] = useState<any>({
    userId: user?.id,
    responderId: "",
    status: "pending",
    description: "",
    address: "",
    name: "",
    contact_number: "",
    image: "",
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

  // Function to get user's location
  const handleGetLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission to access location was denied");
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const address = `${location.coords.latitude}, ${location.coords.longitude}`;
    setForm({ ...form, address });
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setForm({ ...form, image: result.assets[0].uri });
    }
  };

  const handleSubmit = async () => {
    if (!form.responderId || !form.address || !form.description) {
      Alert.alert("Please fill out all fields.");
      return;
    }

    setLoading(true);

    try {
      const image = form.image;
      const base64 = await FileSystem.readAsStringAsync(image, {
        encoding: "base64",
      });
      const filePath = `${new Date().getTime()}_emergency.jpg`;
      const contentType = "image/*";
      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, decode(base64), { contentType });

      if (uploadError) {
        Alert.alert(uploadError.message);
        return;
      }

      const { data: imageData } = supabase.storage
        .from("images")
        .getPublicUrl(filePath);

      if (!imageData) {
        Alert.alert("Failed to upload image.");
      }

      // Insert emergency record with image URL
      const { error } = await supabase
        .from("emergency")
        .insert({ ...form, image: imageData.publicUrl });

      if (error) {
        Alert.alert(error.message);
        setLoading(false);
        return;
      }
      setForm({
        userId: user?.id,
        responderId: "",
        status: "pending",
        description: "",
        address: "",
        name: "",
        contact_number: "",
        image: "",
      });
      Alert.alert("Emergency Submitted Successfully.");
      setLoading(false);
      router.replace("/reports");
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
      setLoading(false);
    }
  };

  return (
    <>
      <View>
        <Label nativeID="email" className="pb-1">
          Emergency Responder
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
        <Label nativeID="image" className="pb-1">
          Image
        </Label>
        <View className="flex-row items-center gap-2">
          <Input
            placeholder="Select an image..."
            value={form.image}
            editable={false}
            aria-labelledby="image"
            className="hidden"
          />
          <Button variant="outline" onPress={pickImage}>
            <Text>Browse</Text>
          </Button>
        </View>
        {form.image ? (
          <View className="mt-2">
            <Image
              source={{ uri: form.image }}
              style={{ width: 200, height: 200 }}
              className="rounded-md"
            />
          </View>
        ) : null}
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
        <Label nativeID="name" className="pb-1">
          Full name
        </Label>
        <Input
          placeholder="Full name"
          value={form.name}
          onChangeText={(e) => setForm({ ...form, name: e })}
          aria-labelledby="name"
          aria-errormessage="inputError"
          keyboardType="default"
        />
      </View>
      <View>
        <Label nativeID="contact_number" className="pb-1">
          Contact number
        </Label>
        <Input
          placeholder="09*********"
          value={form.contact_number}
          onChangeText={(e) => setForm({ ...form, contact_number: e })}
          aria-labelledby="name"
          aria-errormessage="inputError"
          keyboardType="default"
        />
      </View>
      <View>
        <Label nativeID="email" className="pb-1">
          Location
        </Label>
        <View className="relative">
          <Input
            editable={false}
            placeholder=""
            value={form.address}
            onChangeText={(e) => setForm({ ...form, address: e })}
            aria-labelledby="Address"
            aria-errormessage="inputError"
            keyboardType="default"
          />
        </View>
        <Button
          onPress={handleGetLocation}
          variant="ghost"
          size="icon"
          className="absolute right-1 top-8"
        >
          <Locate color="#e11d48" />
        </Button>
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

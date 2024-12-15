import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { View } from "react-native";
import { useState } from "react";
import { Text } from "~/components/ui/text";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { useAuth } from "~/context/auth-context";
import { Alert } from "react-native";
import { router } from "expo-router";
import { supabase } from "~/lib/supabase";
import { decode } from "base64-arraybuffer";
import { Image } from "react-native";

export type EmergencyT = {
  userId: string;
  reponderId: string | undefined;
  description?: string;
  address: string;
};

const VerifyForm = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState<{
    user_id: string;
    name: string;
    selfie_image: string;
    id_front_image: string;
    id_back_image: string;
  }>({
    user_id: user?.id || "",
    name: "",
    selfie_image: "",
    id_front_image: "",
    id_back_image: "",
  });

  const pickImage = async (
    field: "selfie_image" | "id_front_image" | "id_back_image"
  ) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setForm({ ...form, [field]: result.assets[0].uri });
    }
  };
  const handleSubmit = async () => {
    if (
      !form.name ||
      !form.selfie_image ||
      !form.id_front_image ||
      !form.id_back_image
    ) {
      Alert.alert("Please fill out all fields.");
      return;
    }

    setLoading(true);

    try {
      const uploadImage = async (imageUri: string) => {
        const base64 = await FileSystem.readAsStringAsync(imageUri, {
          encoding: "base64",
        });
        const filePath = `${new Date().getTime()}_${Math.random()
          .toString(36)
          .substr(2, 9)}.jpg`;
        const contentType = "image/*";

        const { error: uploadError } = await supabase.storage
          .from("images")
          .upload(filePath, decode(base64), { contentType });

        if (uploadError) {
          throw new Error(uploadError.message);
        }

        const { data: imageData } = supabase.storage
          .from("images")
          .getPublicUrl(filePath);

        if (!imageData) {
          throw new Error("Failed to upload image.");
        }

        return imageData.publicUrl;
      };

      // Upload all images
      const selfieImageUrl = await uploadImage(form.selfie_image);
      const idFrontImageUrl = await uploadImage(form.id_front_image);
      const idBackImageUrl = await uploadImage(form.id_back_image);

      // Insert record into the database
      const { error } = await supabase.from("verification").insert({
        user_id: form.user_id,
        name: form.name,
        selfie_image: selfieImageUrl,
        id_front_image: idFrontImageUrl,
        id_back_image: idBackImageUrl,
      });

      if (error) {
        throw new Error(error.message);
      }

      // Reset form
      setForm({
        user_id: "",
        name: "",
        selfie_image: "",
        id_front_image: "",
        id_back_image: "",
      });

      Alert.alert("Verification Submitted Successfully.");
      router.replace("/reports");
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="gap-4">
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
        <Label nativeID="image" className="pb-1">
          Selfie Image
        </Label>
        <View className="flex-row items-center gap-2">
          <Input
            placeholder="Select an image..."
            value={form.selfie_image}
            editable={false}
            aria-labelledby="image"
            className="hidden"
          />
          <Button variant="outline" onPress={() => pickImage("selfie_image")}>
            <Text>Browse</Text>
          </Button>
        </View>
        {form.selfie_image ? (
          <View className="mt-2">
            <Image
              source={{ uri: form.selfie_image }}
              style={{ width: 100, height: 100 }}
              className="rounded-md"
            />
          </View>
        ) : null}
      </View>

      <View>
        <Label nativeID="image" className="pb-1">
          Front ID Image
        </Label>
        <View className="flex-row items-center gap-2">
          <Input
            placeholder="Select an image..."
            value={form.id_front_image}
            editable={false}
            aria-labelledby="image"
            className="hidden"
          />
          <Button variant="outline" onPress={() => pickImage("id_front_image")}>
            <Text>Browse</Text>
          </Button>
        </View>
        {form.id_front_image ? (
          <View className="mt-2">
            <Image
              source={{ uri: form.id_front_image }}
              style={{ width: 100, height: 100 }}
              className="rounded-md"
            />
          </View>
        ) : null}
      </View>

      <View>
        <Label nativeID="image" className="pb-1">
          Back ID Image
        </Label>
        <View className="flex-row items-center gap-2">
          <Input
            placeholder="Select an image..."
            value={form.id_back_image}
            editable={false}
            aria-labelledby="image"
            className="hidden"
          />
          <Button variant="outline" onPress={() => pickImage("id_back_image")}>
            <Text>Browse</Text>
          </Button>
        </View>
        {form.id_back_image ? (
          <View className="mt-2">
            <Image
              source={{ uri: form.id_back_image }}
              style={{ width: 100, height: 100 }}
              className="rounded-md"
            />
          </View>
        ) : null}
      </View>

      <Button
        size="lg"
        onPress={handleSubmit}
        disabled={loading}
        variant="default"
        className="text-white mt-2"
      >
        <Text>Submit Verification</Text>
      </Button>
    </View>
  );
};

export default VerifyForm;

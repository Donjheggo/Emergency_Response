import React, { useState } from "react";
import { View } from "react-native";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import { Eye, EyeOff } from "lucide-react-native";
import { Link } from "expo-router";

const SignIn = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    alert(JSON.stringify(form));
  };

  return (
    <View className="w-full flex flex-col gap-3">
      <Text className="text-center font-semibold text-2xl text-primary">
        Sign in
      </Text>
      <View>
        <Label nativeID="email" className="pb-1">
          Email
        </Label>
        <Input
          placeholder="johndoe@email.com"
          value={form.email}
          onChangeText={(e) => setForm({ ...form, email: e })}
          aria-labelledby="inputLabel"
          aria-errormessage="inputError"
          keyboardType="email-address"
        />
      </View>
      <View>
        <Label nativeID="password" className="pb-1">
          Password
        </Label>
        <View className="relative">
          <Input
            placeholder="Password"
            value={form.password}
            onChangeText={(e) => setForm({ ...form, password: e })}
            aria-labelledby="inputLabel"
            aria-errormessage="inputError"
            secureTextEntry={!showPassword}
          />
          <Button
            onPress={() => setShowPassword(!showPassword)}
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1"
          >
            {showPassword ? (
              <EyeOff color="#e11d48" />
            ) : (
              <Eye color="#e11d48" />
            )}
          </Button>
        </View>
      </View>
      <Button
        onPress={handleSubmit}
        variant="default"
        className="text-white mt-2"
      >
        <Text>Create Account</Text>
      </Button>
      <Text>
        Don't have an account?
        <Link href="/sign-up" className="text-primary">
          {" "}
          Sign uo
        </Link>
      </Text>
    </View>
  );
};

export default SignIn;

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Pressable, View } from "react-native";
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";
import { MoonStar } from "~/lib/icons";
import { Sun } from "~/lib/icons";
import { useColorScheme } from "~/lib/use-color-scheme";
import { cn } from "~/lib/utils";
import { Button } from "./ui/button";
import { Text } from "./ui/text";

export function ThemeToggle() {
  const { isDarkColorScheme, setColorScheme } = useColorScheme();
  return (
    <Button
      size="lg"
      variant="outline"
      onPress={() => {
        const newTheme = isDarkColorScheme ? "light" : "dark";
        setColorScheme(newTheme);
        setAndroidNavigationBar(newTheme);
        AsyncStorage.setItem("theme", newTheme);
      }}
      className="web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 w-full"
    >
      {({ pressed }) => (
        <View
          className={cn(
            "flex flex-row justify-center items-start",
            pressed && "opacity-70"
          )}
        >
          {isDarkColorScheme ? (
            <Sun className="text-foreground" size={24} strokeWidth={1.25} />
          ) : (
            <MoonStar
              className="text-foreground"
              size={23}
              strokeWidth={1.25}
            />
          )}
          <Text className="ml-2">
            {" "}
            {isDarkColorScheme ? "Light Mode" : "Dark Mode"}
          </Text>
        </View>
      )}
    </Button>
  );
}

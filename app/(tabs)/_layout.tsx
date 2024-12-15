import { Redirect, Tabs } from "expo-router";
import { TabIcon } from "~/components/tab-icon";
import { Home, User, ClipboardPlus, Settings } from "~/lib/icons";
import { useAuth } from "~/context/auth-context";
import { useColorScheme } from "~/lib/use-color-scheme";

export default function TabsLayout() {
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();

  const { user } = useAuth();

  if (!user) {
    return <Redirect href="/sign-in" />;
  }
  return (
    <Tabs
      screenOptions={() => ({
        headerStyle: { backgroundColor: isDarkColorScheme ? "black" : "white" },
        tabBarStyle: { backgroundColor: isDarkColorScheme ? "black" : "white" },
        headerTitleStyle: { color: isDarkColorScheme ? "white" : "black" },
        tabBarActiveTintColor: "#ff0000", // Active icon color
      })}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Report Emergency",
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={Home} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="reports"
        options={{
          title: "My Reports",
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={ClipboardPlus} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={Settings} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

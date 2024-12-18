import { Redirect, Tabs } from "expo-router";
import { TabIcon } from "~/components/tab-icon";
import { Home, SquareUserRound, ClipboardPlus, Settings } from "~/lib/icons";
import { useAuth } from "~/context/auth-context";
import { useColorScheme } from "~/lib/use-color-scheme";

export default function TabsLayout() {
  const { isDarkColorScheme } = useColorScheme();
  const { user, submitted_verification } = useAuth();

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
        name="verify"
        options={{
          title: submitted_verification ? undefined : "Verify",
          href: submitted_verification ? null : undefined,
          tabBarIcon: submitted_verification
            ? undefined
            : ({ focused }) => (
                <TabIcon icon={SquareUserRound} focused={focused} />
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

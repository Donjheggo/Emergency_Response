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

  console.log("Submitted Verification: ", submitted_verification);

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
      {submitted_verification ? (
        <Tabs.Screen
          name="verify"
          options={{
            href: null,
          }}
        />
      ) : (
        <Tabs.Screen
          name="verify"
          options={{
            title: "Verify",
            tabBarIcon: ({ focused }) => (
              <TabIcon icon={SquareUserRound} focused={focused} />
            ),
          }}
        />
      )}
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

import { Redirect, Tabs } from "expo-router";
import { TabIcon } from "~/components/tab-icon";
import { Home, User, ClipboardPlus } from "~/lib/icons";
import { useAuth } from "~/context/auth-context";

export default function TabsLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href="/sign-in" />;
  }
  return (
    <Tabs>
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
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={User} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

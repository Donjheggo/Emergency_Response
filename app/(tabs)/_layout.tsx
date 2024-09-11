import React from "react";
import { View } from "lucide-react-native";
import { Tabs } from "expo-router";
import { TabIcon } from "~/components/tab-icon";
import { Home, User, ClipboardPlus } from "~/lib/icons";

export default function TabsLayout() {
  return (
    <>
      <Tabs>
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ focused }) => (
              <TabIcon icon={Home} focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="reports"
          options={{
            title: "Reports",
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
    </>
  );
}

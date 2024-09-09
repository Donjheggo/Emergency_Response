import React from "react";
import { Tabs, Redirect } from "expo-router";
import { TabIcon } from "~/components/tab-icon";
// import { Home } from "~/lib/icons/Home";
// import { User } from "~/lib/icons/Profile";
// import { ClipboardPlus } from "~/lib/icons/reports";
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

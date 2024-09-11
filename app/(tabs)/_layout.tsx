import React, { useState, useEffect, createContext } from "react";
import { supabase } from "~/lib/supabase";
import { Tabs, router } from "expo-router";
import { TabIcon } from "~/components/tab-icon";
import { Session } from "@supabase/supabase-js";
import { Home, User, ClipboardPlus } from "~/lib/icons";

export const SessionContext = createContext<Session | null>(null)

export default function TabsLayout() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (!session?.user) {
    router.push("/sign-in");
    return null;
  }

  return (
    <SessionContext.Provider value={session}>
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
    </SessionContext.Provider>
  );
}

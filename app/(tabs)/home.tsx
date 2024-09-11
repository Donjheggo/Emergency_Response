import { View, Text } from "react-native";
import { supabase } from "~/lib/supabase";
import { Session } from "@supabase/supabase-js";
import React, { useState, useEffect } from "react";

const Home = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <View>
      <Text>{session ? session.user.email : 'No Session'}</Text>
    </View>
  );
};

export default Home;

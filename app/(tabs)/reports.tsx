import { View, ScrollView, RefreshControl, SafeAreaView } from "react-native";
import { useState, useEffect, useCallback } from "react";
import { Redirect } from "expo-router";
import { useAuth } from "~/context/auth-context";
import { getEmergencyWithResponder } from "~/lib/data/get-my-reports";
import { supabase } from "~/lib/supabase";
import ReportCard from "~/components/reports/report-card";
import { EmergencyWithResponderT } from "~/components/reports/report-card";

const Reports = () => {
  const { user } = useAuth();
  if (!user) {
    return <Redirect href="/sign-in" />;
  }

  const [reports, setReports] = useState<any>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const fetchReports = async () => {
      const data = await getEmergencyWithResponder(user.id);
      setReports(data);
    };

    fetchReports();

    const subscription = supabase
      .channel("public:emergency")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "emergency",
          filter: `userId=eq.${user.id}`,
        },
        fetchReports
      )
      .subscribe();

    // Cleanup subscription on component unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [user.id]);

  return (
    <SafeAreaView className="h-full bg-background">
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="px-5 items-center mt-5">
          {reports?.map((item: EmergencyWithResponderT, index: number) => (
            <ReportCard key={index} item={item} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Reports;

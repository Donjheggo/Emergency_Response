import { Animated, View } from "react-native";
import { Text } from "../ui/text";
import { Tables } from "~/types/supabase";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Ambulance, Loader, CircleX } from "lucide-react-native";

type ResponderT = Tables<"responder">;

export type EmergencyWithResponderT = {
  id: string;
  description: string;
  created_at: Date;
  address: string;
  responder: ResponderT;
  isRead: boolean;
  status: "pending" | "responded" | "declined";
};

export const ReportCard = ({ item }: { item: EmergencyWithResponderT }) => {
  const formattedDate = new Date(item.created_at).toDateString();

  return (
    <Card className="w-full max-w-sm mt-2">
      <CardHeader>
        <CardTitle>{item.responder?.type}</CardTitle>
        <CardDescription>
          <Text>{formattedDate} - </Text>
          <Text>{item.isRead ? "Read" : "Unread"}</Text>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Text className="text-lg">Description: {item.description}</Text>
      </CardContent>
      <CardFooter>
        {item.status === "pending" ? (
          <View className="flex flex-row items-center gap-1">
            <Loader color={"#e11d48"} />
            <Text className="text-primary">Pending...</Text>
          </View>
        ) : item.status === "responded" ? (
          <View className="flex flex-row items-center gap-1">
            <Ambulance color={"#e11d48"} />
            <Text className="text-primary">Responded</Text>
          </View>
        ) : item.status === "declined" ? (
          <View className="flex flex-row items-center gap-1">
            <CircleX color={"#e11d48"} />
            <Text className="text-primary">Declined</Text>
          </View>
        ) : (
          ""
        )}
      </CardFooter>
    </Card>
  );
};

export default ReportCard;

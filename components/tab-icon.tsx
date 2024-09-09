import { TabIconProps } from "~/lib/types";

export const TabIcon: React.FC<TabIconProps> = ({ icon: Icon, focused }) => {
  return (
    <Icon
      className={`${focused ? "text-primary" : "text-muted-foreground"}`}
      size={24}
    />
  );
};

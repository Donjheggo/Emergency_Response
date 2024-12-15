import {
  Home,
  User,
  ClipboardPlus,
  Sun,
  MoonStar,
  Settings,
  SquareUserRound,
} from "lucide-react-native";
import type { LucideIcon } from "lucide-react-native";
import { cssInterop } from "nativewind";

export function IconWithClassName(icon: LucideIcon) {
  cssInterop(icon, {
    className: {
      target: "style",
      nativeStyleToProp: {
        color: true,
        opacity: true,
      },
    },
  });
}

IconWithClassName(Home);
IconWithClassName(User);
IconWithClassName(ClipboardPlus);
IconWithClassName(Sun);
IconWithClassName(Settings);
IconWithClassName(MoonStar);
IconWithClassName(SquareUserRound);

export { Home, User, ClipboardPlus, Sun, MoonStar, Settings, SquareUserRound };

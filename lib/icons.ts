import { Home, User, ClipboardPlus, Sun, MoonStar } from "lucide-react-native";
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
IconWithClassName(MoonStar);

export { Home, User, ClipboardPlus, Sun, MoonStar };

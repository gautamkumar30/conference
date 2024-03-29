import { Home } from "lucide-react";
import { BadgePlus } from "lucide-react";
import { Search } from "lucide-react";
import { UserRound } from "lucide-react";
import { CalendarCheck2 } from "lucide-react";

const strokeWidth = 1.8;
const primaryColor = "#233169";

export const routes = [
  {
    label: "Home",
    route: "/",
    component: <Home strokeWidth={strokeWidth} color={primaryColor} />,
  },
  {
    label: "Organize",
    route: "/organize",
    component: <BadgePlus strokeWidth={strokeWidth} color={primaryColor} />,
  },
  {
    label: "Registered",
    route: "/registered",
    component: (
      <CalendarCheck2 strokeWidth={strokeWidth} color={primaryColor} />
    ),
  },
  {
    label: "Explore",
    route: "/explore",
    component: <Search strokeWidth={strokeWidth} color={primaryColor} />,
  },
  {
    label: "Profile",
    route: "/profile",
    component: <UserRound strokeWidth={strokeWidth} color={primaryColor} />,
  },
];

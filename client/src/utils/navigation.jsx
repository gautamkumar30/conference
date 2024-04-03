import { Home } from "lucide-react";
import { UserRoundCogIcon } from "lucide-react";
import { MailPlus } from "lucide-react";
import { SquarePen } from "lucide-react";
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
    label: "Create",
    route: "/conference/create",
    component: <SquarePen strokeWidth={strokeWidth} color={primaryColor} />,
  },
  {
    label: "Registered",
    route: "/conference/registered",
    component: (
      <CalendarCheck2 strokeWidth={strokeWidth} color={primaryColor} />
    ),
  },
  {
    label: "Organized",
    route: "/conference/organized",
    component: (
      <UserRoundCogIcon strokeWidth={strokeWidth} color={primaryColor} />
    ),
  },
  {
    label: "Invitations",
    route: "/invitations",
    component: <MailPlus strokeWidth={strokeWidth} color={primaryColor} />,
  },
];

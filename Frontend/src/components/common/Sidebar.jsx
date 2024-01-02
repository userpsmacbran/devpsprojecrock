import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import MailIcon from "@mui/icons-material/Mail";
import Divider from "@mui/material/Divider";
import { useTranslation } from "react-i18next";
import SidebarItem from "./SidebarItem";
import SidebarItemCollapse from "./SidebarItemCollapse";

function Sidebar() {
  const { t } = useTranslation();

  const menuItems = [
    {
      id: "dashboard",
      translationKey: "menu_dashboard",
      icon: <InboxIcon />,
      subItems: null,
    },
    {
      id: "users",
      translationKey: "menu_users",
      icon: <MailIcon />,
      subItems: [
        {
          id: "companies",
          translationKey: "menu_companies",
          icon: <MailIcon />,
        },
        {
          id: "clients",
          translationKey: "menu_clients",
          icon: <InboxIcon />,
        },
        {
          id: "moderators",
          translationKey: "menu_moderators",
          icon: <MailIcon />,
        },
      ],
    },
    {
      id: "graphics",
      translationKey: "menu_graphics",
      icon: <InboxIcon />,
      subItems: null,
    },
    {
      id: "transactions",
      translationKey: "menu_transactions",
      icon: <InboxIcon />,
    },
    {
      id: "help",
      translationKey: "menu_help",
      icon: <InboxIcon />,
      subItems: null,
    },
  ];

  return (
    <div className="bg-[#555CB3] h-screen">
      <div className="flex mx-8 justify-center items-center space-x-2 my-8">
        <img src="/logo.jpg" className="h-12 w-12" alt="" />
        <h2
          style={{ textShadow: "2px 2px 1px #B45946", color: "white" }}
          className="font-semibold text-white text-xl tracking-widest text-shadow-lg"
        >
          PSROCKOLA
        </h2>
      </div>
      <Divider />
      <List>
        {menuItems.map((item, index) =>
          item.subItems ? (
            <SidebarItemCollapse item={item} t={t} key={index} />
          ) : (
            <SidebarItem item={item} t={t} key={index} />
          )
        )}
      </List>
    </div>
  );
}

export default Sidebar;

import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import NotificationsIcon from "@mui/icons-material/Notifications";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import MicIcon from "@mui/icons-material/Mic";

const drawerWidth = 240;

function Layout(props) {
  const { t } = useTranslation();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { id: "dashboard", translationKey: "menu_dashboard", icon: <InboxIcon /> },
    { id: "users", translationKey: "menu_users", icon: <MailIcon /> },
    { id: "graphics", translationKey: "menu_graphics", icon: <InboxIcon /> },
    {
      id: "transactions",
      translationKey: "menu_transactions",
      icon: <InboxIcon />,
    },
    { id: "help", translationKey: "menu_help", icon: <InboxIcon /> },
  ];

  const drawer = (
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
        {menuItems.map((item) => (
          <Link to={`/${item.id}`} key={item.id}>
            <ListItemButton
              sx={{
                display: "flex",
                marginLeft: "30px",
                marginRight: "30px",
                "&:hover": {
                  backgroundColor: "#8087DF",
                  borderRadius: "60px",
                },
                "&:not(:hover)": {
                  backgroundColor: "transparent",
                  borderRadius: "40px",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
                className="space-x-4"
              >
                <ListItemIcon sx={{ color: "white", minWidth: 0 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  sx={{ color: "white", ml: 0 }}
                  primary={t(item.translationKey)}
                />
              </Box>
            </ListItemButton>
          </Link>
        ))}
      </List>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "white",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: { sm: "none" },
              color: "black",
              borderRadius: "50px",
              backgroundColor: "#f5f5f5",
            }}
          >
            <MenuIcon />
          </IconButton>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginLeft: "auto",
            }}
          >
            {/* Selector de idioma */}
            <LanguageSwitcher />

            {/* Campo de búsqueda */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#f5f5f5",
                borderRadius: "50px",
                width: "260px",
                marginLeft: "20px",
              }}
            >
              <IconButton sx={{ color: "gray", marginX: "3px" }}>
                <SearchIcon />
              </IconButton>
              <InputBase
                placeholder="Busqueda"
                inputProps={{ "aria-label": "search" }}
                sx={{
                  ml: 1,
                  borderRadius: "50px",
                  padding: "8px",
                  width: "100%",
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <MicIcon sx={{ color: "gray" }} />
                  </InputAdornment>
                }
              />
            </Box>

            {/* Notificaciones */}
            <IconButton sx={{ marginX: "10px", marginLeft: "50px" }}>
              <NotificationsIcon />
            </IconButton>

            {/* Nombre y rol */}
            <Box sx={{ mr: 1, ml: 1, textAlign: "right" }}>
              <Typography
                variant="caption"
                component="div"
                sx={{ color: "black" }}
              >
                Andy Scott
              </Typography>
              <Typography variant="body2" component="div" color="textSecondary">
                Admin
              </Typography>
            </Box>

            {/* Avatar */}
            <Avatar
              alt="Andy Avatar"
              src="/path/to/avatar.jpg"
              sx={{ width: 32, height: 32 }}
            />
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

Layout.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default Layout;

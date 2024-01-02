import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { Outlet } from "react-router-dom";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import NotificationsIcon from "@mui/icons-material/Notifications";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import MicIcon from "@mui/icons-material/Mic";
import Sidebar from "../common/Sidebar";

const drawerWidth = 240;

function Layout(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", overflow: "auto" }}>
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
              display: { xs: "flex", sm: "flex" },
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            {/* Selector de idioma */}
            <LanguageSwitcher />

            {/* Campo de búsqueda */}
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
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

            <Box sx={{ display: "flex", alignItems: "center" }}>
              {/* Notificaciones */}
              <IconButton
                sx={{
                  marginX: { xs: "0px", sm: "10px" },
                  marginLeft: { xs: "0px", sm: "50px" },
                }}
              >
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
                <Typography
                  variant="body2"
                  component="div"
                  color="textSecondary"
                >
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
          {<Sidebar />}
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
          {<Sidebar />}
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

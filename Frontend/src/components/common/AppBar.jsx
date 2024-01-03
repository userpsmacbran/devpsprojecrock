/* eslint-disable react/prop-types */
import LanguageSwitcher from "../LanguageSwitcher";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import NotificationsIcon from "@mui/icons-material/Notifications";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import MicIcon from "@mui/icons-material/Mic";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";

function AppBarComponent({ drawerWidth, handleDrawerToggle }) {
  return (
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
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default AppBarComponent;

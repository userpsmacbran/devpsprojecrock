/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";

function SidebarItem({ item, t, handleDrawerToggle }) {
  return (
    <Link
      to={`/${item.id}`}
      key={item.id}
      onClick={item.subItems ? null : handleDrawerToggle}
    >
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
  );
}

export default SidebarItem;

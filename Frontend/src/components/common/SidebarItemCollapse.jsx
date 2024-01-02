/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";

function SidebarItemCollapse({ item, t }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
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
        onClick={handleClick}
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
          {open ? (
            <ExpandLess sx={{ color: "white" }} />
          ) : (
            <ExpandMore sx={{ color: "white" }} />
          )}
        </Box>
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List>
          {item.subItems.map((subItem, index) => (
            <Link to={`${item.id}/${subItem.id}`} key={index}>
              <ListItemButton
                sx={{
                  display: "flex",
                  flexDirection: "column",
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
                    {subItem.icon}
                  </ListItemIcon>
                  <ListItemText
                    sx={{ color: "white", ml: 0 }}
                    primary={t(subItem.translationKey)}
                  />
                </Box>
              </ListItemButton>
            </Link>
          ))}
        </List>
      </Collapse>
    </>
  );
}

export default SidebarItemCollapse;
/* eslint-disable react/prop-types */
import { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useTranslation } from "react-i18next";

function InputsBox({ setSearchTerm, setStateCompany }) {
  const [selectedState, setSelectedState] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const { t } = useTranslation();

  const handleSearchIconClick = () => {
    setSearchTerm(searchInput);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setSearchTerm(searchInput);
    }
  };
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    if (!value.trim()) {
      setSearchTerm("");
    }
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "40% 20% 20%",
        gap: "10px",
        alignItems: "center",
        marginBottom: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          backgroundColor: "#f0f0f0",
          borderRadius: "50px",
          alignItems: "center",
        }}
      >
        <IconButton
          sx={{ color: "gray", marginX: "3px" }}
          onClick={handleSearchIconClick}
        >
          <SearchIcon />
        </IconButton>
        <InputBase
          placeholder={t("search_company_placeholder")}
          inputProps={{ "aria-label": "search" }}
          sx={{
            ml: 1,
            borderRadius: "50px",
            padding: "8px",
            width: "100%",
          }}
          onKeyUp={handleKeyPress}
          onChange={handleInputChange}
          value={searchInput}
        />
      </Box>
      <Box>
        <Select
          value={"USA"}
          displayEmpty
          inputProps={{ "aria-label": "country" }}
          sx={{ ml: 1, width: "100%", borderRadius: "50px" }}
        >
          <MenuItem value="" disabled>
            País
          </MenuItem>
          <MenuItem value="USA">USA</MenuItem>
          <MenuItem value="Mexico">Mexico</MenuItem>
        </Select>
      </Box>
      <Box>
        <Select
          value={selectedState}
          onChange={(e) => {
            setSelectedState(e.target.value);
            setStateCompany(e.target.value);
          }}
          displayEmpty
          inputProps={{ "aria-label": "state" }}
          sx={{ ml: 1, width: "100%", borderRadius: "50px" }}
        >
          <MenuItem value="" disabled>
            Estado
          </MenuItem>
          <MenuItem value="1">Activo</MenuItem>
          <MenuItem value="2">Baneado</MenuItem>
          <MenuItem value="0">Desactivado</MenuItem>
        </Select>
      </Box>
    </Box>
  );
}

export default InputsBox;

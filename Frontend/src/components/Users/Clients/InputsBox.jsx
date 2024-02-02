/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useTranslation } from "react-i18next";
import api from "../../../api/api";

function InputsBox({ setSearchTerm, setStateCompany, setCountry }) {
  const [selectedState, setSelectedState] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const { t } = useTranslation();
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

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

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await api.get("/country");
        console.log("Countries fetched successfully!");
        console.log(response.data.data);
        setCountries(response.data.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

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
          value={selectedCountry}
          displayEmpty
          inputProps={{ "aria-label": "country" }}
          sx={{ ml: 1, width: "100%", borderRadius: "50px" }}
          onChange={(e) => {
            setSelectedCountry(e.target.value);
            console.log(e.target.value);
            setCountry(e.target.value);
          }}
        >
          <MenuItem value="" disabled>
            País
          </MenuItem>
          {countries.map((country) => (
            <MenuItem key={country.id} value={country.id}>
              {country.name}
            </MenuItem>
          ))}
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

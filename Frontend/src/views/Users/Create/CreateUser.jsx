/* eslint-disable react/prop-types */
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CreateCompanyForm from "../../../components/Users/Create/CreateCompanyForm";
import { useEffect } from "react";
import api from "../../../api/api";
import CreateClientForm from "../../../components/Users/Create/CreateClientForm";
import CreateModeradorForm from "../../../components/Users/Create/CreateModeradorForm";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [countries, setCountries] = React.useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/country");
        setCountries(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <AppBar position="" sx>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="inherit"
          sx={{
            backgroundColor: "#555CB3",
            fontWeight: "bold",
            color: "white",
          }}
          variant="fullWidth"
        >
          <Tab label="Company" {...a11yProps(0)} />
          <Tab label="Client" {...a11yProps(1)} />
          <Tab label="Moderador" {...a11yProps(2)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0} dir={theme.direction}>
        <CreateCompanyForm countries={countries} setCountries={setCountries} />
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <CreateClientForm countries={countries} setCountries={setCountries} />
      </TabPanel>
      <TabPanel value={value} index={2} dir={theme.direction}>
        <CreateModeradorForm
          countries={countries}
          setCountries={setCountries}
        />
      </TabPanel>
    </Box>
  );
}

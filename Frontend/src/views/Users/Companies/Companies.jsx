import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import api from "../../../api/api"; // Ajusta la ruta según la ubicación de tu archivo de API
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get("/user", {
          params: { type: 23, },
        });
        setCompanies(response.data.data.users);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleToggleChange = async (id, currentState) => {
    try {
      setLoading(true);
      const newState = currentState === 2 ? 1 : 2;

      // Realiza la petición al servidor para cambiar el estado
      await api.patch(`/user/change-state/${id}`, { state: newState });

      // Actualiza el estado local
      setCompanies((prevCompanies) =>
        prevCompanies.map((company) =>
          company.id === id ? { ...company, state_User: newState } : company
        )
      );
    } catch (error) {
      console.error("Error changing user state:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h2 className="font-bold text-[#555CB3] text-2xl mb-2">
        {t("users_companies_title")}
      </h2>{" "}
      <Box
        sx={{
          display: "flex",
          backgroundColor: "#f0f0f0",
          borderRadius: "10px",
          width: "50%",
          marginBottom: "10px",
        }}
      >
        <IconButton sx={{ color: "gray", marginX: "3px" }}>
          <SearchIcon />
        </IconButton>
        <InputBase
          placeholder="Buscar Company"
          inputProps={{ "aria-label": "search" }}
          sx={{
            ml: 1,
            borderRadius: "50px",
            padding: "8px",
            width: "100%",
          }}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead className="bg-gray-200">
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Correo</TableCell>
              <TableCell>Pais</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Registrado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.map((company) => (
              <TableRow key={company.id}>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.email}</TableCell>
                <TableCell>{company.country}</TableCell>
                <TableCell>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={company.state_User === 2}
                        color="primary"
                        onChange={() =>
                          handleToggleChange(company.id, company.state_User)
                        }
                        disabled={loading}
                      />
                    }
                    label={company.state_User === 2 ? "BANEADO" : "ACTIVO"}
                  />
                </TableCell>
                <TableCell>28-05-2002</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
};

export default Companies;

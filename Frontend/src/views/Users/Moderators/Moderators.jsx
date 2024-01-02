import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { useTranslation } from "react-i18next";

const clientsData = [
  {
    id: 1,
    name: "Cliente A",
    email: "clientA@example.com",
    country: "USA",
    state: 1,
    registrationDate: "2023-01-15",
  },
  {
    id: 2,
    name: "Cliente B",
    email: "clientB@example.com",
    country: "Canada",
    state: 0,
    registrationDate: "2022-08-20",
  },
  {
    id: 3,
    name: "Cliente C",
    email: "clientC@example.com",
    country: "UK",
    state: 1,
    registrationDate: "2022-11-05",
  },
  {
    id: 4,
    name: "Cliente D",
    email: "clientD@example.com",
    country: "Australia",
    state: 1,
    registrationDate: "2023-02-28",
  },
  {
    id: 5,
    name: "Cliente E",
    email: "clientE@example.com",
    country: "Germany",
    state: 0,
    registrationDate: "2022-05-10",
  },
  {
    id: 6,
    name: "Cliente F",
    email: "clientF@example.com",
    country: "France",
    state: 1,
    registrationDate: "2022-09-17",
  },
  {
    id: 7,
    name: "Cliente G",
    email: "clientG@example.com",
    country: "Brazil",
    state: 0,
    registrationDate: "2022-12-08",
  },
  {
    id: 8,
    name: "Cliente H",
    email: "clientH@example.com",
    country: "Japan",
    state: 1,
    registrationDate: "2023-03-12",
  },
  {
    id: 9,
    name: "Cliente I",
    email: "clientI@example.com",
    country: "South Korea",
    state: 1,
    registrationDate: "2022-06-25",
  },
  {
    id: 10,
    name: "Cliente J",
    email: "clientJ@example.com",
    country: "Mexico",
    state: 0,
    registrationDate: "2022-10-30",
  },
];

const Moderators = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { t } = useTranslation();

  const filteredClients = clientsData.filter((company) =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2 className="font-bold text-[#555CB3] text-2xl mb-2">
        {t("users_moderators_title")}
      </h2>

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
          placeholder="Buscar Moderadores"
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
              <TableCell>NAME</TableCell>
              <TableCell>CORREO</TableCell>
              <TableCell>PAIS</TableCell>
              <TableCell>STATE</TableCell>
              <TableCell>REGISTRO</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredClients.map((company) => (
              <TableRow key={company.id}>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.email}</TableCell>
                <TableCell>{company.country}</TableCell>
                <TableCell>
                  {company.state === 1 ? "ACTIVO" : "INACTIVO"}
                </TableCell>
                <TableCell>{company.registrationDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Moderators;

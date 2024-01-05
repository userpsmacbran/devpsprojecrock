import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import api from "../../../api/api";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import VerticalAlignCenterIcon from "@mui/icons-material/VerticalAlignCenter";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get("/user", {
          params: { type: 23 },
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

      await api.patch(`/user/change-state/${id}`, { state: newState });

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

  const openEditModal = (company) => {
    setSelectedCompany(company);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedCompany(null);
    setIsEditModalOpen(false);
  };

  const EditModalContent = () => (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 500,
        bgcolor: "white",
        boxShadow: 0,
        p: 4,
      }}
    >
      <Typography
        variant="h6"
        component="div"
        sx={{ color: "#555CB3", fontWeight: "bold" }}
      >
        Edit Company Profile
      </Typography>
      <Avatar
        alt={selectedCompany.name}
        src={selectedCompany.profilePicture}
        sx={{ width: 64, height: 64, my: 2, mx: "auto" }}
      />
      <TextField
        label="Name"
        defaultValue={selectedCompany.name}
        fullWidth
        margin="normal"
        size="small"
      />
      <TextField
        label="Email"
        defaultValue={selectedCompany.email}
        fullWidth
        margin="normal"
        size="small"
      />
      <TextField
        label="Phone"
        defaultValue={selectedCompany.phone}
        fullWidth
        margin="normal"
        size="small"
      />
      <TextField
        label="Address"
        defaultValue={selectedCompany.adress}
        fullWidth
        margin="normal"
        size="small"
      />

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="City"
            defaultValue={selectedCompany.city}
            fullWidth
            margin="normal"
            size="small"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="State"
            defaultValue={selectedCompany.state}
            fullWidth
            margin="normal"
            size="small"
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Postal code"
            defaultValue={selectedCompany.postalCode}
            fullWidth
            margin="normal"
            size="small"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Country"
            defaultValue={selectedCompany.country}
            fullWidth
            margin="normal"
            size="small"
          />
        </Grid>
      </Grid>

      <Box className="flex justify-center">
        <Button
          sx={{
            bgcolor: "#00BF63",
            color: "white",
            fontWeight: "bold",
            borderRadius: "50px",
            px: 4,
            mt: 2,
            "&:hover": {
              bgcolor: "#00BF63",
            },
          }}
        >
          SAVE
        </Button>
      </Box>
    </Box>
  );

  return (
    <section>
      <h2 className="font-bold text-[#555CB3] text-2xl mb-2">
        {t("users_companies_title")}
      </h2>
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
        <Box>
          <Select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
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
            onChange={(e) => setSelectedState(e.target.value)}
            displayEmpty
            inputProps={{ "aria-label": "state" }}
            sx={{ ml: 1, width: "100%", borderRadius: "50px" }}
          >
            <MenuItem value="" disabled>
              Estado
            </MenuItem>
            <MenuItem value="active">Activo</MenuItem>
            <MenuItem value="banned">Baneado</MenuItem>
          </Select>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead className="bg-gray-200">
            <TableRow>
              <TableCell>
                ID{" "}
                <VerticalAlignCenterIcon
                  sx={{ fontSize: 12, cursor: "pointer" }}
                  onClick={() => {
                    console.log("Ordenar");
                  }}
                />
              </TableCell>
              <TableCell>
                Nombre{" "}
                <VerticalAlignCenterIcon
                  sx={{ fontSize: 12, cursor: "pointer" }}
                  onClick={() => {
                    console.log("Ordenar");
                  }}
                />
              </TableCell>
              <TableCell>
                Correo{" "}
                <VerticalAlignCenterIcon
                  sx={{ fontSize: 12, cursor: "pointer" }}
                  onClick={() => {
                    console.log("Ordenar");
                  }}
                />
              </TableCell>
              <TableCell>
                Pais{" "}
                <VerticalAlignCenterIcon
                  sx={{ fontSize: 12, cursor: "pointer" }}
                  onClick={() => {
                    console.log("Ordenar");
                  }}
                />
              </TableCell>
              <TableCell>
                Estado{" "}
                <VerticalAlignCenterIcon
                  sx={{ fontSize: 12, cursor: "pointer" }}
                  onClick={() => {
                    console.log("Ordenar");
                  }}
                />
              </TableCell>
              <TableCell>
                Ultimo Login{" "}
                <VerticalAlignCenterIcon
                  sx={{ fontSize: 12, cursor: "pointer" }}
                  onClick={() => {
                    console.log("Ordenar");
                  }}
                />
              </TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.map((company) => (
              <TableRow key={company.id}>
                <TableCell>{company.id}</TableCell>
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
                <TableCell>
                  <IconButton onClick={() => openEditModal(company)}>
                    <EditIcon className="text-blue-500" />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      // handleDeleteCompany(company.id);
                    }}
                  >
                    <DeleteIcon className="text-red-500" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={isEditModalOpen}
        onClose={() => closeEditModal()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <EditModalContent />
      </Modal>
    </section>
  );
};

export default Companies;

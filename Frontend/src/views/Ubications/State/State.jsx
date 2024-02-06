import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Modal,
  Box,
} from "@mui/material";
import api from "../../../api/api";

function State() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [states, setStates] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [newState, setNewState] = useState({
    name: "",
  });
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingState, setEditingState] = useState(null);
  const [toggleModalOpen, setToggleModalOpen] = useState(false);
  const [togglingState, setTogglingState] = useState(null);

  // Agregado para búsqueda
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await api.get("/country/selects");
        setCountries(response.data.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        setLoading(true);
        const response = await api.get(
          `/state/${selectedCountry}?take=${rowsPerPage}&skip=${page * rowsPerPage}`,
          {
            // Agregado para búsqueda
            params: { name: searchTerm },
          }
        );
        setStates(response.data.data);
        setTotalItems(response.data.total);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };

    if (selectedCountry) {
      fetchStates();
    }
  }, [selectedCountry, page, rowsPerPage,]); 

  const refreshStates = async () => {
    try {
      setLoading(true);
      const response = await api.get(
        `/state/${selectedCountry}?take=${rowsPerPage}&skip=${page * rowsPerPage}`,
        {
          // Agregado para búsqueda
          params: { name: searchTerm },
        }
      );
      setStates(response.data.data);
      setTotalItems(response.data.total);
      setLoading(false);
    } catch (error) {
      console.error("Error refreshing states:", error);
    }
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleNewStateChange = (event) => {
    const { name, value } = event.target;
    setNewState((prevNewState) => ({
      ...prevNewState,
      [name]: value,
    }));
  };

  const handleEditClick = (state) => {
    setEditingState(state);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditingState(null);
    setEditModalOpen(false);
  };

  const handleToggleClick = (state) => {
    setTogglingState(state);
    setToggleModalOpen(true);
  };

  const handleToggleModalClose = () => {
    setTogglingState(null);
    setToggleModalOpen(false);
  };

  const handleCreateState = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const response = await api.post("/state", {
        name: newState.name,
        countryId: selectedCountry,
      });
      setStates((prevStates) => [response.data.data, ...prevStates]);
      setNewState({ name: "" });
      await refreshStates();
      setLoading(false);
    } catch (error) {
      console.error("Error creating state:", error);
    }
  };

  const handleEditState = async () => {
    try {
      setLoading(true);
      await api.patch(`/state/${editingState.id}`, {
        name: editingState.name,
      });
      await refreshStates();
      setLoading(false);
      handleEditModalClose();
    } catch (error) {
      console.error("Error editing state:", error);
    }
  };

  const handleToggleState = async () => {
    try {
      setLoading(true);
      await api.put(`/state/${togglingState.id}`);
      await refreshStates();
      setLoading(false);
      handleToggleModalClose();
    } catch (error) {
      console.error("Error toggling state:", error);
    }
  };

  // Agregado para búsqueda
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Agregado para búsqueda
  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      refreshStates();
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">States:</h2>

      <FormControl
        variant="outlined"
        fullWidth
        sx={{
          marginBottom: 4,
        }}
      >
        <InputLabel id="country-select-label">Select Country</InputLabel>
        <Select
          labelId="country-select-label"
          id="country-select"
          value={selectedCountry}
          onChange={handleCountryChange}
          label="Select Country"
          sx={{ backgroundColor: "#fff" }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {countries.map((country) => (
            <MenuItem key={country.id} value={country.id}>
              {country.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedCountry && (
        <div className="flex flex-wrap">
          <TextField
            label="Search by Name"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
            sx={{
              marginBottom: 2,
            }}
          />
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {states.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3}>No states found.</TableCell>
                  </TableRow>
                )}
                {states.map((state) => (
                  <TableRow
                    key={state.id}
                    className={`${state.active === 1 ? "" : "bg-red-200"}`}
                  >
                    <TableCell>{state.name}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleEditClick(state)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleToggleClick(state)}
                      >
                        {state.active === 1 ? "Desactivar" : "Activar"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={totalItems}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 20]}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      )}

      {/* Modal de Edición */}
      <Modal
        open={editModalOpen}
        onClose={handleEditModalClose}
        aria-labelledby="edit-modal-title"
        aria-describedby="edit-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2 id="edit-modal-title" className="text-2xl mb-2">
            Edit State
          </h2>
          <TextField
            label="State Name"
            variant="outlined"
            fullWidth
            name="name"
            value={editingState?.name || ""}
            onChange={(e) =>
              setEditingState({ ...editingState, name: e.target.value })
            }
            sx={{
              marginBottom: 2,
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleEditState}
            className="mt-2"
          >
            Save Changes
          </Button>
        </Box>
      </Modal>

      {/* Modal de Activar/Desactivar */}
      <Modal
        open={toggleModalOpen}
        onClose={handleToggleModalClose}
        aria-labelledby="toggle-modal-title"
        aria-describedby="toggle-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2 id="toggle-modal-title">
            {togglingState?.active === 1 ? "Desactivar" : "Activar"} Estado
          </h2>
          <p id="toggle-modal-description">
            ¿Estás seguro de que deseas{" "}
            {togglingState?.active === 1 ? "desactivar" : "activar"} el estado{" "}
            {togglingState?.name}?
          </p>
          <Button
            variant="contained"
            color="primary"
            onClick={handleToggleState}
          >
            Confirmar
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleToggleModalClose}
          >
            Cancelar
          </Button>
        </Box>
      </Modal>

      {selectedCountry && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Create State:</h2>
          <form onSubmit={handleCreateState}>
            <div className="mb-4">
              <TextField
                label="State Name"
                variant="outlined"
                fullWidth
                name="name"
                value={newState.name}
                onChange={handleNewStateChange}
              />
            </div>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={!newState.name}
            >
              Create State
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}

export default State;

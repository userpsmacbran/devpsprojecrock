/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import api from "../../../api/api";
import MenuItem from "@mui/material/MenuItem";
import { useTranslation } from "react-i18next";

function ModalEdit({ selectedCompany, updateLocalCompany, onClose }) {
  const { t } = useTranslation();

  const [editedCompany, setEditedCompany] = useState({
    name: selectedCompany.name,
    email: selectedCompany.email,
    phone: selectedCompany.phone,
    address: selectedCompany.address,
    city: selectedCompany.city.id,
    state: selectedCompany.state.id,
    postalCode: selectedCompany.postalCode,
    country: selectedCompany.country.id,
    countryName: selectedCompany.country.name,
    ruc: selectedCompany.ruc,
  });

  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await api.get("/country");
        setCountries(response.data.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    if (isEditingLocation) {
      fetchCountries();
    }
  }, [isEditingLocation]);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await api.get(`/state/${editedCompany.country}`);
        setStates(response.data.data);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };

    // Se ejecuta solo si se está editando la ubicación y hay un país seleccionado
    if (isEditingLocation && editedCompany.country) {
      fetchStates();
    }
  }, [isEditingLocation, editedCompany.country]);

  useEffect(() => {
    const fetchCities = async () => {
      setCities([]);

      // Se ejecuta solo si se está editando la ubicación y hay un estado seleccionado
      if (isEditingLocation && editedCompany.state) {
        try {
          const response = await api.get(`/city/${editedCompany.state}`);
          setCities(response.data.data);
        } catch (error) {
          console.error("Error fetching cities:", error);
        }
      }
    };

    if (isEditingLocation && editedCompany.state) {
      fetchCities();
    }
  }, [isEditingLocation, editedCompany.state]);

  const handleEditLocation = () => {
    // Al hacer clic en "Editar Ubicación", cambia el estado para mostrar los selectores
    setIsEditingLocation(true);
  };

  const handleFieldChange = (field, value) => {
    setError(null);
    setEditedCompany((prevEditedCompany) => ({
      ...prevEditedCompany,
      [field]: value,
    }));

    // Si el campo cambiado es el país, restablecer estado y ciudad
    if (field === "country") {
      setEditedCompany((prevEditedCompany) => ({
        ...prevEditedCompany,
        state: null,
        city: null,
      }));
    }

    // Si el campo cambiado es el estado, restablecer ciudad
    if (field === "state") {
      setEditedCompany((prevEditedCompany) => ({
        ...prevEditedCompany,
        city: null,
      }));
    }
  };

  const handleSaveChanges = async () => {
    if (
      !editedCompany.name ||
      !editedCompany.email ||
      !editedCompany.phone ||
      !editedCompany.address ||
      !editedCompany.country ||
      !editedCompany.state ||
      !editedCompany.postalCode ||
      !editedCompany.city
    ) {
      setError("Por favor, complete todos los campos.");
      return;
    }
    try {
      await api.patch(`/user/${selectedCompany.id}`, editedCompany);
      const updatedCompany = {
        ...editedCompany,
        country: {
          name:
            countries.find((c) => c.id === editedCompany.country)?.name ||
            editedCompany.countryName,
        },
      };
      updateLocalCompany(selectedCompany.id, updatedCompany);

      onClose();
    } catch (error) {
      console.error("Error saving changes:", error);

      if (error.response.data.message === "EMAIL_ALREADY_EXISTS") {
        setError(`Correo electrónico ya registrado.`);
      }
    }
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 600,
        bgcolor: "white",
        boxShadow: 0,
        p: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{ color: "#555CB3", fontWeight: "bold" }}
        >
          {t("edit_moderator_profile")}
        </Typography>
        <Avatar
          alt={selectedCompany.name}
          src={selectedCompany.profilePicture}
          sx={{ width: 64, height: 64, my: 2, mx: "auto" }}
        />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Name"
            value={editedCompany.name}
            fullWidth
            size="small"
            onChange={(e) => handleFieldChange("name", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Email"
            value={editedCompany.email}
            fullWidth
            size="small"
            onChange={(e) => handleFieldChange("email", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Phone"
            value={editedCompany.phone}
            fullWidth
            size="small"
            onChange={(e) => handleFieldChange("phone", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Address"
            value={editedCompany.address}
            fullWidth
            size="small"
            onChange={(e) => handleFieldChange("address", e.target.value)}
          />
        </Grid>

        {isEditingLocation ? (
          <>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Country"
                value={editedCompany.country}
                fullWidth
                size="small"
                onChange={(e) => handleFieldChange("country", e.target.value)}
              >
                {countries.map((country) => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="State"
                value={editedCompany.state}
                fullWidth
                size="small"
                onChange={(e) => handleFieldChange("state", e.target.value)}
              >
                {states.map((state) => (
                  <MenuItem key={state.id} value={state.id}>
                    {state.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Postal code"
                value={editedCompany.postalCode}
                fullWidth
                size="small"
                onChange={(e) =>
                  handleFieldChange("postalCode", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="City"
                value={editedCompany.city}
                fullWidth
                size="small"
                onChange={(e) => handleFieldChange("city", e.target.value)}
              >
                {cities.map((city) => (
                  <MenuItem key={city.id} value={city.id}>
                    {city.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </>
        ) : (
          <Grid item xs={12}>
            <div className="border border-gray-300 p-2">
              <TextField
                label="País"
                value={selectedCompany.country.name}
                fullWidth
                sx={{
                  mb: 2,
                }}
                size="small"
                disabled // Esto deshabilita la edición
              />
              <TextField
                label="Estado"
                value={selectedCompany.state.name}
                fullWidth
                sx={{
                  mb: 2,
                }}
                size="small"
                disabled // Esto deshabilita la edición
              />
              <TextField
                label="Ciudad"
                value={selectedCompany.city.name}
                fullWidth
                sx={{
                  mb: 2,
                }}
                size="small"
                disabled // Esto deshabilita la edición
              />
              <Button onClick={handleEditLocation}>Editar Localidad</Button>
            </div>
          </Grid>
        )}
      </Grid>

      <Button
        onClick={handleSaveChanges}
        sx={{
          backgroundColor: "#555CB3",
          color: "white",
          "&:hover": {
            backgroundColor: "#555CB3",
            color: "white",
          },
          mt: 2,
          display: "block",
          mx: "auto",
        }}
        variant="contained"
      >
        {t("edit_save_changes")}
      </Button>
      {error && (
        <Typography
          variant="body2"
          sx={{
            color: "red",
            textAlign: "center",
            mt: 2,
          }}
        >
          {error}
        </Typography>
      )}
    </Box>
  );
}

export default ModalEdit;

/* eslint-disable react/prop-types */
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import api from "../../../api/api"; 

function ModalEdit({ selectedCompany, updateLocalCompany, onClose }) {
  const [editedCompany, setEditedCompany] = useState({
    name: selectedCompany.name,
    email: selectedCompany.email,
    phone: selectedCompany.phone,
    address: selectedCompany.address,
    city: selectedCompany.city,
    state: selectedCompany.state,
    postalCode: selectedCompany.postalCode,
    country: selectedCompany.country,
  });

  const handleFieldChange = (field, value) => {
    setEditedCompany((prevEditedCompany) => ({
      ...prevEditedCompany,
      [field]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      // Realiza la petición al servidor para guardar los cambios
      await api.patch(`/user/${selectedCompany.id}`, editedCompany);

      // Actualiza el estado local con los cambios
      updateLocalCompany(selectedCompany.id, editedCompany);

      // Cierra el modal de edición
      onClose();
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  return (
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
        value={editedCompany.name}
        fullWidth
        margin="normal"
        size="small"
        onChange={(e) => handleFieldChange("name", e.target.value)}
      />
      <TextField
        label="Email"
        value={editedCompany.email}
        fullWidth
        margin="normal"
        size="small"
        onChange={(e) => handleFieldChange("email", e.target.value)}
      />
      <TextField
        label="Phone"
        value={editedCompany.phone}
        fullWidth
        margin="normal"
        size="small"
        onChange={(e) => handleFieldChange("phone", e.target.value)}
      />
      <TextField
        label="Address"
        value={editedCompany.address}
        fullWidth
        margin="normal"
        size="small"
        onChange={(e) => handleFieldChange("address", e.target.value)}
      />

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="City"
            value={editedCompany.city}
            fullWidth
            margin="normal"
            size="small"
            onChange={(e) => handleFieldChange("city", e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="State"
            value={editedCompany.state}
            fullWidth
            margin="normal"
            size="small"
            onChange={(e) => handleFieldChange("state", e.target.value)}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Postal code"
            value={editedCompany.postalCode}
            fullWidth
            margin="normal"
            size="small"
            onChange={(e) => handleFieldChange("postalCode", e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Country"
            value={editedCompany.country}
            fullWidth
            margin="normal"
            size="small"
            onChange={(e) => handleFieldChange("country", e.target.value)}
          />
        </Grid>
      </Grid>

      <Box className="flex justify-center">
        <Button
          onClick={handleSaveChanges}
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
}

export default ModalEdit;

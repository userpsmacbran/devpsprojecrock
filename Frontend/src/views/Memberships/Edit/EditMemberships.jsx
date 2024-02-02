import { useState, useEffect } from "react";
import {
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import api from "../../../api/api";
import getBenefits from "../../../utils/getBenefits";

function EditMemberships() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [memberships, setMemberships] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMembership, setSelectedMembership] = useState(null);

  const handleEditClick = (membership) => {
    setSelectedMembership(membership);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedMembership(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await api.get("/country");
        setCountries(response.data.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleFilterClick = async () => {
    try {
      const response = await api.get(`/membership/${selectedCountry}`);
      setMemberships(response.data);
    } catch (error) {
      console.error("Error fetching memberships:", error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const data = {
        name: selectedMembership.name,
        newAmount: selectedMembership.amount,
        currency: selectedMembership.currency,
        priceId: selectedMembership.price,
        mebershipId: selectedMembership.id,
      };
      const response = await api.patch(`/membership/update`, data);
      console.log(response);
      console.log(data);
    } catch (error) {
      console.error("Error updating membership:", error);
    }
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="country-label">Select Country</InputLabel>
        <Select
          labelId="country-label"
          id="country-select"
          label="Select Country"
          value={selectedCountry}
          onChange={handleCountryChange}
          style={{ minWidth: "200px" }}
        >
          <MenuItem value="" disabled>
            Selecciona un país
          </MenuItem>
          {countries.map((country) => (
            <MenuItem key={country.id} value={country.id}>
              {country.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" onClick={handleFilterClick}>
        Filtrar
      </Button>

      {/* Muestra las membresías */}
      <div className="flex">
        {memberships.map((membership) => (
          <div key={membership.id} className="border border-black p-2 m-2" style={{ marginTop: "20px" }}>
            <p>ID: {membership.id}</p>
            <p>Nombre: {membership.name}</p>
            <p>
              Precio: {membership.amount} {membership.currency}
            </p>
            <p>
              Tipo: <b>{getBenefits(membership).type}</b>
            </p>
            <Button
              variant="contained"
              onClick={() => handleEditClick(membership)}
            >
              Editar esta membresía
            </Button>
          </div>
        ))}
      </div>
      {memberships.length === 0 && (
        <p className="text-2xl">No hay membresías disponibles</p>
      )}

      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>Editar membresía</DialogTitle>
        <DialogContent>
          {console.log(selectedMembership)}
          {selectedMembership && (
            <>
              <TextField
                label="Nombre"
                value={selectedMembership.name}
                onChange={(e) =>
                  setSelectedMembership({
                    ...selectedMembership,
                    name: e.target.value,
                  })
                }
                fullWidth
              />
              <TextField
                label="Precio"
                value={selectedMembership.amount}
                onChange={(e) =>
                  setSelectedMembership({
                    ...selectedMembership,
                    amount: e.target.value,
                  })
                }
                fullWidth
              />
              {/* Agrega más campos según tus necesidades */}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsModalOpen(false)}>Cancelar</Button>
          <Button
            onClick={() => {
              handleSaveChanges();
            }}
          >
            Guardar cambios
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditMemberships;

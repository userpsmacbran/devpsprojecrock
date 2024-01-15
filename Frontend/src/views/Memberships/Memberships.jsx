import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import api from "../../api/api";
function Memberships() {
  const [countries, setCountries] = useState([]);
  const [formData, setFormData] = useState({
    countryId: "",
    name: "",
    amount: "",
    currency: "usd",
    type: 10,
  });

  useEffect(() => {
    try {
      const fetchCountries = async () => {
        const response = await api.get("/country");
        const countries = await response.data;
        setCountries(countries.data);
      };
      fetchCountries();
    } catch (error) {
      console.error("Error al obtener países:", error);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Si el campo seleccionado es "countryId", actualiza "name" con el formato deseado
    if (name === "countryId") {
      const selectedCountry = countries.find((country) => country.id === value);
      const formattedName = `${selectedCountry.isoCode} - `;
      setFormData({ ...formData, [name]: value, name: formattedName });
    } else {
      // Para otros campos, actualiza normalmente
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    const amountInCents = formData.amount * 100;
    e.preventDefault();

    const subscriptionData = {
      ...formData,
      amount: amountInCents,
    };
    console.log("Form data submitted:", subscriptionData);

    try {
      const response = await api.post("/membership/create", subscriptionData);
      const membership = await response.data;
      console.log("Membership created:", membership);
    } catch (error) {
      console.error("Error al crear membresía:", error);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-semibold">Crear Membresía</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormControl fullWidth>
          <InputLabel id="countryId-label">Country</InputLabel>
          <Select
            labelId="countryId-label"
            id="countryId"
            name="countryId"
            value={formData.countryId}
            onChange={handleChange}
          >
            {countries.map((country) => (
              <MenuItem key={country.id} value={country.id}>
                {country.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Nombre"
          id="name"
          name="name"
          fullWidth
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          label="Amount"
          id="amount"
          name="amount"
          fullWidth
          type="number"
          value={formData.amount}
          onChange={handleChange}
        />
        <FormControl fullWidth>
          <InputLabel id="currency-label">Currency</InputLabel>
          <Select
            labelId="currency-label"
            id="currency"
            name="currency"
            value={formData.currency}
            onChange={handleChange}
          >
            <MenuItem value="usd">USD</MenuItem>
            {/* Agregar otras opciones de moneda según sea necesario */}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="type-label">Tipo de Membresía</InputLabel>
          <Select
            labelId="type-label"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <MenuItem value={10}>NORMAL</MenuItem>
            <MenuItem value={20}>VIP</MenuItem>
            <MenuItem value={30}>PLATINO</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Crear Membresía
        </Button>
      </form>
    </div>
  );
}

export default Memberships;

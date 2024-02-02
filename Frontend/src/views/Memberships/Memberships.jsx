import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import api from "../../api/api";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

function Memberships() {
  const [countries, setCountries] = useState([]);
  const [formData, setFormData] = useState({
    countryId: "",
    name: "",
    amount: "",
    currency: "",
    type: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
    setError("");
    setSuccess("");

    if (name === "countryId") {
      const selectedCountry = countries.find((country) => country.id === value);
      const formattedName = `${selectedCountry.isoCode} - `;
      setFormData({ ...formData, [name]: value, name: formattedName });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    if (
      !formData.countryId ||
      !formData.name ||
      !formData.amount ||
      !formData.currency ||
      !formData.type
    ) {
      setError("* - Todos los campos son obligatorios");
      return;
    }

    const amountInCents = formData.amount * 100;
    const subscriptionData = {
      ...formData,
      amount: amountInCents,
    };

    try {
      const response = await api.post("/membership/create", subscriptionData);
      const membership = await response.data;
      setFormData({
        countryId: null,
        name: "",
        amount: "",
        currency: null,
        type: null,
      });
      setSuccess("Membresía creada correctamente");
    } catch (error) {
      console.error("Error al crear membresía:", error);
      setError(`* -${error.response.data.message}`);
    }
  };

  const getBenefits = () => {
    switch (formData.type) {
      case 10:
        return {
          sales: "1",
          skins: "1",
          customModePlay: false,
        };
      case 20:
        return {
          sales: "3",
          skins: "3",
          customModePlay: false,
        };
      case 30:
        return {
          sales: "5",
          skins: "5",
          customModePlay: true,
        };
      default:
        return "";
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center space-x-2">
        <h2 className="text-2xl font-semibold">Crear Membresía</h2>
        <p className="text-red-500">{error}</p>
        <p className="text-green-600 font-bold">{success}</p>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card
            className="h-full"
            sx={{ backgroundColor: "#E5E5E5", color: "black" }}
          >
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <FormControl fullWidth>
                  <InputLabel id="countryId-label">Country</InputLabel>
                  <Select
                    labelId="countryId-label"
                    id="countryId"
                    name="countryId"
                    label="Country"
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
                <FormControl fullWidth>
                  <InputLabel id="type-label">Tipo de Membresía</InputLabel>
                  <Select
                    labelId="type-label"
                    id="type"
                    name="type"
                    label="Tipo de Membresía"
                    value={formData.type}
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>BASICO</MenuItem>
                    <MenuItem value={20}>PLUS</MenuItem>
                    <MenuItem value={30}>PREMIUM</MenuItem>
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
                  inputProps={{
                    max: 200, // Establecer el monto máximo
                    maxLength: 3, // Establecer la longitud máxima de dígitos
                  }}
                />
                <FormControl fullWidth>
                  <InputLabel id="currency-label">Currency</InputLabel>
                  <Select
                    labelId="currency-label"
                    id="currency"
                    name="currency"
                    label="Currency"
                    value={formData.currency}
                    onChange={handleChange}
                  >
                    <MenuItem value="usd">USD</MenuItem>
                    {/* Agregar otras opciones de moneda según sea necesario */}
                  </Select>
                </FormControl>

                <Button type="submit" variant="contained" fullWidth>
                  Crear Membresía
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card
            sx={{ backgroundColor: "#F66E0C", color: "white" }}
            className="h-full"
          >
            <CardContent className=" mx-12">
              <div className="text-4xl flex items-center font-bold space-x-3">
                <p>
                  {formData.type === 10
                    ? "BASICO"
                    : formData.type === 20
                    ? "PLUS"
                    : "PREMIUM"}
                </p>
                <EmojiEventsIcon fontSize="large" sx={{ color: "yellow" }} />{" "}
              </div>
              <p className="text-center text-sm my-2 font-mono">
                {formData.name
                  ? formData.name
                  : "PAIS - Nombre de la Membresia"}
              </p>
              <Typography variant="h2">
                {formData.currency === "usd" ? "$" : "$"}
                {formData.amount ? formData.amount : 0}
              </Typography>
              <Typography variant="h5">por usuario/mes facturado</Typography>

              <div className="mt-6 space-y-2 flex flex-col">
                <Typography variant="h6" className="mb-4">
                  <CheckIcon sx={{ color: "green", marginRight: 2 }} />
                  {getBenefits().sales}{" "}
                  {getBenefits().sales === "1" ? "Cuenta" : "Cuentas"} para
                  ventas
                </Typography>
                <Typography variant="h6" className="mb-4">
                  <CheckIcon sx={{ color: "green", marginRight: 2 }} />
                  {getBenefits().skins} Skins disponibles
                </Typography>
                <Typography variant="h6" className="mb-2">
                  {getBenefits().customModePlay ? (
                    <CheckIcon sx={{ color: "green", marginRight: 2 }} />
                  ) : (
                    <ClearIcon sx={{ color: "red", marginRight: 2 }} />
                  )}
                  Personalizar el valor de los Créditos
                </Typography>
              </div>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "white",
                  color: "black",
                  marginTop: 4,
                  borderRadius: 50,
                  "&:hover": {
                    backgroundColor: "white",
                    color: "black",
                  },
                }}
                fullWidth
              >
                Obtener
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default Memberships;

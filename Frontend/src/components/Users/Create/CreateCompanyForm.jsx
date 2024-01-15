import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import api from "../../../api/api";

const CreateCompanyForm = () => {
  const [userObject, setUserObject] = useState({
    name: "",
    country: "",
    city: "",
    state: "",
    address: "",
    codePhone: "",
    phone: "",
    ruc: "",
    postalCode: "",
    password: "",
    email: "",
    logo: "",
    birthDate: "",
    type: 23,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserObject((prevUserObject) => ({
      ...prevUserObject,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Realizar la solicitud de registro
      const response = await api.post("/auth/register", userObject);
      // Mostrar mensaje de éxito
      setMessage({ text: "Usuario creado con éxito", type: "success" });
      // Limpiar el formulario
      setUserObject({
        name: "",
        country: "",
        city: "",
        state: "",
        address: "",
        codePhone: "",
        phone: "",
        ruc: "",
        postalCode: "",
        password: "",
        email: "",
        logo: "",
        birthDate: "",
        type: 23,
      });
    } catch (error) {
      // Mostrar mensaje de error
      setMessage({ text: "Error al registrar usuario", type: "error" });
      // Manejar errores, por ejemplo, mostrar un mensaje de error
      console.error("Error al registrar usuario:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="mx-auto p-6 bg-white shadow-md rounded-md"
      onSubmit={handleSubmit}
    >
      <h2 className="text-center text-[#555CB3] text-2xl font-bold mb-4">
        Create Company
      </h2>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            size="small"
            name="name"
            value={userObject.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Country"
            variant="outlined"
            fullWidth
            margin="normal"
            size="small"
            name="country"
            value={userObject.country}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="City"
            variant="outlined"
            fullWidth
            margin="normal"
            size="small"
            name="city"
            value={userObject.city}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="State"
            variant="outlined"
            fullWidth
            margin="normal"
            size="small"
            name="state"
            value={userObject.state}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            margin="normal"
            size="small"
            name="address"
            value={userObject.address}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Code Phone"
            variant="outlined"
            fullWidth
            margin="normal"
            size="small"
            name="codePhone"
            value={userObject.codePhone}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Phone"
            variant="outlined"
            fullWidth
            margin="normal"
            size="small"
            name="phone"
            value={userObject.phone}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="RUC"
            variant="outlined"
            fullWidth
            margin="normal"
            size="small"
            name="ruc"
            value={userObject.ruc}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Postal Code"
            variant="outlined"
            fullWidth
            margin="normal"
            size="small"
            name="postalCode"
            value={userObject.postalCode}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            size="small"
            name="password"
            value={userObject.password}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            size="small"
            name="email"
            value={userObject.email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Logo"
            variant="outlined"
            fullWidth
            margin="normal"
            size="small"
            name="logo"
            value={userObject.logo}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Birth Date"
            type="date"
            variant="outlined"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            size="small"
            name="birthDate"
            value={userObject.birthDate}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      {message.text && (
        <div
          className={`text-${
            message.type === "success" ? "green-500" : "red-500"
          } text-center mt-4`}
        >
          {message.text}
        </div>
      )}
      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={loading}
      >
        {loading ? "Creating..." : "Create"}
      </Button>
    </form>
  );
};

export default CreateCompanyForm;

import React, { useEffect, useState } from "react";
import api from "../../../api/api";

function City() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [newCity, setNewCity] = useState({
    name: "",
    stateId: null,
  });
  const [selectedCountry, setSelectedCountry] = useState(null);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const fetchCities = async (stateId) => {
    try {
      const response = await api.get(`/city/${stateId}`);
      setCities(response.data.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
      setError("Error fetching cities");
    }
  };

  const fetchStates = async (countryId) => {
    try {
      const response = await api.get(`/state/${countryId}`);
      setStates(response.data.data);
    } catch (error) {
      console.error("Error fetching states:", error);
      setError("Error fetching states");
    }
  };

  const fetchCountries = async () => {
    try {
      const response = await api.get("/country");
      setCountries(response.data.data);
    } catch (error) {
      console.error("Error fetching countries:", error);
      setError("Error fetching countries");
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      fetchStates(selectedCountry);
    }
  }, [selectedCountry]);

  const handleChange = async (e) => {
    const { name, value } = e.target;

    if (name === "stateId" || name === "countryId") {
      setNewCity((prevCity) => ({
        ...prevCity,
        [name]: value,
      }));

      if (name === "stateId") {
        fetchCities(value);
      } else if (name === "countryId") {
        setNewCity((prevCity) => ({
          ...prevCity,
          stateId: null,
        }));
        setSelectedCountry(value);
        // Limpiar los estados cuando se cambia el país
        setStates([]);
        // Actualizar los estados basados en el nuevo país seleccionado
        fetchStates(value);
      }
    } else if (name === "name") {
      setNewCity((prevCity) => ({
        ...prevCity,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const newCityToSend = {
        name: newCity.name,
        stateId: parseInt(newCity.stateId),
      };

      const response = await api.post("/city", newCityToSend);
      setCities((prevCities) => [...prevCities, response.data.data]);
      setNewCity({ name: "", stateId: null });
      setSuccess("City created successfully");
      setLoading(false);
    } catch (error) {
      console.error("Error creating city:", error);
      setError("Error creating city");
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Cities:</h2>
      <div className="flex flex-wrap">
        {cities.map((city) => (
          <div key={city.id} className="flex-shrink-0 mr-4 mb-4">
            <div className="bg-green-100 rounded shadow p-4">
              <p className="text-gray-800">{city.name}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Create City:</h2>
        <div className="max-w-md">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Name:
              </label>
              <input
                type="text"
                name="name"
                value={newCity.name}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Country:
              </label>
              <select
                name="countryId"
                value={selectedCountry}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full"
              >
                <option value={null}>Select Country</option>
                {countries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                State:
              </label>
              <select
                name="stateId"
                value={newCity.stateId}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full"
              >
                <option value={null}>Select State</option>
                {states.map((state) => (
                  <option key={state.id} value={state.id}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              disabled={!newCity.stateId || !selectedCountry}
            >
              Create
            </button>
          </form>
          {loading && <p>Creating city...</p>}
          {error && <p>{error}</p>}
          {success && <p>{success}</p>}
        </div>
      </div>
    </div>
  );
}

export default City;

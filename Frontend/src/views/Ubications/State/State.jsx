import { useEffect, useState } from "react";
import api from "../../../api/api";

function State() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [newState, setNewState] = useState({
    name: "",
    countryId: null,
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await api.get("/country");
      setCountries(response.data.data);
    };

    fetchCountries();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCountryChange = async (countryId) => {
    try {
      setLoading(true);

      // Obtener estados asociados al país seleccionado
      const response = await api.get(`/state/${countryId}`);
      setStates(response.data.data);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching states:", error);
      setError("Error fetching states");
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const newStateToSend = {
        name: newState.name,
        countryId: parseInt(newState.countryId),
      };

      const response = await api.post("/state", newStateToSend);
      setStates((prevStates) => [...prevStates, response.data.data]);
      setNewState({ name: "", countryId: null });
      setSuccess("State created successfully");
      setLoading(false);
    } catch (error) {
      console.error("Error creating state:", error);
      setError("Error creating state");
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">States:</h2>
      <div className="flex flex-wrap">
        {states.map((state) => (
          <div key={state.id} className="flex-shrink-0 mr-4 mb-4">
            <div className="bg-blue-100 rounded shadow p-4">
              <p className="text-gray-800">{state.name}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Create State:</h2>
        <div className="max-w-md">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Name:
              </label>
              <input
                type="text"
                name="name"
                value={newState.name}
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
                value={newState.countryId}
                onChange={(e) => {
                  handleChange(e);
                  handleCountryChange(e.target.value);
                }}
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
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              disabled={!newState.countryId}
            >
              Create
            </button>
          </form>
          {loading && <p>Loading states...</p>}
          {error && <p>{error}</p>}
          {success && <p>{success}</p>}
        </div>
      </div>
    </div>
  );
}

export default State;

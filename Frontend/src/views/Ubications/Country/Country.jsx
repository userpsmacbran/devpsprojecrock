import { useEffect, useState } from "react";
import api from "../../../api/api";

function Country() {
  const [countries, setCountries] = useState([]);
  const [newCountry, setNewCountry] = useState({
    isoCode: "",
    phoneCode: "",
    name: "",
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
    setNewCountry((prevCountry) => ({
      ...prevCountry,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await api.post("/country", newCountry);
      setCountries((prevCountries) => [...prevCountries, response.data.data]);
      setNewCountry({ isoCode: "", phoneCode: "", name: "" });
      setSuccess("Country created successfully");
      setLoading(false);
    } catch (error) {
      console.error("Error al crear el país:", error);
      setError("Error creating country");
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Countries:</h2>
      <div className="flex flex-wrap">
        {countries.map((country) => (
          <div key={country.id} className="flex-shrink-0 mr-4 mb-4">
            <div className="bg-red-100 rounded shadow p-4">
              <p className="text-gray-800 font-bold tracking-wider">{country.isoCode}</p>
              <p className="text-gray-600">{country.name}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Crear Country:</h2>
        <div className="max-w-md">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                ISO Code:
              </label>
              <input
                type="text"
                name="isoCode"
                value={newCountry.isoCode}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Phone Code:
              </label>
              <input
                type="text"
                name="phoneCode"
                value={newCountry.phoneCode}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Name:
              </label>
              <input
                type="text"
                name="name"
                value={newCountry.name}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Crear
            </button>
          </form>
          {loading && <p>Creando país...</p>}
          {error && <p>{error}</p>}
          {success && <p>{success}</p>}
        </div>
      </div>
    </div>
  );
}

export default Country;

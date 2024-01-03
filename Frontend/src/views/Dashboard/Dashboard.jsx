import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import { useTranslation } from "react-i18next";
import Cards from "../../components/Dashboard/Cards";
import Graphics from "../../components/Dashboard/Graphics";
import LastOrders from "../../components/Dashboard/LastOrders";
import api from "../../api/api";
import Loader from "../../components/Loaders/Loader";

const Dashboard = () => {
  const { t } = useTranslation();
  const auth = useAuth();

  const [loading, setLoading] = useState(true);
  const [cardsInfo, setCardsInfo] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/dashboard");
        const data = response.data;

        setCardsInfo(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener datos del backend:", error);
        setError(
          "Error con la conexión al servidor, por favor intente más tarde..."
        );
        setLoading(false);
      }
    };

    fetchData();
    auth.checkTokenExpiration();
  }, [auth]);

  return (
    <section>
      {loading ? (
        <Loader />
      ) : error ? (
        <div className="flex justify-center items-center text-red-500 text-center lg:bg-red-100 rounded-md py-6 px-2 mt-  ">
          <p>{error}</p>
        </div>
      ) : (
        <>
          <h2 className="font-bold text-[#555CB3]">
            {t("dashboard_welcome")} Andy Scott!
          </h2>
          <Cards data={cardsInfo} />
          <Graphics />
          <LastOrders />
        </>
      )}
    </section>
  );
};

export default Dashboard;

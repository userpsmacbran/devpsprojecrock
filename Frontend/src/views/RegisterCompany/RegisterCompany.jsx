import { useEffect } from "react";
import { useAuth } from "../../auth/AuthProvider";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const { t } = useTranslation();

  const auth = useAuth();
  useEffect(() => {
    auth.checkTokenExpiration();
  }, []);

  return (
    <section className="text-4xl text-center">
      <h2>{t("title_dashboard")}</h2>
    </section>
  );
};

export default Dashboard;

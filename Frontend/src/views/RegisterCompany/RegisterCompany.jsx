import { useEffect } from "react";
import { useAuth } from "../../auth/AuthProvider";

const Dashboard = () => {
  const auth = useAuth();
  useEffect(() => {
    auth.checkTokenExpiration();
  }, []);

  return (
    <section className="text-4xl text-center">
      <h2>Dashboard Administrativo</h2>
    </section>
  );
};

export default Dashboard;

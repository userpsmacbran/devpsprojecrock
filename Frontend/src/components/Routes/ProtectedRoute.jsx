import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth();

  console.log(isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <Outlet />
    </>
  );
}

import { Link, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth();

  console.log(isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <nav className="bg-blue-500 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/dashboard" className="text-white text-lg font-bold">
            Dashboard
          </Link>
          <Link to="/graphics" className="text-white text-lg font-bold">
            Graphics
          </Link>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

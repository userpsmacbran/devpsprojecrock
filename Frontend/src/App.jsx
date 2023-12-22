import { Routes, Route } from "react-router-dom";
import Login from "./views/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./auth/AuthProvider";
import Graphics from "./views/Graphics/Graphics";
import Dashboard from "./views/RegisterCompany/RegisterCompany";
import PublicRoute from "./components/PublicRoute";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Ruta protegida para el dashboard */}
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/graphics" element={<Graphics />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;

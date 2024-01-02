import { Routes, Route } from "react-router-dom";
import Login from "./views/Login/Login";
import { AuthProvider } from "./auth/AuthProvider";
import Graphics from "./views/Graphics/Graphics";
import Dashboard from "./views/Dashboard/Dashboard";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout/Layout";
import ResponsiveDrawer from "./views/Testing/Testing";
import Clients from "./views/users/clients/Clients";
import Companies from "./views/users/companies/Companies";
import Moderators from "./views/Users/Moderators/Moderators";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/testing" element={<ResponsiveDrawer />} />
        </Route>
        {/* Rutas protegidas */}
        <Route path="/" element={<ProtectedRoute />}>
          {/* Layout para rutas protegidas */}
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/graphics" element={<Graphics />} />
            <Route path="/users/clients" element={<Clients />} />
            <Route path="/users/companies" element={<Companies />} />
            <Route path="/users/moderators" element={<Moderators />} />
            <Route
              path="/users/*"
              element={<div>Page in users not found</div>}
            />
            <Route path="*" element={<div> Page not found</div>} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;

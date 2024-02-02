import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./views/Login/Login";
import { AuthProvider } from "./auth/AuthProvider";
import Graphics from "./views/Graphics/Graphics";
import Dashboard from "./views/Dashboard/Dashboard";
import Layout from "./components/Layout/Layout";
import ResponsiveDrawer from "./views/Testing/Testing";
import Clients from "./views/Users/Clients/Clients";
import Moderators from "./views/Users/Moderators/Moderators";
import Companies from "./views/Users/Companies/Companies";
import PublicRoute from "./components/Routes/PublicRoute";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import CreateUser from "./views/Users/Create/CreateUser";
import Memberships from "./views/Memberships/Memberships";
import EditMemberships from "./views/Memberships/Edit/EditMemberships";
import Country from "./views/Ubications/Country/Country";
import State from "./views/Ubications/State/State";
import City from "./views/Ubications/City/City";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<PublicRoute />}>
          <Route index element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/testing" element={<ResponsiveDrawer />} />
        </Route>

        {/* Rutas protegidas */}
        <Route path="/" element={<ProtectedRoute />}>
          {/* Layout para rutas protegidas */}
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/graphics" element={<Graphics />} />
            <Route path="/memberships/create" element={<Memberships />} />
            <Route path="/memberships/edit" element={<EditMemberships />} />
            <Route path="/users/clients" element={<Clients />} />
            <Route path="/users/companies" element={<Companies />} />
            <Route path="/users/moderators" element={<Moderators />} />
            <Route path="/users/create-user" element={<CreateUser />} />
            <Route path="/ubications/country" element={<Country />} />
            <Route path="/ubications/state" element={<State />} />
            <Route path="/ubications/city" element={<City />} />
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

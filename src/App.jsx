import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import TenantDashboard from "./pages/TenantDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import MaintenanceDashboard from "./pages/MaintenanceDashboard";
import ComplaintForm from "./pages/ComplaintForm";
import ComplaintDetails from "./pages/ComplaintDetails";
import Reports from "./pages/Reports";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/tenant-dashboard"
          element={<TenantDashboard />}
        />

        <Route
          path="/manager-dashboard"
          element={<ManagerDashboard />}
        />

        <Route
          path="/maintenance-dashboard"
          element={<MaintenanceDashboard />}
        />

        <Route
          path="/complaint-form"
          element={<ComplaintForm />}
        />

        <Route
          path="/complaint-details"
          element={<ComplaintDetails />}
        />

        <Route
          path="/reports"
          element={<Reports />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
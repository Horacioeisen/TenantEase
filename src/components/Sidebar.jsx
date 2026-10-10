import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  PlusCircle,
  BarChart3,
  LogOut,
  Wrench
} from "lucide-react";

export default function Sidebar({ role }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("tenantEaseUser");
    navigate("/login");
  };

  return (
    <aside className="sidebar">

      <div className="logo">
        <div className="logo-icon">T</div>
        <div>
          <h2>TenantEase</h2>
          <span>Complaint Management</span>
        </div>
      </div>

      <nav>

        <NavLink
          to={
            role === "tenant"
              ? "/tenant"
              : role === "manager"
              ? "/manager"
              : "/maintenance"
          }
          className="nav-item"
        >
          <LayoutDashboard size={19} />
          Dashboard
        </NavLink>

        {role === "tenant" && (
          <>
            <NavLink to="/complaint/new" className="nav-item">
              <PlusCircle size={19} />
              New Complaint
            </NavLink>

            <NavLink to="/tenant" className="nav-item">
              <ClipboardList size={19} />
              My Complaints
            </NavLink>
          </>
        )}

        {role === "manager" && (
          <>
            <NavLink to="/manager" className="nav-item">
              <ClipboardList size={19} />
              Complaint Queue
            </NavLink>

            <NavLink to="/reports" className="nav-item">
              <BarChart3 size={19} />
              Reports & Analytics
            </NavLink>
          </>
        )}

        {role === "maintenance" && (
          <NavLink to="/maintenance" className="nav-item">
            <Wrench size={19} />
            My Tasks
          </NavLink>
        )}

      </nav>

      <button className="logout-btn" onClick={logout}>
        <LogOut size={19} />
        Logout
      </button>

    </aside>
  );
}
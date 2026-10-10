import { Bell, Search } from "lucide-react";

export default function Topbar({ title, subtitle }) {

  const user = JSON.parse(
    localStorage.getItem("tenantEaseUser")
  );

  return (
    <header className="topbar">

      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <div className="topbar-right">

        <div className="search-box">
          <Search size={18} />
          <input placeholder="Search..." />
        </div>

        <button className="icon-btn">
          <Bell size={20} />
          <span className="notification-dot"></span>
        </button>

        <div className="user-profile">
          <div className="avatar">
            {user?.name?.charAt(0) || "U"}
          </div>

          <div>
            <strong>{user?.name || "User"}</strong>
            <small>
              {user?.role === "manager"
                ? "Property Manager"
                : user?.role === "maintenance"
                ? "Maintenance Staff"
                : "Tenant"}
            </small>
          </div>
        </div>

      </div>

    </header>
  );
}
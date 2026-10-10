import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatusBadge from "../components/StatusBadge";

export default function TenantDashboard() {

  const navigate = useNavigate();

  const storedComplaints =
    JSON.parse(localStorage.getItem("complaints")) || [];

  const [filter, setFilter] = useState("All");

  const complaints = storedComplaints.filter(
    complaint => filter === "All"
      ? true
      : complaint.status === filter
  );

  const stats = {
    total: storedComplaints.length,
    pending: storedComplaints.filter(
      x => x.status === "Pending"
    ).length,
    progress: storedComplaints.filter(
      x => x.status === "In Progress"
    ).length,
    resolved: storedComplaints.filter(
      x => x.status === "Resolved"
    ).length
  };

  return (
    <div className="app-layout">

      <Sidebar role="tenant" />

      <main className="main-content">

        <Topbar
          title="My Dashboard"
          subtitle="Track and manage your property concerns"
        />

        <section className="content">

          <div className="welcome-card">

            <div>
              <span className="small-label">
                TENANT PORTAL
              </span>

              <h2>
                Need something fixed?
              </h2>

              <p>
                Report a property issue and track its
                progress from submission to resolution.
              </p>

              <button
                className="primary-btn compact"
                onClick={() =>
                  navigate("/complaint/new")
                }
              >
                <Plus size={18} />
                New Complaint
              </button>
            </div>

            <div className="welcome-icon">
              <FileText size={75} />
            </div>

          </div>

          <div className="stats-grid">

            <Stat
              title="Total Complaints"
              value={stats.total}
              icon={<FileText />}
            />

            <Stat
              title="Pending"
              value={stats.pending}
              icon={<Clock />}
            />

            <Stat
              title="In Progress"
              value={stats.progress}
              icon={<AlertCircle />}
            />

            <Stat
              title="Resolved"
              value={stats.resolved}
              icon={<CheckCircle />}
            />

          </div>

          <div className="section-header">

            <div>
              <h2>My Complaints</h2>
              <p>View your recent reports</p>
            </div>

            <select
              value={filter}
              onChange={e =>
                setFilter(e.target.value)
              }
            >
              <option>All</option>
              <option>Pending</option>
              <option>Assigned</option>
              <option>In Progress</option>
              <option>Resolved</option>
              <option>Closed</option>
              <option>Reopened</option>
            </select>

          </div>

          <div className="complaint-grid">

            {complaints.length === 0 ? (

              <div className="empty-state">
                <FileText size={45} />
                <h3>No complaints found</h3>
                <p>
                  You haven't submitted any complaints yet.
                </p>
              </div>

            ) : (

              complaints.map(complaint => (

                <div
                  className="complaint-card"
                  key={complaint.id}
                  onClick={() =>
                    navigate(
                      `/complaint/${complaint.id}`
                    )
                  }
                >

                  <div className="card-top">
                    <span>
                      {complaint.id}
                    </span>

                    <StatusBadge
                      status={complaint.status}
                    />
                  </div>

                  <h3>{complaint.title}</h3>

                  <p>
                    {complaint.description}
                  </p>

                  <div className="card-footer">
                    <span>
                      {complaint.category}
                    </span>

                    <span>
                      {complaint.date}
                    </span>
                  </div>

                </div>

              ))

            )}

          </div>

        </section>

      </main>

    </div>
  );
}

function Stat({ title, value, icon }) {
  return (
    <div className="stat-card">

      <div className="stat-icon">
        {icon}
      </div>

      <div>
        <span>{title}</span>
        <strong>{value}</strong>
      </div>

    </div>
  );
}
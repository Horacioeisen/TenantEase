import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ClipboardList,
  Clock,
  Wrench,
  CheckCircle,
  Sparkles,
  UserPlus
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatusBadge from "../components/StatusBadge";

export default function ManagerDashboard() {

  const navigate = useNavigate();

  const [complaints, setComplaints] =
    useState(
      JSON.parse(
        localStorage.getItem("complaints")
      ) || []
    );

  const updateComplaint = (
    id,
    changes
  ) => {

    const updated =
      complaints.map(item =>
        item.id === id
          ? { ...item, ...changes }
          : item
      );

    setComplaints(updated);

    localStorage.setItem(
      "complaints",
      JSON.stringify(updated)
    );
  };

  const total = complaints.length;

  const pending =
    complaints.filter(
      x => x.status === "Pending"
    ).length;

  const progress =
    complaints.filter(
      x => x.status === "In Progress"
    ).length;

  const resolved =
    complaints.filter(
      x =>
        x.status === "Resolved" ||
        x.status === "Closed"
    ).length;

  return (
    <div className="app-layout">

      <Sidebar role="manager" />

      <main className="main-content">

        <Topbar
          title="Manager Dashboard"
          subtitle="Monitor and manage tenant complaints"
        />

        <section className="content">

          <div className="stats-grid">

            <Stat
              title="Total Complaints"
              value={total}
              icon={<ClipboardList />}
            />

            <Stat
              title="Pending"
              value={pending}
              icon={<Clock />}
            />

            <Stat
              title="In Progress"
              value={progress}
              icon={<Wrench />}
            />

            <Stat
              title="Resolved"
              value={resolved}
              icon={<CheckCircle />}
            />

          </div>

          <div className="section-header">

            <div>
              <h2>Complaint Queue</h2>

              <p>
                Review, assign and monitor complaints
              </p>
            </div>

            <button className="secondary-btn">
              Export Report
            </button>

          </div>

          <div className="manager-table">

            <table>

              <thead>
                <tr>
                  <th>Ticket</th>
                  <th>Complaint</th>
                  <th>AI Category</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Assigned To</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {complaints.map(complaint => (

                  <tr key={complaint.id}>

                    <td>
                      <strong>
                        {complaint.id}
                      </strong>
                    </td>

                    <td>

                      <strong>
                        {complaint.title}
                      </strong>

                      <small>
                        {complaint.unit}
                      </small>

                    </td>

                    <td>

                      <span className="ai-tag">
                        <Sparkles size={13} />
                        {complaint.category}
                      </span>

                    </td>

                    <td>

                      <span
                        className={`priority-${complaint.priority.toLowerCase()}`}
                      >
                        {complaint.priority}
                      </span>

                    </td>

                    <td>
                      <StatusBadge
                        status={complaint.status}
                      />
                    </td>

                    <td>

                      {complaint.assignedTo ||
                        <span className="unassigned">
                          Unassigned
                        </span>}

                    </td>

                    <td>

                      <div className="table-actions">

                        <button
                          className="small-btn"
                          onClick={() =>
                            navigate(
                              `/complaint/${complaint.id}`
                            )
                          }
                        >
                          View
                        </button>

                        <button
                          className="assign-btn"
                          onClick={() =>
                            updateComplaint(
                              complaint.id,
                              {
                                assignedTo:
                                  "Pedro Garcia",
                                status:
                                  "Assigned"
                              }
                            )
                          }
                        >
                          <UserPlus size={14} />
                          Assign
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

            {complaints.length === 0 && (
              <div className="empty-state">
                <ClipboardList size={45} />
                <h3>No complaints yet</h3>
              </div>
            )}

          </div>

        </section>

      </main>

    </div>
  );
}

function Stat({
  title,
  value,
  icon
}) {
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
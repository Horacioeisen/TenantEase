import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Wrench,
  Play,
  CheckCircle,
  ClipboardList
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatusBadge from "../components/StatusBadge";

export default function MaintenanceDashboard() {

  const navigate = useNavigate();

  const [complaints, setComplaints] =
    useState(
      JSON.parse(
        localStorage.getItem("complaints")
      ) || []
    );

  const updateStatus = (
    id,
    status
  ) => {

    const updated =
      complaints.map(item =>
        item.id === id
          ? {
              ...item,
              status
            }
          : item
      );

    setComplaints(updated);

    localStorage.setItem(
      "complaints",
      JSON.stringify(updated)
    );
  };

  const tasks =
    complaints.filter(
      x =>
        x.assignedTo === "Pedro Garcia"
    );

  return (
    <div className="app-layout">

      <Sidebar role="maintenance" />

      <main className="main-content">

        <Topbar
          title="Maintenance Dashboard"
          subtitle="Manage your assigned maintenance tasks"
        />

        <section className="content">

          <div className="stats-grid">

            <Stat
              title="Assigned Tasks"
              value={tasks.length}
              icon={<ClipboardList />}
            />

            <Stat
              title="In Progress"
              value={
                tasks.filter(
                  x => x.status === "In Progress"
                ).length
              }
              icon={<Wrench />}
            />

            <Stat
              title="Completed"
              value={
                tasks.filter(
                  x =>
                    x.status === "Resolved"
                ).length
              }
              icon={<CheckCircle />}
            />

          </div>

          <div className="section-header">

            <div>
              <h2>My Tasks</h2>
              <p>
                Complaints assigned to you
              </p>
            </div>

          </div>

          <div className="task-list">

            {tasks.length === 0 ? (

              <div className="empty-state">

                <Wrench size={45} />

                <h3>No assigned tasks</h3>

                <p>
                  New assignments will appear here.
                </p>

              </div>

            ) : (

              tasks.map(task => (

                <div
                  className="task-card"
                  key={task.id}
                >

                  <div className="task-main">

                    <div className="task-icon">
                      <Wrench size={23} />
                    </div>

                    <div>

                      <span className="ticket-id">
                        {task.id}
                      </span>

                      <h3>
                        {task.title}
                      </h3>

                      <p>
                        {task.description}
                      </p>

                      <div className="task-meta">
                        <span>
                          Location: {task.unit}
                        </span>

                        <span>
                          Category: {task.category}
                        </span>

                      </div>

                    </div>

                  </div>

                  <div className="task-actions">

                    <StatusBadge
                      status={task.status}
                    />

                    {task.status === "Assigned" && (

                      <button
                        className="primary-btn compact"
                        onClick={() =>
                          updateStatus(
                            task.id,
                            "In Progress"
                          )
                        }
                      >
                        <Play size={16} />
                        Start Work
                      </button>

                    )}

                    {task.status === "In Progress" && (

                      <button
                        className="primary-btn compact"
                        onClick={() =>
                          updateStatus(
                            task.id,
                            "Resolved"
                          )
                        }
                      >
                        <CheckCircle size={16} />
                        Complete Work
                      </button>

                    )}

                    <button
                      className="small-btn"
                      onClick={() =>
                        navigate(
                          `/complaint/${task.id}`
                        )
                      }
                    >
                      View Details
                    </button>

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
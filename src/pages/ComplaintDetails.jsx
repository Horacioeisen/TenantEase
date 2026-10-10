import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  User,
  Sparkles,
  Star
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatusBadge from "../components/StatusBadge";

export default function ComplaintDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const user =
    JSON.parse(
      localStorage.getItem("tenantEaseUser")
    );

  const complaints =
    JSON.parse(
      localStorage.getItem("complaints")
    ) || [];

  const complaint =
    complaints.find(x => x.id === id);

  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  if (!complaint) {
    return <h2>Complaint not found.</h2>;
  }

  const submitFeedback = () => {

    const updated =
      complaints.map(item =>
        item.id === id
          ? {
              ...item,
              feedback: {
                rating,
                comment: feedback
              },
              status: "Closed"
            }
          : item
      );

    localStorage.setItem(
      "complaints",
      JSON.stringify(updated)
    );

    alert("Thank you for your feedback!");

    navigate("/tenant");
  };

  return (
    <div className="app-layout">

      <Sidebar role={user.role} />

      <main className="main-content">

        <Topbar
          title="Complaint Details"
          subtitle={complaint.id}
        />

        <section className="content">

          <button
            className="back-btn"
            onClick={() =>
              navigate(
                user.role === "tenant"
                  ? "/tenant"
                  : user.role === "manager"
                  ? "/manager"
                  : "/maintenance"
              )
            }
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <div className="details-layout">

            <div className="details-main">

              <div className="details-card">

                <div className="details-title">

                  <div>
                    <span className="ticket-id">
                      {complaint.id}
                    </span>

                    <h2>
                      {complaint.title}
                    </h2>
                  </div>

                  <StatusBadge
                    status={complaint.status}
                  />

                </div>

                <div className="detail-meta">

                  <span>
                    <Clock size={16} />
                    {complaint.date}
                  </span>

                  <span>
                    <User size={16} />
                    {complaint.unit}
                  </span>

                </div>

                <hr />

                <h3>Description</h3>

                <p className="description">
                  {complaint.description}
                </p>

              </div>

              <div className="details-card">

                <h3>Complaint Timeline</h3>

                <div className="timeline">

                  <TimelineItem
                    title="Complaint Submitted"
                    description="Your complaint was successfully received."
                    active
                  />

                  <TimelineItem
                    title="AI Analysis Completed"
                    description={`Classified as ${complaint.category} with ${complaint.priority} priority.`}
                    active
                  />

                  <TimelineItem
                    title="Assigned to Maintenance"
                    description={
                      complaint.assignedTo ||
                      "Waiting for property manager assignment."
                    }
                    active={
                      ["Assigned", "In Progress", "Resolved", "Closed"]
                        .includes(complaint.status)
                    }
                  />

                  <TimelineItem
                    title="Work in Progress"
                    description="Maintenance staff is working on the issue."
                    active={
                      ["In Progress", "Resolved", "Closed"]
                        .includes(complaint.status)
                    }
                  />

                  <TimelineItem
                    title="Resolved"
                    description="Issue has been marked as resolved."
                    active={
                      ["Resolved", "Closed"]
                        .includes(complaint.status)
                    }
                  />

                </div>

              </div>

              {complaint.status === "Resolved" && (
                <div className="feedback-card">

                  <div>
                    <h3>Was your issue resolved?</h3>
                    <p>
                      Confirm the resolution and rate
                      the service you received.
                    </p>
                  </div>

                  <div className="stars">

                    {[1,2,3,4,5].map(number => (

                      <button
                        key={number}
                        onClick={() =>
                          setRating(number)
                        }
                        className={
                          rating >= number
                            ? "star active"
                            : "star"
                        }
                      >
                        <Star size={28} />
                      </button>

                    ))}

                  </div>

                  <textarea
                    placeholder="Leave a comment..."
                    value={feedback}
                    onChange={e =>
                      setFeedback(e.target.value)
                    }
                  />

                  <button
                    className="primary-btn"
                    onClick={submitFeedback}
                    disabled={!rating}
                  >
                    Submit Feedback
                  </button>

                </div>
              )}

            </div>

            <aside className="details-side">

              <div className="ai-card">

                <div className="ai-title">
                  <Sparkles size={20} />
                  AI Analysis
                </div>

                <div className="ai-row">
                  <span>Category</span>
                  <strong>
                    {complaint.category}
                  </strong>
                </div>

                <div className="ai-row">
                  <span>Priority</span>
                  <strong className={`priority-${complaint.priority.toLowerCase()}`}>
                    {complaint.priority}
                  </strong>
                </div>

                <div className="ai-summary">

                  <span>AI Summary</span>

                  <p>
                    {complaint.summary}
                  </p>

                </div>

              </div>

            </aside>

          </div>

        </section>

      </main>

    </div>
  );
}

function TimelineItem({
  title,
  description,
  active
}) {
  return (
    <div
      className={
        active
          ? "timeline-item active"
          : "timeline-item"
      }
    >
      <div className="timeline-icon">
        <CheckCircle size={17} />
      </div>

      <div>
        <strong>{title}</strong>
        <p>{description}</p>
      </div>
    </div>
  );
}
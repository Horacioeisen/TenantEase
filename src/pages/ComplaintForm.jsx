import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Upload,
  Sparkles
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function ComplaintForm() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    unit: ""
  });

  const [image, setImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const change = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const submitComplaint = e => {

    e.preventDefault();

    setSubmitting(true);

    setTimeout(() => {

      const complaints =
        JSON.parse(
          localStorage.getItem("complaints")
        ) || [];

      const number =
        String(complaints.length + 1)
          .padStart(6, "0");

      const complaint = {

        id: `CMP-${number}`,

        title: form.title,

        description: form.description,

        unit: form.unit,

        date: new Date()
          .toLocaleDateString(),

        status: "Pending",

        category:
          detectCategory(form.description),

        priority:
          detectPriority(form.description),

        summary:
          form.description.length > 100
            ? form.description.substring(0, 100) + "..."
            : form.description,

        assignedTo: null,

        image: image?.name || null,

        feedback: null

      };

      complaints.unshift(complaint);

      localStorage.setItem(
        "complaints",
        JSON.stringify(complaints)
      );

      setSubmitting(false);

      alert(
        `Complaint submitted successfully!\n\nTicket ID: ${complaint.id}`
      );

      navigate(`/complaint/${complaint.id}`);

    }, 1200);
  };

  return (
    <div className="app-layout">

      <Sidebar role="tenant" />

      <main className="main-content">

        <Topbar
          title="New Complaint"
          subtitle="Report a property issue"
        />

        <section className="content">

          <button
            className="back-btn"
            onClick={() => navigate("/tenant")}
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </button>

          <div className="form-card">

            <div className="form-heading">

              <div>
                <h2>Submit a Complaint</h2>

                <p>
                  Provide the details below so we can
                  process your concern.
                </p>
              </div>

              <div className="ai-indicator">
                <Sparkles size={18} />
                AI Analysis Enabled
              </div>

            </div>

            <form onSubmit={submitComplaint}>

              <div className="form-grid">

                <div className="form-field full">

                  <label>Complaint Title</label>

                  <input
                    name="title"
                    placeholder="e.g. Water leak in bathroom"
                    value={form.title}
                    onChange={change}
                    required
                  />

                </div>

                <div className="form-field">

                  <label>Unit / Location</label>

                  <input
                    name="unit"
                    placeholder="e.g. Building A - Unit 204"
                    value={form.unit}
                    onChange={change}
                    required
                  />

                </div>

                <div className="form-field">

                  <label>Issue Type</label>

                  <select>
                    <option>Auto-detect using AI</option>
                    <option>Plumbing</option>
                    <option>Electrical</option>
                    <option>HVAC</option>
                    <option>Cleaning</option>
                    <option>Noise</option>
                    <option>Security</option>
                    <option>Elevator</option>
                    <option>Parking</option>
                  </select>

                </div>

                <div className="form-field full">

                  <label>Description</label>

                  <textarea
                    name="description"
                    rows="7"
                    placeholder="Describe the problem in detail..."
                    value={form.description}
                    onChange={change}
                    required
                  />

                  <small>
                    AI will analyze your description
                    to determine category, priority,
                    and summary.
                  </small>

                </div>

                <div className="form-field full">

                  <label>Photo Attachment</label>

                  <label className="upload-box">

                    <Upload size={25} />

                    <span>
                      {image
                        ? image.name
                        : "Click to upload a photo"}
                    </span>

                    <small>
                      JPG, PNG up to 5MB
                    </small>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={e =>
                        setImage(e.target.files[0])
                      }
                    />

                  </label>

                </div>

              </div>

              <div className="form-actions">

                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() =>
                    navigate("/tenant")
                  }
                >
                  Cancel
                </button>

                <button
                  className="primary-btn"
                  disabled={submitting}
                >
                  <Sparkles size={18} />

                  {submitting
                    ? "Analyzing..."
                    : "Submit Complaint"}

                </button>

              </div>

            </form>

          </div>

        </section>

      </main>

    </div>
  );
}

function detectCategory(text) {

  const value = text.toLowerCase();

  if (
    value.includes("water") ||
    value.includes("pipe") ||
    value.includes("leak")
  )
    return "Plumbing";

  if (
    value.includes("electric") ||
    value.includes("light") ||
    value.includes("outlet")
  )
    return "Electrical";

  if (
    value.includes("aircon") ||
    value.includes("air conditioning") ||
    value.includes("hot")
  )
    return "HVAC";

  if (
    value.includes("noise") ||
    value.includes("loud")
  )
    return "Noise";

  if (
    value.includes("elevator") ||
    value.includes("lift")
  )
    return "Elevator";

  if (
    value.includes("security") ||
    value.includes("lock")
  )
    return "Security";

  return "General";
}

function detectPriority(text) {

  const value = text.toLowerCase();

  if (
    value.includes("fire") ||
    value.includes("danger") ||
    value.includes("flood") ||
    value.includes("emergency")
  )
    return "Critical";

  if (
    value.includes("leak") ||
    value.includes("broken") ||
    value.includes("urgent")
  )
    return "High";

  if (
    value.includes("problem") ||
    value.includes("not working")
  )
    return "Medium";

  return "Low";
}
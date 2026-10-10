import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function Reports() {

  const complaints =
    JSON.parse(
      localStorage.getItem("complaints")
    ) || [];

  const categories = [
    "Plumbing",
    "Electrical",
    "HVAC",
    "Cleaning",
    "Noise",
    "Security",
    "Elevator",
    "Parking"
  ];

  return (
    <div className="app-layout">

      <Sidebar role="manager" />

      <main className="main-content">

        <Topbar
          title="Reports & Analytics"
          subtitle="Monitor complaint trends and performance"
        />

        <section className="content">

          <div className="report-grid">

            <div className="report-card">

              <h3>Complaints by Category</h3>

              <div className="bar-chart">

                {categories.map(category => {

                  const count =
                    complaints.filter(
                      x => x.category === category
                    ).length;

                  const percentage =
                    complaints.length
                      ? Math.max(
                          (count / complaints.length) * 100,
                          count ? 8 : 0
                        )
                      : 0;

                  return (
                    <div
                      className="bar-row"
                      key={category}
                    >

                      <span>{category}</span>

                      <div className="bar-container">

                        <div
                          className="bar"
                          style={{
                            width: `${percentage}%`
                          }}
                        />

                      </div>

                      <strong>{count}</strong>

                    </div>
                  );

                })}

              </div>

            </div>

            <div className="report-card">

              <h3>Complaint Overview</h3>

              <div className="big-number">
                {complaints.length}
              </div>

              <p>
                Total complaints submitted
              </p>

              <div className="report-stat">
                <span>Resolved</span>

                <strong>
                  {
                    complaints.filter(
                      x =>
                        x.status === "Resolved" ||
                        x.status === "Closed"
                    ).length
                  }
                </strong>
              </div>

              <div className="report-stat">
                <span>Pending</span>

                <strong>
                  {
                    complaints.filter(
                      x =>
                        x.status === "Pending"
                    ).length
                  }
                </strong>
              </div>

              <div className="report-stat">
                <span>In Progress</span>

                <strong>
                  {
                    complaints.filter(
                      x =>
                        x.status === "In Progress"
                    ).length
                  }
                </strong>
              </div>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}
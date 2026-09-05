import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../styles/freelancer-dashboard.css";

function FreelancerDashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  // ==========================================
  // CHECK LOGIN
  // ==========================================

  useEffect(() => {
    const token = localStorage.getItem("token");

    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

    if (!token) {
      navigate("/login");

      return;
    }

    // Check freelancer role

    if (storedUser.role && storedUser.role.toLowerCase() !== "freelancer") {
      navigate("/client-dashboard");

      return;
    }

    setUser(storedUser);
  }, [navigate]);

  // ==========================================
  // LOGOUT
  // ==========================================

  function handleLogout() {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login");
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div className="freelancer-dashboard">
      {/* =====================================
                NAVBAR
            ===================================== */}

      <header className="freelancer-navbar">
        <div
          className="freelancer-logo"
          onClick={() => navigate("/freelancer-dashboard")}
        >
          Freelancer
          <span>Works</span>
        </div>

        <nav className="freelancer-nav">
          <button
            className="active"
            onClick={() => navigate("/freelancer-dashboard")}
          >
            Dashboard
          </button>

          <button onClick={() => navigate("/jobs")}>Find Jobs</button>

          <button onClick={() => navigate("/applications")}>
            My Applications
          </button>
        </nav>

        <div className="freelancer-user">
          <span>{user?.email || "User"}</span>

          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>

      {/* =====================================
                MAIN
            ===================================== */}

      <main className="freelancer-dashboard-main">
        {/* =================================
                    INTRO
                ================================= */}

        <section className="freelancer-welcome">
          <p>FREELANCER WORKSPACE</p>

          <h1>Welcome, {user?.name || "Freelancer"}!</h1>

          <span>
            Find opportunities and manage your applications from one place.
          </span>
        </section>

        {/* =================================
                    ACTION CARDS
                ================================= */}

        <section className="freelancer-cards">
          {/* FIND JOBS */}

          <article className="freelancer-card">
            <div className="card-icon">🔍</div>

            <h2>Find Jobs</h2>

            <p>
              Browse available freelance jobs and find opportunities that match
              your skills.
            </p>

            <button onClick={() => navigate("/jobs")}>Find Jobs →</button>
          </article>

          {/* MY APPLICATIONS */}

          <article className="freelancer-card">
            <div className="card-icon">📄</div>

            <h2>My Applications</h2>

            <p>
              View the jobs you have applied for and check your application
              status.
            </p>

            <button onClick={() => navigate("/applications")}>
              View Applications →
            </button>
          </article>

          {/* PROFILE */}

<article className="freelancer-card">

    <div className="card-icon">
        👤
    </div>

    <h2>
        My Profile
    </h2>

    <p>
        Your account information and
        freelancer details are shown below.
    </p>

    <button
    onClick={() => navigate("/profile")}
>
    View Profile →
</button>

</article>
</section>

        {/* =================================
                    ACCOUNT INFORMATION
                ================================= */}

        <section className="freelancer-account">
          <h2>Account Information</h2>

          <p>Your freelancer account details.</p>

          <div className="account-details">
            <div>
              <span>Name</span>

              <strong>{user?.name || "-"}</strong>
            </div>

            <div>
              <span>Email</span>

              <strong>{user?.email || "-"}</strong>
            </div>

            <div>
              <span>Role</span>

              <strong>Freelancer</strong>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default FreelancerDashboard;

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  ClipboardList,
  Bell,
} from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");

    if (
      email === "tenant@tenantease.com" &&
      password === "tenant123"
    ) {
      navigate("/tenant-dashboard");
    } else if (
      email === "manager@tenantease.com" &&
      password === "manager123"
    ) {
      navigate("/manager-dashboard");
    } else if (
      email === "maintenance@tenantease.com" &&
      password === "maintenance123"
    ) {
      navigate("/maintenance-dashboard");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="auth-page">

      {/* LEFT SIDE */}
      <div className="auth-left">

        <div className="auth-brand">
          <div className="logo-icon">
            T
          </div>

          <div>
            <h2>TenantEase</h2>
            <p>Tenant Complaint Management</p>
          </div>
        </div>

        <div className="hero-content">

          <div className="hero-tag">
            TENANT MANAGEMENT PLATFORM
          </div>

          <h1>
            Your concerns.
            <br />
            <span>Our priority.</span>
          </h1>

          <p>
            TenantEase makes it simple to submit, track, and
            manage property complaints while keeping tenants,
            managers, and maintenance teams connected.
          </p>

          <div className="feature-list">

            <div>
              <ShieldCheck size={18} />
              &nbsp; Secure complaint management
            </div>

            <div>
              <ClipboardList size={18} />
              &nbsp; Easy complaint tracking
            </div>

            <div>
              <Bell size={18} />
              &nbsp; Real-time status updates
            </div>

          </div>

        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="auth-right">

        <div className="login-card">

          <div className="mobile-logo">
            <div className="logo-icon">
              T
            </div>

            <div>
              <strong>TenantEase</strong>
            </div>
          </div>

          <h2>Welcome back</h2>

          <p className="form-subtitle">
            Sign in to your TenantEase account
          </p>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>

            {/* EMAIL */}
            <label>Email Address</label>

            <div className="input-group">
              <Mail size={18} />

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* PASSWORD */}
            <label>Password</label>

            <div className="input-group">
              <Lock size={18} />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>

            {/* OPTIONS */}
            <div className="form-options">

              <label className="remember">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />

                Remember me
              </label>

              <button
                type="button"
                className="forgot"
                onClick={() =>
                  alert("Password reset feature coming soon.")
                }
              >
                Forgot password?
              </button>

            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="primary-btn"
            >
              Sign In
            </button>

          </form>

          {/* REGISTER */}
          <div className="register-text">
            Don't have an account?{" "}
            <Link to="/register">
              Create an account
            </Link>
          </div>

          {/* DEMO ACCOUNTS */}
          <div className="demo-accounts">

            <strong>Demo Accounts</strong>

            <small>
              Tenant: tenant@tenantease.com / tenant123
            </small>

            <small>
              Manager: manager@tenantease.com / manager123
            </small>

            <small>
              Maintenance: maintenance@tenantease.com / maintenance123
            </small>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;
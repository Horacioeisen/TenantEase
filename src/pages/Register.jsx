import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Home } from "lucide-react";

export default function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    unit: ""
  });

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const register = e => {
    e.preventDefault();

    const user = {
      ...form,
      role: "tenant"
    };

    localStorage.setItem(
      "tenantEaseUser",
      JSON.stringify(user)
    );

    navigate("/tenant");
  };

  return (
    <div className="auth-page">

      <div className="auth-left">

        <div className="auth-brand">
          <div className="logo-icon large">T</div>

          <div>
            <h2>TenantEase</h2>
            <p>Smart Complaint Management</p>
          </div>
        </div>

        <div className="hero-content">

          <span className="hero-tag">
            JOIN TENANTEASE
          </span>

          <h1>
            Your concerns,
            <br />
            <span>our priority.</span>
          </h1>

          <p>
            Create your tenant account and start
            reporting property issues in just a few clicks.
          </p>

        </div>

      </div>

      <div className="auth-right">

        <form className="login-card" onSubmit={register}>

          <h2>Create account</h2>

          <p className="form-subtitle">
            Register as a tenant
          </p>

          <label>Full Name</label>

          <div className="input-group">
            <User size={19} />

            <input
              name="name"
              placeholder="Juan Dela Cruz"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <label>Email Address</label>

          <div className="input-group">
            <Mail size={19} />

            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <label>Unit / Location</label>

          <div className="input-group">
            <Home size={19} />

            <input
              name="unit"
              placeholder="e.g. Building A - Unit 204"
              value={form.unit}
              onChange={handleChange}
              required
            />
          </div>

          <label>Password</label>

          <div className="input-group">
            <Lock size={19} />

            <input
              name="password"
              type="password"
              placeholder="Create a password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button className="primary-btn">
            Create Account
          </button>

          <p className="register-text">
            Already have an account?
            {" "}
            <Link to="/login">
              Sign in
            </Link>
          </p>

        </form>

      </div>

    </div>
  );
}
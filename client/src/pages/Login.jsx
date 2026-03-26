import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await api.post("/login", { email, password });
      localStorage.setItem("user_id", res.data.user_id);
      navigate("/dashboard");
    } catch {
      alert("Login failed");
    }
  };

return (
  <div className="container">
    <div className="card">
      <h2>Login</h2>

      <input
        className="input"
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="input"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />

      <button className="button" onClick={login}>
        Login
      </button>
    </div>
  </div>
);
}
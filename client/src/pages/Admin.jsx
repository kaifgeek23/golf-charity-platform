import { useState, useEffect } from "react";
import api from "../api";

export default function Admin() {
  const [users, setUsers] = useState([]);

  const runDraw = async () => {
    const res = await api.post("/run-draw");
    alert("Winning numbers: " + res.data.numbers);
  };

  const fetchUsers = async () => {
    const res = await api.get("/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="page">
      <h1>Admin Panel</h1>

      <button className="button" onClick={runDraw}>
        Run Draw
      </button>

      <h3>Users</h3>
      {users.map(u => (
        <p key={u.id}>{u.email}</p>
      ))}
    </div>
  );
}
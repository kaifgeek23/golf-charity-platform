import { useState, useEffect } from "react";
import api from "../api";

export default function Dashboard() {
  const [score, setScore] = useState("");
  const [scores, setScores] = useState([]);
  const [charity, setCharity] = useState("");

  const user_id = localStorage.getItem("user_id");

const addScore = async () => {
  try {
    console.log("Sending score...");

    await api.post("/add-score", {
      user_id,
      score: Number(score)
    });

    alert("Score added");

    fetchScores();
  } catch (err) {
    console.error(err);
    alert("Error adding score");
  }
};

const fetchScores = async () => {
  try {
    const res = await api.get(`/scores/${user_id}`);
    console.log("Scores:", res.data); // DEBUG
    setScores(res.data || []);
  } catch (err) {
    console.error(err);
  }
};

  const selectCharity = async () => {
    await api.post("/select-charity", { user_id, charity });
    alert("Charity selected");
  };

  const checkResult = async () => {
    const res = await api.post("/check-results", { user_id });
    alert(`Result: ${res.data.result}`);
  };

  const subscribe = async () => {
    await api.post("/subscribe", { user_id });
    alert("Subscribed!");
  };

  useEffect(() => {
    fetchScores();
  }, []);

  return (
    <div className="page">
      <h1>Dashboard</h1>

      <input
        className="input"
        placeholder="Enter score"
        onChange={e => setScore(e.target.value)}
      />

      <button className="button" onClick={addScore}>
        Add Score
      </button>

      <h3>Your Scores:</h3>
      {scores.length === 0 ? (
      <p>No scores yet</p>
     ) : (
      scores.map(s => (
        <p key={s.id}>Score: {s.score}</p>
     ))
      )}

      <hr />

      <h3>Select Charity</h3>
      <input
        className="input"
        placeholder="Charity name"
        onChange={e => setCharity(e.target.value)}
      />

      <button className="button" onClick={selectCharity}>
        Save Charity
      </button>

      <hr />

      <button className="button" onClick={checkResult}>
        Check Result
      </button>

      <button className="button" onClick={subscribe}>
        Subscribe
      </button>
    </div>
  );
}
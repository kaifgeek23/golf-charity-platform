const jwt = require("jsonwebtoken");    
const bcrypt = require("bcryptjs");
require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API running...");
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // insert into DB
  const { data, error } = await supabase
    .from("users")
    .insert([{ email, password: hashedPassword }]);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json({ message: "User created successfully" });
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // get user
  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // compare password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ error: "Invalid password" });
  }

  // create token
  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({
    message: "Login successful",
    token,
    user_id: user.id
  });
});
app.post("/add-score", async (req, res) => {
  const { user_id, score } = req.body;

  const { data: scores, error } = await supabase
    .from("scores")
    .select("*")
    .eq("user_id", user_id)
    .order("created_at", { ascending: true });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  // FIX: handle null
  const userScores = scores || [];

  if (userScores.length >= 5) {
    const oldest = userScores[0];
    await supabase.from("scores").delete().eq("id", oldest.id);
  }

  const { error: insertError } = await supabase
    .from("scores")
    .insert([{ user_id, score }]);

  if (insertError) {
    return res.status(400).json({ error: insertError.message });
  }

  res.json({ message: "Score added" });
});
function generateDraw() {
  let numbers = [];

  while (numbers.length < 5) {
    let num = Math.floor(Math.random() * 45) + 1;

    if (!numbers.includes(num)) {
      numbers.push(num);
    }
  }

  return numbers;
}
app.post("/run-draw", async (req, res) => {
  const numbers = generateDraw();

  const { error } = await supabase
    .from("draws")
    .insert([{ numbers }]);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json({
    message: "Draw generated",
    numbers
  });
});
app.get("/charities", async (req, res) => {
  const { data } = await supabase.from("charities").select("*");
  res.json(data);
});

app.post("/select-charity", async (req, res) => {
  const { user_id, charity } = req.body;

  await supabase
    .from("users")
    .update({ charity })
    .eq("id", user_id);

  res.json({ message: "Charity selected" });
});
app.get("/scores/:user_id", async (req, res) => {
  const { user_id } = req.params;

  const { data } = await supabase
    .from("scores")
    .select("*")
    .eq("user_id", user_id)
    .order("created_at", { ascending: false });

  res.json(data);
});
app.post("/check-results", async (req, res) => {
  const { user_id } = req.body;

  const { data: scores } = await supabase
    .from("scores")
    .select("score")
    .eq("user_id", user_id);

  const { data: draw } = await supabase
    .from("draws")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  const userScores = scores.map(s => s.score);
  const drawNumbers = draw.numbers;

  const matches = userScores.filter(n => drawNumbers.includes(n)).length;

  res.json({
    matches,
    result:
      matches === 5 ? "JACKPOT" :
      matches === 4 ? "4 MATCH" :
      matches === 3 ? "3 MATCH" :
      "NO WIN"
  });
});
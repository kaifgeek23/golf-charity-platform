# 🏌️ Golf Charity Subscription Platform

A full-stack web application built as part of a technical assessment, combining **golf performance tracking**, **monthly prize draws**, and **charitable contributions** into one engaging platform.



## 📌 Project Overview

This platform allows users to:

* Subscribe to a monthly/yearly plan
* Enter and manage their latest golf scores (Stableford format)
* Participate in a monthly draw-based reward system
* Contribute to a charity of their choice

The system also includes an **admin dashboard** for managing users, draws, and platform operations.

---

## ✨ Key Features

### 🔐 Authentication

* User Signup & Login (JWT-based)
* Secure password hashing

---

### 📊 Score Management

* Users can enter golf scores (range: 1–45)
* Only the **latest 5 scores are stored**
* Automatic removal of oldest score
* Scores displayed in reverse chronological order

---

### 🎲 Draw System

* Monthly draw with 5 randomly generated numbers
* Match logic:

  * 5 matches → Jackpot
  * 4 matches → Mid-tier win
  * 3 matches → Basic reward
* Result checking for each user

---

### ❤️ Charity System

* Users can select a charity
* Contributions linked with subscription
* Charity selection stored per user

---

### 💳 Subscription System (MVP)

* Mock subscription activation
* Tracks user subscription status (active/inactive)

---

### 🛠️ Admin Panel

* Run monthly draw
* View registered users
* Manage platform operations

---

## 🧱 Tech Stack

### Frontend

* React (Vite)
* Axios
* Custom CSS (Dark UI)

### Backend

* Node.js
* Express.js
* JWT Authentication
* Bcrypt

### Database

* Supabase (PostgreSQL)

---

## 🗂️ Project Structure

```
golf-charity-platform/
 ├── client/        # Frontend (React)
 ├── server/        # Backend (Node/Express)
 ├── README.md
 └── .gitignore
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/golf-charity-platform.git
cd golf-charity-platform
```

---

### 2️⃣ Backend Setup

```bash
cd server
npm install
```

Create `.env` file:

```
SUPABASE_URL=your_url
SUPABASE_KEY=your_key
JWT_SECRET=your_secret
```

Run server:

```bash
node index.js
```

---

### 3️⃣ Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## 🔄 API Endpoints (Core)

| Method | Endpoint           | Description           |
| ------ | ------------------ | --------------------- |
| POST   | `/signup`          | Create user           |
| POST   | `/login`           | Authenticate user     |
| POST   | `/add-score`       | Add new score         |
| GET    | `/scores/:user_id` | Fetch user scores     |
| POST   | `/run-draw`        | Generate draw         |
| POST   | `/check-results`   | Check match result    |
| POST   | `/select-charity`  | Save charity          |
| POST   | `/subscribe`       | Activate subscription |
| GET    | `/users`           | Admin: list users     |



 Features Implemented from PRD

* ✔ Subscription system (basic)
* ✔ Score rolling logic (max 5 scores)
* ✔ Draw engine (random)
* ✔ Match calculation (3/4/5)
* ✔ Charity selection
* ✔ Admin controls
* ✔ Responsive UI (basic)

 Future Improvements

* Stripe payment integration
* Email notifications (draw results, alerts)
* Advanced analytics dashboard
* Winner verification system (proof upload)
* Multi-user draw participation tracking

 Learning Highlights

* Full-stack architecture design
* API development & integration
* State management in React
* Database design & query handling
* Deployment (Vercel + Render)

---

⭐ If you found this project interesting, feel free to star the repo!

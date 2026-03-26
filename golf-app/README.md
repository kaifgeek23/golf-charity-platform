# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# 🏌️ Golf Charity Subscription Platform

A full-stack web application built as part of a technical assessment.

## 🚀 Features

* User Authentication (Signup/Login)
* Score Management (last 5 scores logic)
* Monthly Draw System
* Charity Selection
* Subscription System (mock)
* Admin Panel (run draw, view users)

## 🛠️ Tech Stack

* Frontend: React (Vite)
* Backend: Node.js + Express
* Database: Supabase

## 📊 Key Functionalities

* Users can enter golf scores (1–45)
* Only latest 5 scores retained
* Monthly draw system generates winning numbers
* Match detection (3,4,5 matches)
* Charity selection system
* Admin control panel

## ⚙️ Setup Instructions

### Backend

```bash
cd server
npm install
node index.js
```

### Frontend

```bash
cd client
npm install
npm run dev
```

## 🌐 Future Improvements

* Stripe integration
* Email notifications
* Advanced analytics dashboard

---

Built for Digital Heroes Full Stack Assessment 🚀


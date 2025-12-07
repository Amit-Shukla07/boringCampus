---
description: How to deploy the Boring Campus application
---

# Deploying Boring Campus

Since this is a Next.js application, the easiest way to deploy it is using **Vercel**.

## Option 1: Deploy on Vercel (Recommended)

1.  **Push your code to GitHub**
    *   Create a new repository on GitHub.
    *   Push your local code to this repository.

2.  **Import to Vercel**
    *   Go to [Vercel.com](https://vercel.com) and sign up/login.
    *   Click "Add New..." -> "Project".
    *   Import your GitHub repository.

3.  **Configure Project**
    *   Vercel will automatically detect it's a Next.js project.
    *   **Environment Variables**: You need to add your environment variables here (from `.env.local`).
    *   Click "Deploy".

### ⚠️ Important Note on Database (SQLite)
This project currently uses `better-sqlite3` (SQLite). On serverless platforms like Vercel, the filesystem is **ephemeral**. This means your database **will be reset** every time the app redeploys or restarts.
*   **For a demo**: This is fine.
*   **For production**: You should switch to a cloud database like **Vercel Postgres**, **Supabase**, or **Turso**.

## Option 2: Deploy on a VPS (DigitalOcean, AWS, etc.)

If you want to keep using SQLite effectively, you should deploy on a Virtual Private Server (VPS).

1.  **Get a VPS** (e.g., Ubuntu on DigitalOcean).
2.  **Install Node.js** (version 18+).
3.  **Clone your repository**.
4.  **Install dependencies**: `npm install`.
5.  **Build the app**: `npm run build`.
6.  **Start the app**: `npm start`.
    *   Use a process manager like `pm2` to keep it running: `npx pm2 start npm --name "boring-campus" -- start`.

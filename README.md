# Welcome to your Lovable project

## Project info

**URL**: https://store-rate-verse.lovable.app/
## Workflow

![14 04 2025_02 30 50_REC](https://github.com/user-attachments/assets/05841143-9eab-4d23-ae8f-b32a23574585)

## How can I edit this code?

There are several ways of editing your application.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```
## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Nest.js
- Supabase (Postgres)

## How can I deploy this project?

🧰Tools You Can Use:
Component	Recommended Option(s)
Frontend (React)	Vercel / Netlify / Render
Backend (NestJS/Express/Loopback)	Render / Railway / Fly.io / DigitalOcean
Database (PostgreSQL/MySQL)	Supabase (Postgres) / PlanetScale (MySQL) / Railway / Render
Domain	Namecheap / GoDaddy / Cloudflare (optional, for custom domain)
🛠️ Step-by-Step Deployment
1. Frontend Deployment (React on Vercel)
On Vercel:
Push your React frontend code to GitHub.

Go to https://vercel.com and sign in with GitHub.

Click “New Project” and import your repo.

Set environment variables (e.g., REACT_APP_API_URL).

Click Deploy.

2. Backend Deployment (NestJS)
On Render:
Push your backend to GitHub.

Go to https://render.com, sign in.

Click New Web Service, choose your backend repo.

Select Node environment, set build command (npm run build) and start command (npm run start:prod).

Add environment variables (e.g., DB credentials, JWT secrets).

Deploy.

✅ Don’t forget to:

Enable HTTPS (Render does it by default).

Use .env to load config (use dotenv in Node/Nest).

3. Database Setup
Option A: PostgreSQL with Supabase
Go to https://supabase.com, sign up.

Create a new project → You’ll get DB URL, user, password.

Use this info in your backend .env.



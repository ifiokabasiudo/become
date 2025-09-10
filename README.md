# Become  

A productivity-focused task manager designed to go beyond simple to-do lists. Built with **Next.js, Tailwind CSS, and Supabase**, it lets users organize activities by color, group tasks, and receive reminders — making it simple to stay consistent and achieve goals.  

🚀 **Live Demo**: [https://become.vercel.app](https://become-one.vercel.app)  

---

## ✨ Features
- 🔐 **Authentication** via Supabase (secure sign-up, login, and session management).  
- 🎨 **Customizable Activities** – organize tasks with color-coded labels.  
- 🗂️ **Grouping** – create task groups for better workflow management.  
- ⏰ **Reminders** – set reminders to stay on track.  
- 📱 **Responsive UI** – clean design built with Tailwind CSS, optimized for desktop & mobile.  

---

## 🛠️ Tech Stack
- **Frontend**: Next.js (SSR), Tailwind CSS  
- **Backend/Database**: Supabase  
- **Auth**: Supabase Auth (JWT-based)  
- **Hosting**: Vercel  

---


## 🧠 Project Motivation
I built **Become** as a step up from a simple to-do list app. I wanted a project that would:  
- Help me solidify my **Next.js** and **Tailwind CSS** skills.  
- Give me hands-on practice with **Supabase** authentication, databases, and real-world data modeling.  
- Explore how to make productivity apps more engaging with **color coding, grouping, and reminders**.  

This project started as a personal learning experiment but evolved into a polished app I now showcase in my portfolio.  

---

## 🏗️ How It Was Built
- **Frontend**: Developed with **Next.js (SSR)** for fast, SEO-friendly pages, and **Tailwind CSS** for a responsive UI.  
- **Auth & Database**: Implemented with **Supabase**, handling secure sign-ups, logins, and storage of tasks.  
- **Reminders**: Each task can store a reminder timestamp, allowing future integration with cron jobs or push notifications.  
- **Deployment**: Hosted seamlessly on **Vercel** for production-ready performance.  

---

## 📸 Screenshots
---
<img width="1366" height="640" alt="Screenshot (125)" src="https://github.com/user-attachments/assets/e12880fa-0a6d-4015-a92d-2f82e8e55db7" />
<img width="1366" height="647" alt="Screenshot (130)" src="https://github.com/user-attachments/assets/737f76d6-ba7d-43f6-8bdd-e2d4135e5369" />
<img width="1366" height="651" alt="Screenshot (129)" src="https://github.com/user-attachments/assets/8c7b58af-11ac-4508-b9cf-2dc4de0ec1ca" />
<img width="1366" height="647" alt="Screenshot (128)" src="https://github.com/user-attachments/assets/18298fea-4097-4ddd-85fb-cc92e2dd27a7" />
<img width="1366" height="640" alt="Screenshot (127)" src="https://github.com/user-attachments/assets/cd9292c4-842e-4218-86e1-2d5897111e15" />
<img width="1366" height="644" alt="Screenshot (126)" src="https://github.com/user-attachments/assets/fc4f7613-4f5b-403c-ba58-0f0b2a572add" />

## ⚡ Getting Started (Local Development)

To run Become locally:  

```bash
# Clone the repository
git clone https://github.com/ifiokabasiudo/become.git
cd become

# Install dependencies
npm install

# Create a .env.local file in the root with your Supabase keys
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key

# Run the development server
npm run dev
  

# 🚀 BLOGerVoger

<div align="center">

  **A modern full-stack publishing platform designed for readers, writers, and creators.**

  [![React](https://img.shields.io/badge/React-18.x-61DAFB.svg?style=flat&logo=react)](https://reactjs.org/)
  [![Vite](https://img.shields.io/badge/Vite-5.x-646CFF.svg?style=flat&logo=vite)](https://vitejs.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC.svg?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
  [![Framer Motion](https://img.shields.io/badge/Framer_Motion-14.x-FF0055.svg?style=flat&logo=framer)](https://www.framer.com/motion/)
  [![Node.js](https://img.shields.io/badge/Node.js-22.x-339933.svg?style=flat&logo=nodedotjs)](https://nodejs.org/)
  [![Express](https://img.shields.io/badge/Express-4.x-000000.svg?style=flat&logo=express)](https://expressjs.com/)

</div>

---

## 📖 Overview

**BLOGerVoger** provides a fast, dynamic, and responsive blogging experience. Whether discovering trending articles, reading deep-dives across multiple topics, or composing rich new posts with rich-text editing, BLOGerVoger is built for seamless content discovery and community engagement.

> 📌 **Project Origin:** This platform was originally created in 2024 as an academic assignment project and has since been modernized with responsive architecture, dark mode, and an enhanced creator experience.

---

## ✨ Features

- **🎨 Modern Responsive Interface:** Crafted with Tailwind CSS, featuring full Dark/Light theme switching and smooth layout transitions powered by **Framer Motion**.
- **📝 Rich Text Publishing:** Comprehensive post editor powered by **React Quill** with typography formatting, cover images, and customizable tags.
- **💬 Interactive Engagement:** Built-in appreciation system supporting instant article likes and discussions.
- **🔍 Real-Time Search & Category Filters:** Instant search across articles by title, keywords, or topics (Technology, Business, Sports, Entertainment, Devotion).
- **👤 Creator Profiles & Admin Dashboard:** Dedicated dashboards for managing published articles, editing live stories, and updating author profiles.
- **⚡ Client-Side Persistence:** Seamless local data engine that preserves user profiles, posts, and interactions instantly.

---

## 🛠 Tech Stack

| Domain | Technologies |
|---|---|
| **Frontend** | React 18, Vite, React Router 6, Framer Motion, Lucide Icons, React Icons |
| **Styling & UI** | Tailwind CSS, `@tailwindcss/typography`, React Multi Carousel, React Hot Toast |
| **Content Editor** | React Quill (`quill.snow.css`) |
| **Backend API** | Node.js, Express.js, JWT, bcryptjs |
| **Database & Media** | MongoDB / Mongoose, Cloudinary |

---

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js** (v18 or higher)
- **npm** (v9 or higher)

### 2. Installation
Clone the repository and install dependencies:

```bash
git clone https://github.com/yashsrivastava0/BlogerVoger.git
cd BlogerVoger
npm install
```

### 3. Development Server
Run the unified development command:

```bash
npm run dev
```

Open your browser at `http://localhost:3000` to explore the application.

### 4. Build for Production
To generate an optimized production bundle:

```bash
npm run build
```

---

## 📂 Project Structure

```
BlogerVoger/
├── backend/            # Express REST API, auth controllers, and Mongoose schemas
├── frontend/           # Vite + React single-page application
│   ├── public/         # Static assets, category photography, and avatars
│   ├── src/
│   │   ├── Home/       # Hero, Trending carousel, Devotional, and Creator showcases
│   │   ├── components/ # Global Navigation, Footer, and layout elements
│   │   ├── context/    # Authentication & Theme state providers
│   │   ├── dashboard/  # Creator Studio: Post creation, management, and profiles
│   │   ├── pages/      # Route views: All Blogs, Details, Creators, Auth, About
│   │   └── services/   # Client API layer and local persistence engine
│   └── vite.config.js  # Vite server and plugin configuration
└── package.json        # Root workspace configuration
```

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

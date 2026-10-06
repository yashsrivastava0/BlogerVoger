<div align="center">
  <h1>🚀 BLOGerVoger - Premium Edition</h1>
  <p>A modernized, full-stack blogging application built with the MERN stack, completely redesigned with a sleek user interface, rich features, and a seamless fallback architecture.</p>

  [![React](https://img.shields.io/badge/React-18.x-blue.svg?style=flat&logo=react)](https://reactjs.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-20.x-green.svg?style=flat&logo=nodedotjs)](https://nodejs.org/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green.svg?style=flat&logo=mongodb)](https://www.mongodb.com/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC.svg?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
  [![Framer Motion](https://img.shields.io/badge/Framer_Motion-14.x-E902B5.svg?style=flat&logo=framer)](https://www.framer.com/motion/)
</div>

---

## ✨ What's New? (Premium Upgrades)

- **🎨 Gorgeous Dark/Light Mode:** Seamless toggle using Tailwind CSS and React Context.
- **✨ Fluid Animations:** Integrated **Framer Motion** for premium scroll effects, page transitions, and hover states.
- **📝 Rich Text Editor:** Create and update posts using **React Quill**, beautifully rendered with `@tailwindcss/typography`.
- **💬 Engagement Features:** Users can now **Like** and **Comment** on posts, with backend routing and UI support.
- **🔍 Advanced Search & Filtering:** Instantly search through posts by title, categories, or tags.
- **🛡️ Robust Fallback Architecture:** A custom API layer that intelligently detects backend failures (Network or 5xx errors) and switches to a seamless `localStorage` mocking mode, ensuring the app remains usable even when the server is down.

## 🛠 Tech Stack

### Front-End ⚛️
- **React.js (Vite):** Blazing fast frontend framework.
- **Tailwind CSS & Typography:** For beautiful, responsive, and robust styling.
- **Framer Motion:** For advanced layout animations.
- **React Quill:** Rich text editor for blogs.
- **Axios & Context API:** For structured API calls and state management.

### Back-End 🟢
- **Node.js & Express.js:** Scalable backend framework.
- **MongoDB & Mongoose:** NoSQL database with advanced schemas (Tags, Comments, Likes).
- **JWT & bcryptjs:** Secure authentication and password hashing.
- **Cloudinary:** Remote media storage for blog images and avatars.

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```
   git clone https://github.com/yashsrivastava0/BlogerVoger.git
   cd BlogerVoger
   ```

2. **Back End Setup:**
   ```
   cd backend
   npm install
   ```
   Create a `.env` file with your credentials (MongoDB URI, Port, Cloudinary Keys, JWT Secret) and run the start script.

3. **Front End Setup:**
   ```
   cd frontend
   npm install
   ```
   Run the dev script to start the local development server.

## 🔄 Fake Auth & Fallback Mode
If the MongoDB backend is unavailable or taking too long to respond, the frontend will automatically switch to **Fallback Mode**.
- It captures API errors and routes them through a mock handler.
- Uses `localStorage` to simulate a database for users and blogs.
- Allows registration, login, and blogging without a live Node.js server!

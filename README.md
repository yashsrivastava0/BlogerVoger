# BlogerVoger 🚀

The MERN Blog App is a modern, full-stack blogging application built using the MERN stack (MongoDB, Express.js, React, Node.js). This application enables users to create, read, update, and delete blog posts seamlessly. It includes secure user authentication via JWT, allowing users to safely register, log in, and manage their content. The UI has been heavily revamped with `framer-motion` for a smooth, interactive experience.

## ✨ Features

- 🔐 **Secure User Authentication**: Registration and login powered by JSON Web Tokens (JWT).
- 🧑‍💻 **Guest Login**: Effortless preview with one-click Guest Login.
- 📝 **Full CRUD Functionality**: Create, read, update, and delete your own blog posts.
- 🎨 **Modern & Interactive UI**: Beautiful animations powered by `framer-motion` and styled with Tailwind CSS.
- 🔍 **Search Capabilities**: Easily search and filter through blog posts.
- 📱 **Fully Responsive**: Optimized for all devices (Mobile, Tablet, Desktop).
- 📸 **Cloudinary Integration**: Robust image upload and real-time previews.
- 👤 **Profile Management**: Manage and view your user profile.

## 🛠 Technologies Used

### Front-End

- **⚛️ React.js:** A JavaScript library for building user interfaces.
- **🎨 Tailwind CSS:** A utility-first CSS framework for rapid UI development.
- **✨ Framer Motion:** For high-performance, fluid animations.
- **📡 Axios:** A centralized HTTP client (configured with interceptors) for seamless API integration.
- **📋 React Hook Form:** Efficient form state management and validation.
- **🚦 React Router DOM:** Declarative routing for React.

### Back-End

- **🟢 Node.js:** A scalable JavaScript runtime environment.
- **🌐 Express.js:** Fast, unopinionated web framework for Node.js.
- **🍃 MongoDB:** A flexible NoSQL database.
- **🔗 Mongoose:** Elegant MongoDB object modeling for Node.js.
- **🔑 JWT (JSON Web Tokens):** Secure, stateless authentication.
- **☁️ Cloudinary:** Cloud-based image and video management.

## 🏗 Architecture

- **Frontend (`/frontend`)**: Contains the React application, state management, API utility wrappers, and UI components.
- **Backend (`/backend`)**: Houses the Express server, Mongoose schemas, controllers, and authentication middleware (`authUser.js`).
- **Authentication Flow**: The application utilizes standard JWT authentication. The backend is configured to accept tokens either via `httpOnly` cookies (for production/HTTPS environments) or via the `Authorization: Bearer <token>` header (making local development and cross-origin requests seamless).

## ⚙️ Installation & Setup

1. **Clone the repository:**
    git clone https://github.com/yashsrivastava0/BlogerVoger.git
    cd BlogerVoger

2. **Back-End Setup:**
    cd backend
    npm install
    Create a `.env` file in the `/backend` directory based on `.env.example` (ensure you add your MongoDB URI, Cloudinary keys, and JWT Secret).
    Start the backend server (using npm).
    *The server will typically run on http://localhost:4001.*

3. **Front-End Setup:**
    cd ../frontend
    npm install
    Start the Vite development server.

## 🤝 Contributing

Contributions are welcome! Please fork the repository and create a pull request with your enhancements. Ensure you follow standard coding conventions.

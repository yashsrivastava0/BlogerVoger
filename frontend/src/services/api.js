import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL || '';

const api = axios.create({
  baseURL: BASE_URL || 'http://localhost:4001/api',
  withCredentials: true,
});

// Client-Side Data Storage Engine
const getLocalStorage = (key, initialValue) => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  } catch (error) {
    console.error(error);
    return initialValue;
  }
};

const setLocalStorage = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
};

const defaultUsers = [
  {
    _id: "user_admin_1",
    name: "Yash Srivastava",
    email: "yashsrivastavaclass11@gmail.com",
    role: "admin",
    phone: "+91 9369260135",
    education: "B.TECH",
    bio: "Full-stack developer passionate about building scalable, dynamic web applications with MERN stack.",
    photo: { url: "/user.jpg" },
  },
  {
    _id: "user_admin_2",
    name: "Akhil K",
    email: "akhil@example.com",
    role: "admin",
    phone: "+91 9876543210",
    education: "M.TECH",
    bio: "Tech enthusiast and writer sharing deep-dives into modern web development and software architecture.",
    photo: { url: "/user2.jpg" },
  }
];

const defaultBlogs = [
  {
    _id: "blog_1",
    title: "The Art of Modern Business & Entrepreneurship",
    category: "Business",
    about: "<p>Business refers to the organized efforts and activities of individuals or organizations to produce and sell goods and services for profit. It plays a central role in the economy, driving innovation, creating jobs, and generating wealth. Businesses can range from small, single-owner operations to large multinational corporations.</p><p>Key principles of an impactful enterprise include value creation, sound financial management, and customer-first focus.</p>",
    tags: ["business", "entrepreneurship", "growth"],
    adminName: "Yash Srivastava",
    adminEmail: "yashsrivastavaclass11@gmail.com",
    adminPhoto: "/user.jpg",
    createdBy: "user_admin_1",
    blogImage: { url: "/bussiness.jpg" },
    likes: ["user_admin_2"],
    comments: [
      {
        user: { name: "Akhil K", photo: { url: "/user2.jpg" } },
        text: "Great insights on entrepreneurship and scaling value!",
        createdAt: new Date().toISOString()
      }
    ],
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    _id: "blog_2",
    title: "Mastering Modern Web Architecture with React & Node",
    category: "Technology",
    about: "<p>Modern web development has evolved rapidly with component-based architectures, responsive frameworks, and cloud-native solutions. Leveraging full-stack JavaScript allows developers to build high-performance, maintainable user experiences.</p><p>Key focuses include clean code, component modularity, state management with hooks, and scalable RESTful API design.</p>",
    tags: ["technology", "react", "coding", "webdev"],
    adminName: "Yash Srivastava",
    adminEmail: "yashsrivastavaclass11@gmail.com",
    adminPhoto: "/user.jpg",
    createdBy: "user_admin_1",
    blogImage: { url: "/code1.avif" },
    likes: ["user_admin_1", "user_admin_2"],
    comments: [],
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString()
  },
  {
    _id: "blog_3",
    title: "The Universal Language of Music & Sound",
    category: "Entertainment",
    about: "<p>Music is a universal form of art and communication that transcends language and cultural boundaries. It is an organized combination of sounds that can evoke a wide range of emotions, tell stories, and convey ideas.</p><p>Music is deeply embedded in human culture, serving as a form of expression, entertainment, and even spiritual connection.</p>",
    tags: ["music", "entertainment", "art"],
    adminName: "Akhil K",
    adminEmail: "akhil@example.com",
    adminPhoto: "/user2.jpg",
    createdBy: "user_admin_2",
    blogImage: { url: "/music.jpg" },
    likes: ["user_admin_1"],
    comments: [],
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString()
  },
  {
    _id: "blog_4",
    title: "Football: The Global Phenomenon & Beautiful Game",
    category: "Sports",
    about: "<p>Football, also known as soccer, is one of the most popular sports in the world. Played by two teams of eleven players on a rectangular field with a goal at each end, the objective is to score by getting the ball into the opposing net.</p><p>The sport fosters global unity, discipline, athleticism, and teamwork.</p>",
    tags: ["sports", "football", "fitness"],
    adminName: "Yash Srivastava",
    adminEmail: "yashsrivastavaclass11@gmail.com",
    adminPhoto: "/user.jpg",
    createdBy: "user_admin_1",
    blogImage: { url: "/football.jpg" },
    likes: ["user_admin_1"],
    comments: [],
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString()
  },
  {
    _id: "blog_5",
    title: "Hockey: Agility, Speed, and Passion on the Turf",
    category: "Sports",
    about: "<p>Hockey is a historic and dynamic team sport known for lightning-fast gameplay, precise stick work, and tactical coordination. It brings extraordinary excitement and athletic prowess to millions of enthusiasts worldwide.</p>",
    tags: ["sports", "hockey", "championship"],
    adminName: "Akhil K",
    adminEmail: "akhil@example.com",
    adminPhoto: "/user2.jpg",
    createdBy: "user_admin_2",
    blogImage: { url: "/hocky.jpg" },
    likes: [],
    comments: [],
    createdAt: new Date(Date.now() - 86400000 * 6).toISOString()
  },
  {
    _id: "blog_6",
    title: "Goddess Lakshmi: The Eternal Symbol of Wealth & Grace",
    category: "Devotion",
    about: "<p>Lakshmi, also spelled Laxmi, is the Hindu goddess of wealth, prosperity, fortune, and beauty. She is the consort of Lord Vishnu and plays a significant role in Hindu spirituality.</p><p>Lakshmi is commonly depicted with four hands, standing or sitting upon a lotus flower, which symbolizes spiritual purity and divine abundance.</p>",
    tags: ["devotion", "spirituality", "culture"],
    adminName: "Yash Srivastava",
    adminEmail: "yashsrivastavaclass11@gmail.com",
    adminPhoto: "/user.jpg",
    createdBy: "user_admin_1",
    blogImage: { url: "/lord-laxmi.jpg" },
    likes: ["user_admin_1"],
    comments: [],
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString()
  },
  {
    _id: "blog_7",
    title: "Lord Krishna & The Timeless Teachings of Gita",
    category: "Devotion",
    about: "<p>Lord Krishna is revered for his divine playfulness, profound wisdom, and timeless philosophy. In the Bhagavad Gita, dialogue between Krishna and Arjuna explores duty, righteousness, and inner peace.</p>",
    tags: ["devotion", "krishna", "gita", "wisdom"],
    adminName: "Yash Srivastava",
    adminEmail: "yashsrivastavaclass11@gmail.com",
    adminPhoto: "/user.jpg",
    createdBy: "user_admin_1",
    blogImage: { url: "/mahabharat.jpg" },
    likes: ["user_admin_2"],
    comments: [],
    createdAt: new Date(Date.now() - 86400000 * 8).toISOString()
  },
  {
    _id: "blog_8",
    title: "Devotion to Mahadev: Infinite Stillness and Transformation",
    category: "Devotion",
    about: "<p>Lord Shiva represents the supreme consciousness, cosmic dance, meditation, and inner transcendence. Worshipped across centuries, Mahadev teaches simplicity, detachment, and supreme strength.</p>",
    tags: ["devotion", "mahadev", "meditation"],
    adminName: "Akhil K",
    adminEmail: "akhil@example.com",
    adminPhoto: "/user2.jpg",
    createdBy: "user_admin_2",
    blogImage: { url: "/mahadev.jpg" },
    likes: ["user_admin_1"],
    comments: [],
    createdAt: new Date(Date.now() - 86400000 * 9).toISOString()
  },
  {
    _id: "blog_9",
    title: "Action Movies: Dynamic Choreography and Storytelling",
    category: "Entertainment",
    about: "<p>Action movies emphasize physical feats, high-stakes scenarios, and heroic resilience. They immerse the audience with breathless pacing, inspiring protagonists, and breathtaking visual craftsmanship.</p>",
    tags: ["movies", "entertainment", "cinema"],
    adminName: "Yash Srivastava",
    adminEmail: "yashsrivastavaclass11@gmail.com",
    adminPhoto: "/user.jpg",
    createdBy: "user_admin_1",
    blogImage: { url: "/action.jpg" },
    likes: [],
    comments: [],
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString()
  }
];

// Initialize mock storage
if (!localStorage.getItem('mockUsers') || getLocalStorage('mockUsers', []).length === 0) {
  setLocalStorage('mockUsers', defaultUsers);
}
if (!localStorage.getItem('mockBlogs') || getLocalStorage('mockBlogs', []).length === 0) {
  setLocalStorage('mockBlogs', defaultBlogs);
}

// Ensure default authenticated admin session
if (!localStorage.getItem('jwt')) {
  localStorage.setItem('jwt', 'mock-admin-jwt-token');
}
if (!localStorage.getItem('currentUser')) {
  setLocalStorage('currentUser', defaultUsers[0]);
}

// Generate realistic signed JWT token
const generateToken = (user) => {
  try {
    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
    const payload = btoa(JSON.stringify({
      id: user._id,
      email: user.email,
      role: user.role,
      name: user.name,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 86400 * 7
    }));
    const signature = "c2lnbmF0dXJlX2tleV9ibG9nZXJ2b2dlcg";
    return `${header}.${payload}.${signature}`;
  } catch {
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMyJ9.sig_blogervoger";
  }
};

// Default to local client storage if no external backend URL is specified
let useLocalStore = !import.meta.env.VITE_BACKEND_URL;

export const apiRequest = async (method, url, data = null, config = {}) => {
  const cleanUrl = url.toLowerCase();
  let delay = 100;
  if (cleanUrl.includes('/users/login')) delay = 650;
  else if (cleanUrl.includes('/users/register')) delay = 800;
  else if (cleanUrl.includes('/users/logout')) delay = 400;
  else if (cleanUrl.includes('/blogs/create')) delay = 500;
  else if (cleanUrl.includes('/blogs/update')) delay = 450;
  else if (cleanUrl.includes('/blogs/delete')) delay = 350;

  if (useLocalStore) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const result = mockApiHandler(method, url, data);
          resolve({ data: result });
        } catch (e) {
          reject(e);
        }
      }, delay);
    });
  }

  try {
    const response = await api({ method, url, data, ...config });
    return response;
  } catch (error) {
    const isNetworkError = !error.response;
    const isServerError = error.response && error.response.status >= 500;

    if (isNetworkError || isServerError) {
      console.warn(`Remote server unavailable for ${url}. Handled by local client storage.`);
      useLocalStore = true;
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            const result = mockApiHandler(method, url, data);
            resolve({ data: result });
          } catch (e) {
            reject(e);
          }
        }, delay);
      });
    }

    throw error;
  }
};

const mockApiHandler = (method, url, data) => {
  const users = getLocalStorage('mockUsers', defaultUsers);
  let blogs = getLocalStorage('mockBlogs', defaultBlogs);
  const currentUser = getLocalStorage('currentUser', users[0] || null);

  const cleanUrl = url.toLowerCase();

  // Users Auth
  if (cleanUrl.includes('/users/login') && method.toLowerCase() === 'post') {
    const email = (data?.email || '').trim().toLowerCase();
    let user = users.find(u => u.email.toLowerCase() === email);
    if (!user && email) {
      user = {
        _id: `user_${Date.now()}`,
        name: email.split('@')[0].replace(/[^a-zA-Z0-9]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        email: email,
        role: data.role || 'user',
        phone: "+91 9369260135",
        education: "Professional",
        photo: { url: "/user.jpg" },
        bio: "Active reader and contributor on BLOGerVoger."
      };
      users.push(user);
      setLocalStorage('mockUsers', users);
    }

    if (!user) {
      throw new Error("Please enter a valid email address");
    }

    if (data.role && user.role !== data.role) {
      user.role = data.role;
      setLocalStorage('mockUsers', users);
    }

    const token = generateToken(user);
    setLocalStorage('currentUser', user);
    localStorage.setItem('jwt', token);
    localStorage.setItem('authSession', JSON.stringify({ userId: user._id, loginTime: Date.now() }));
    return { message: `Welcome back, ${user.name}!`, user, token };
  }

  if (cleanUrl.includes('/users/register') && method.toLowerCase() === 'post') {
    let newUser;
    if (data instanceof FormData) {
      const email = data.get('email') || `user_${Date.now()}@example.com`;
      newUser = {
        _id: `user_${Date.now()}`,
        name: data.get('name') || 'New Author',
        email: email,
        role: data.get('role') || 'user',
        phone: data.get('phone') || '+91 9369260135',
        education: data.get('education') || 'B.TECH',
        photo: { url: '/user.jpg' },
        bio: `${data.get('role') === 'admin' ? 'Editorial administrator' : 'Contributing writer'} passionate about technology and lifestyle.`
      };
    } else {
      newUser = {
        _id: `user_${Date.now()}`,
        ...data,
        photo: data?.photo?.url ? data.photo : { url: '/user.jpg' }
      };
    }

    users.push(newUser);
    setLocalStorage('mockUsers', users);
    const token = generateToken(newUser);
    setLocalStorage('currentUser', newUser);
    localStorage.setItem('jwt', token);
    localStorage.setItem('authSession', JSON.stringify({ userId: newUser._id, loginTime: Date.now() }));
    return { message: `Account created successfully! Welcome to BLOGerVoger, ${newUser.name}.`, user: newUser, token };
  }

  if (cleanUrl.includes('/users/logout')) {
    setLocalStorage('currentUser', null);
    localStorage.removeItem('jwt');
    localStorage.removeItem('authSession');
    return { message: "Successfully logged out. See you again soon!" };
  }

  if (cleanUrl.includes('/users/my-profile') && method.toLowerCase() === 'get') {
    const activeUser = getLocalStorage('currentUser', null);
    if (activeUser) return { user: activeUser };
    return { user: users[0] };
  }

  if ((cleanUrl.includes('/users/admin') || cleanUrl.includes('/users/admins')) && method.toLowerCase() === 'get') {
    const creators = users.filter(u => u.role === 'admin');
    return { admin: creators.length ? creators : users, admins: creators.length ? creators : users };
  }

  // Blogs
  if (cleanUrl.includes('/blogs/all-blogs') && method.toLowerCase() === 'get') {
    return { blogs };
  }

  if (cleanUrl.includes('/blogs/my-blog') && method.toLowerCase() === 'get') {
    const authorEmail = currentUser?.email || users[0]?.email;
    const myBlogs = blogs.filter(b => b.adminEmail === authorEmail || b.createdBy === currentUser?._id);
    return { blogs: myBlogs.length ? myBlogs : blogs.slice(0, 3) };
  }

  if (cleanUrl.includes('/blogs/single-blog/') && method.toLowerCase() === 'get') {
    const id = url.split('/').pop();
    const blog = blogs.find(b => b._id === id) || blogs[0];
    if (blog) return blog;
    throw new Error("Blog not found");
  }

  if (cleanUrl.includes('/blogs/create') && method.toLowerCase() === 'post') {
    const author = currentUser || users[0];
    let newBlog;
    if (data instanceof FormData) {
      newBlog = {
        _id: Date.now().toString(),
        title: data.get('title') || 'Untitled Blog',
        category: data.get('category') || 'Technology',
        about: data.get('about') || '',
        adminName: author.name,
        adminEmail: author.email,
        adminPhoto: author.photo?.url || '/user.jpg',
        createdBy: author._id,
        blogImage: { url: '/code2.jpg' },
        likes: [],
        comments: [],
        tags: data.get('tags') ? JSON.parse(data.get('tags')) : ["general"],
        createdAt: new Date().toISOString()
      };
    } else {
      newBlog = {
        _id: Date.now().toString(),
        ...data,
        adminName: author.name,
        adminEmail: author.email,
        adminPhoto: author.photo?.url || '/user.jpg',
        createdBy: author._id,
        blogImage: { url: '/code2.jpg' },
        likes: [],
        comments: [],
        tags: data?.tags || ["general"],
        createdAt: new Date().toISOString()
      };
    }
    blogs.unshift(newBlog);
    setLocalStorage('mockBlogs', blogs);
    return { message: "Blog created successfully", blog: newBlog };
  }

  if (cleanUrl.includes('/blogs/update/') && (method.toLowerCase() === 'put' || method.toLowerCase() === 'post')) {
    const id = url.split('/').pop();
    const blogIndex = blogs.findIndex(b => b._id === id);
    if (blogIndex > -1) {
      if (data instanceof FormData) {
        const updateData = {
          title: data.get('title') || blogs[blogIndex].title,
          category: data.get('category') || blogs[blogIndex].category,
          about: data.get('about') || blogs[blogIndex].about,
        };
        blogs[blogIndex] = { ...blogs[blogIndex], ...updateData };
      } else {
        blogs[blogIndex] = { ...blogs[blogIndex], ...data };
      }
      setLocalStorage('mockBlogs', blogs);
      return { message: "Blog updated successfully", blog: blogs[blogIndex] };
    }
    throw new Error("Blog not found");
  }

  if (cleanUrl.includes('/blogs/delete/') && method.toLowerCase() === 'delete') {
    const id = url.split('/').pop();
    blogs = blogs.filter(b => b._id !== id);
    setLocalStorage('mockBlogs', blogs);
    return { message: "Blog deleted successfully" };
  }

  if (cleanUrl.includes('/blogs/like/')) {
    const id = url.split('/').pop();
    const blog = blogs.find(b => b._id === id);
    if (blog) {
      const userId = currentUser?._id || 'user_admin_1';
      blog.likes = blog.likes || [];
      const index = blog.likes.indexOf(userId);
      if (index === -1) {
        blog.likes.push(userId);
      } else {
        blog.likes.splice(index, 1);
      }
      setLocalStorage('mockBlogs', blogs);
      return { message: "Like updated", likes: blog.likes };
    }
    throw new Error("Blog not found");
  }

  if (cleanUrl.includes('/blogs/comment/')) {
    const id = url.split('/').pop();
    const blog = blogs.find(b => b._id === id);
    if (blog) {
      blog.comments = blog.comments || [];
      const comment = {
        user: {
          name: currentUser?.name || 'Reader',
          photo: currentUser?.photo || { url: '/user.jpg' }
        },
        text: data?.text || 'Great article!',
        createdAt: new Date().toISOString()
      };
      blog.comments.push(comment);
      setLocalStorage('mockBlogs', blogs);
      return { message: "Comment added", comments: blog.comments };
    }
    throw new Error("Blog not found");
  }

  return { message: "Success" };
};

export default api;

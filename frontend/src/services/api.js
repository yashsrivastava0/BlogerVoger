import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4001/api';

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // For sending cookies
});

// Mock Data Storage (Fallback)
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

// Fake Data Init
if (!localStorage.getItem('mockUsers')) {
  setLocalStorage('mockUsers', []);
}
if (!localStorage.getItem('mockBlogs')) {
  setLocalStorage('mockBlogs', []);
}

let useFallback = false;

// Fallback logic

export const apiRequest = async (method, url, data = null, config = {}) => {
  try {
    if (useFallback) {
      throw new Error("Simulated Backend Failure");
    }
    const response = await api({ method, url, data, ...config });
    return response;
  } catch (error) {
    // Only fallback if network error (no response) or 5xx server error
    const isNetworkError = !error.response;
    const isServerError = error.response && error.response.status >= 500;

    if (isNetworkError || isServerError) {
        console.warn(`Backend request to ${url} failed. Attempting fallback...`);
        useFallback = true;

        return new Promise((resolve, reject) => {
          setTimeout(() => {
            try {
              const result = mockApiHandler(method, url, data);
              resolve({ data: result });
            } catch (e) {
              reject(e);
            }
          }, 500);
        });
    }

    // Otherwise it's a legitimate error from the server (e.g. 400 Bad Request, 401 Unauthorized), so throw it
    throw error;
  }
};

const mockApiHandler =  (method, url, data) => {
  const users = getLocalStorage('mockUsers', []);
  let blogs = getLocalStorage('mockBlogs', []);
  const currentUser = getLocalStorage('currentUser', null);

  // Users Auth
  if (url.includes('/users/login') && method === 'post') {
    const user = users.find(u => u.email === data.email);
    // Fake login logic without passcheck for simplicity
    if (user) {
        setLocalStorage('currentUser', user);
        return { message: "Login successful", user, token: "fake-jwt-token-123" };
    }
    throw new Error("Invalid credentials");
  }

  if (url.includes('/users/register') && method === 'post') {
    let newUser;
    if (data instanceof FormData) {
        // Handle FormData roughly
        newUser = {
            _id: Date.now().toString(),
            name: data.get('name'),
            email: data.get('email'),
            role: data.get('role'),
            phone: data.get('phone'),
            photo: { url: 'https://via.placeholder.com/150' }, // Fake Photo
            bio: data.get('bio') || ''
        }
    } else {
        newUser = { _id: Date.now().toString(), ...data, photo: { url: 'https://via.placeholder.com/150' } };
    }

    users.push(newUser);
    setLocalStorage('mockUsers', users);
    setLocalStorage('currentUser', newUser);
    return { message: "Registration successful", user: newUser };
  }

  if (url.includes('/users/logout') && method === 'get') {
    setLocalStorage('currentUser', null);
    return { message: "Logged out" };
  }

  if (url.includes('/users/my-profile') && method === 'get') {
      if (currentUser) return { user: currentUser };
      throw new Error("Not authenticated");
  }

  if (url.includes('/users/admin') && method === 'get') {
    // Return mock creators
    const creators = users.filter(u => u.role === 'admin');
    return { admin: creators };
  }


  // Blogs
  if (url.includes('/blogs/all-blogs') && method === 'get') {
    return { blogs };
  }

  if (url.includes('/blogs/my-blog') && method === 'get') {
    if (!currentUser) throw new Error("Not authenticated");
    const myBlogs = blogs.filter(b => b.adminEmail === currentUser.email);
    return { blogs: myBlogs };
  }

  if (url.includes('/blogs/single-blog/') && method === 'get') {
    const id = url.split('/').pop();
    const blog = blogs.find(b => b._id === id);
    if (blog) return { blog };
    throw new Error("Blog not found");
  }

  if (url.includes('/blogs/create') && method === 'post') {
    if (!currentUser) throw new Error("Not authenticated");
    let newBlog;
    if (data instanceof FormData) {
        newBlog = {
            _id: Date.now().toString(),
            title: data.get('title'),
            category: data.get('category'),
            about: data.get('about'),
            adminName: currentUser.name,
            adminEmail: currentUser.email,
            adminPhoto: currentUser.photo?.url,
            blogImage: { url: 'https://via.placeholder.com/800x400' }, // Fake image
            likes: [],
            comments: [],
            tags: data.get('tags') ? JSON.parse(data.get('tags')) : []
        };
    } else {
        newBlog = { _id: Date.now().toString(), ...data, adminName: currentUser.name, adminEmail: currentUser.email, blogImage: {url: 'https://via.placeholder.com/800x400'}, likes: [], comments: [], tags: [] };
    }
    blogs.push(newBlog);
    setLocalStorage('mockBlogs', blogs);
    return { message: "Blog created", blog: newBlog };
  }

  if (url.includes('/blogs/update/') && method === 'put') {
    const id = url.split('/').pop();
    let blogIndex = blogs.findIndex(b => b._id === id);
    if (blogIndex > -1) {
        if(data instanceof FormData) {
             const updateData = {
                 title: data.get('title'),
                 category: data.get('category'),
                 about: data.get('about'),
             }
             blogs[blogIndex] = { ...blogs[blogIndex], ...updateData };
        } else {
             blogs[blogIndex] = { ...blogs[blogIndex], ...data };
        }
        setLocalStorage('mockBlogs', blogs);
        return { message: "Blog updated", blog: blogs[blogIndex] };
    }
    throw new Error("Blog not found");
  }

  if (url.includes('/blogs/delete/') && method === 'delete') {
    const id = url.split('/').pop();
    blogs = blogs.filter(b => b._id !== id);
    setLocalStorage('mockBlogs', blogs);
    return { message: "Blog deleted" };
  }

  throw new Error(`Fallback unhandled route: ${method.toUpperCase()} ${url}`);
};

export default api;


export default api;

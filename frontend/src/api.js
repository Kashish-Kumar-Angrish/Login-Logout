const API_BASE_URL = import.meta.env.VITE_API_URL || (
  import.meta.env.DEV
    ? "http://localhost:8080"
    : "https://login-logout-1-glst.onrender.com"
);

export default API_BASE_URL;

// import axios from "axios";

// const API = axios.create({
//   baseURL: import.meta.env.VITE_API_URL
// });

// API.interceptors.request.use((req) => {
//   const token = localStorage.getItem("token");

//   if (token) {
//     req.headers.Authorization = `Bearer ${token}`;
//   }

//   return req;
// });

// export default API;

import axios from "axios";

function resolveApiBaseUrl() {
  // IMPORTANT: Keep the exact `import.meta.env` access so Vite injects env values.
  // Use try/catch so Jest (Node) can still import this module safely.
  let fromVite;
  try {
    fromVite = import.meta.env.VITE_API_URL;
  } catch {
    fromVite = undefined;
  }
  const fromNode = globalThis?.process?.env?.VITE_API_URL;
  const baseURL = fromVite ?? fromNode;

  if (!baseURL || typeof baseURL !== "string") return undefined;
  return baseURL.trim() || undefined;
}

export function getApiErrorMessage(error, fallback = "Something went wrong") {
  if (!error) return fallback;

  // Axios: prefer server-provided message when present.
  if (axios.isAxiosError?.(error)) {
    const data = error.response?.data;
    if (typeof data === "string" && data.trim()) return data;
    if (data && typeof data === "object") {
      const msg =
        data.message ??
        data.error ??
        (Array.isArray(data.errors) ? data.errors[0]?.message : undefined);
      if (typeof msg === "string" && msg.trim()) return msg;
    }
    if (typeof error.message === "string" && error.message.trim()) return error.message;
    return fallback;
  }

  if (error instanceof Error && typeof error.message === "string" && error.message.trim()) {
    return error.message;
  }

  return fallback;
}

const API = axios.create({
  baseURL: resolveApiBaseUrl(),
  timeout: 15000
});

API.interceptors.request.use(
  (req) => {
    if (!API.defaults.baseURL) {
      throw new Error('Missing API base URL. Set "VITE_API_URL" (see `.env.example`).');
    }

    const token = localStorage.getItem("token");

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    req.headers.Accept = "application/json";
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (res) => res,
  (error) => {
    // If the token is invalid/expired, clear it so protected routes kick in.
    const status = error?.response?.status;
    if (status === 401) {
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

export default API;
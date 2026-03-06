export function getToken() {
  return localStorage.getItem("token");
}

function base64UrlDecode(input) {
  const base64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const pad = base64.length % 4 ? "=".repeat(4 - (base64.length % 4)) : "";
  const str = base64 + pad;
  try {
    return decodeURIComponent(
      atob(str)
        .split("")
        .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
        .join("")
    );
  } catch {
    return null;
  }
}

export function decodeJwt(token) {
  if (!token || typeof token !== "string") return null;
  const parts = token.split(".");
  if (parts.length < 2) return null;
  const payload = base64UrlDecode(parts[1]);
  if (!payload) return null;
  try {
    return JSON.parse(payload);
  } catch {
    return null;
  }
}

export function getUserFromToken(token = getToken()) {
  const payload = decodeJwt(token);
  if (!payload) return null;
  return {
    id: payload.sub,
    name: payload.name,
    email: payload.email,
    role: payload.role || "user"
  };
}

export function isAdmin(token = getToken()) {
  const u = getUserFromToken(token);
  return u?.role === "admin";
}

export function logout() {
  localStorage.removeItem("token");
}


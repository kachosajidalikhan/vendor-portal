// hooks/useAuth.js
export function useAuth() {
  const token = localStorage.getItem("token");
  return !!token; // true agar token hai
}

export const useAuth = () => {
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    user = null;
  }

  return {
    isAuthenticated: !!user?.id, // 🔥 FIXED
    logout: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  };
};
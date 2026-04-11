// Mock auth service — replace with real API calls
export const authService = {
  login: async (email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 500));
    return { user: { id: "1", name: "Demo", email }, token: "mock-jwt" };
  },
  signup: async (data: { name: string; email: string; password: string }) => {
    await new Promise((r) => setTimeout(r, 500));
    return { user: { id: "1", name: data.name, email: data.email }, token: "mock-jwt" };
  },
  logout: () => {
    localStorage.removeItem("lr_token");
    localStorage.removeItem("lr_user");
  },
};

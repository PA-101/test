import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "{}");
    } catch {
      return {};
    }
  })();

  if (!user?.id) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
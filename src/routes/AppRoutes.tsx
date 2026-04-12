import { Routes, Route } from "react-router-dom";

import Home from "@/pages/Home";
import Pricing from "@/pages/Pricing";
import Dashboard from "@/pages/app/Dashboard";

import ProtectedRoute from "@/components/ProtectedRoute";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/pricing" element={<Pricing />} />

    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    />
  </Routes>
);

export default AppRoutes;
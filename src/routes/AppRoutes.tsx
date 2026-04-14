import { Routes, Route } from "react-router-dom";

import Home from "@/pages/Home";
import Pricing from "@/pages/Pricing";
import Dashboard from "@/pages/app/Dashboard";
import Login from "@/pages/auth/Login";
import Demo from "@/pages/Demo";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/pricing" element={<Pricing />} />
    <Route path="/login" element={<Login />} />
    <Route path="/demo" element={<Demo />} />
    <Route path="/dashboard" element={<Dashboard />} />
  </Routes>
);

export default AppRoutes;
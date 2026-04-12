import Success from "@/pages/Success";
import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Pricing from "@/pages/Pricing";
import HowItWorks from "@/pages/HowItWorks";
import Results from "@/pages/Results";
import Demo from "@/pages/Demo";
import NotFound from "@/pages/NotFoundPage";
import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import ResetPassword from "@/pages/auth/ResetPassword";
import Dashboard from "@/pages/app/Dashboard";
import Leads from "@/pages/app/Leads";
import Automations from "@/pages/app/Automations";
import Reviews from "@/pages/app/Reviews";
import SettingsPage from "@/pages/app/Settings";
import Onboarding from "@/pages/app/Onboarding";
import ProtectedRoute from "@/components/ProtectedRoute";

const AppRoutes = () => (
  <Routes>
    {/* Public */}
    <Route path="/" element={<Home />} />
    <Route path="/pricing" element={<Pricing />} />
    <Route path="/how-it-works" element={<HowItWorks />} />
    <Route path="/results" element={<Results />} />
    <Route path="/demo" element={<Demo />} />

    {/* Auth */}
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/success" element={<Success />} />
    <Route path="/app/dashboard" element={<ProtectedRoute>
    <Dashboard />
    </ProtectedRoute>
  }
/>

    {/* Protected */}
    <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
    <Route path="/leads" element={<ProtectedRoute><Leads /></ProtectedRoute>} />
    <Route path="/automations" element={<ProtectedRoute><Automations /></ProtectedRoute>} />
    <Route path="/reviews" element={<ProtectedRoute><Reviews /></ProtectedRoute>} />
    <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;

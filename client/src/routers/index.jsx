import { Routes, Route, Navigate } from "react-router-dom";
import Notfound from "@/views/error-views/Notfound";
import LandingPage from "@/views/landing-views";
import AppLayout from "@/components/layout-components/AppLayout";

export default function SetupRoutes() {
  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path="/dashboard" element={<AppLayout />} />
      <Route>
        <Route path="/404" element={<Notfound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  );
}

import { Routes, Route, Navigate } from "react-router-dom";
import Notfound from "@/views/error-views/Notfound";
import LandingPage from "@/views/landing-views";
import Rekrutmen from "@/views/app-views/rekrutmen";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "@/views/app-views/dashboard";

export default function SetupRoutes() {
  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/rekrutmen" element={<Rekrutmen />} />
      </Route>
      <Route>
        <Route path="/404" element={<Notfound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  );
}

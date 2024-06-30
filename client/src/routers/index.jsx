import { Routes, Route, Navigate } from "react-router-dom";
import Notfound from "@/views/error-views/Notfound";
import LandingPage from "@/views/landing-views";
import Rekrutmen from "@/views/app-views/rekrutmen";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "@/views/app-views/dashboard";
import PublicRoute from "./PublicRoute";
import UploadLowongan from "@/views/app-views/rekrutmen/misc/UploadLowongan";
import ProtectedRoute from "./ProtectedRoute";
import Login from "@/views/auth-views/Login";
import Profile from "@/views/app-views/profile";

export default function SetupRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PublicRoute />}>
        <Route index element={<LandingPage />} />
      </Route>
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/rekrutmen" element={<Rekrutmen />} />
        <Route path="/unggah-lowongan" element={<UploadLowongan />} />
        <Route path="/profil" element={<Profile />} />
      </Route>
      <Route path="/" element={<ProtectedRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route>
        <Route path="/404" element={<Notfound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  );
}

import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
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
import DetailLowongan from "@/views/app-views/rekrutmen/misc/DetailLowongan";
import UpdateLowongan from "@/views/app-views/rekrutmen/misc/UpdateLowongan";

import { globalRoute } from "@/utils/GlobalRoute";

export default function SetupRoutes() {
  const navigate = useNavigate();
  globalRoute.navigate = navigate;
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/rekrutmen" element={<Rekrutmen />} />
        <Route path="/unggah-lowongan" element={<UploadLowongan />} />
        <Route path="/profil" element={<Profile />} />
        <Route
          path="/detail-lowongan/:rekrutmenId"
          element={<DetailLowongan />}
        />
        <Route
          path="/update-lowongan/:rekrutmenId"
          element={<UpdateLowongan />}
        />
      </Route>
      <Route path="/" element={<ProtectedRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>

      <Route path="/" element={<PublicRoute />}>
        <Route index element={<LandingPage />} />
        <Route path="/lowongan/:rekrutmenId" element={<DetailLowongan />} />
      </Route>
      <Route>
        <Route path="/404" element={<Notfound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  );
}

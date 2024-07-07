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
import Absensi from "@/views/app-views/absensi";
import Cuti from "@/views/app-views/cuti";
import Mutasi from "@/views/app-views/mutasi";
import Penugasan from "@/views/app-views/penugasan";
import PemutusanHubunganKerja from "@/views/app-views/phk";
import RewardAndPunishment from "@/views/app-views/reward-punishment";
import AddUser from "@/views/app-views/profile/components/AddUser";
import UpdateUser from "@/views/app-views/profile/components/UpdateUser";
import AddCuti from "@/views/app-views/cuti/misc/AddCuti";
import UpdateCuti from "@/views/app-views/cuti/misc/UpdateCuti";
import AddPegawai from "@/views/app-views/profile/components/AddPegawai";
import UpdatePegawai from "@/views/app-views/profile/components/UpdatePegawai";
// import PDFcuti from "../views/app-views/cuti/misc/PDFcuti";

export default function SetupRoutes() {
  const navigate = useNavigate();
  globalRoute.navigate = navigate;
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profil" element={<Profile />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/update-user/:userId" element={<UpdateUser />} />
        <Route path="/add-pegawai" element={<AddPegawai />} />
        <Route path="/update-pegawai/:pegawaiId" element={<UpdatePegawai />} />
        <Route path="/pengajuan-cuti" element={<AddCuti />} />
        <Route path="/update-cuti/:cutiId" element={<UpdateCuti />} />
        <Route path="/absensi" element={<Absensi />} />
        <Route path="/cuti" element={<Cuti />} />
        <Route path="/mutasi" element={<Mutasi />} />
        <Route path="/penugasan" element={<Penugasan />} />
        <Route
          path="/pemutusan-hubungan-kerja"
          element={<PemutusanHubunganKerja />}
        />
        <Route
          path="/reward-and-punishment"
          element={<RewardAndPunishment />}
        />
        <Route path="/rekrutmen" element={<Rekrutmen />} />
        <Route path="/unggah-lowongan" element={<UploadLowongan />} />
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
        {/* <Route path="/cuti-pdf" element={<PDFcuti />} /> */}
      </Route>
      <Route>
        <Route path="/404" element={<Notfound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  );
}

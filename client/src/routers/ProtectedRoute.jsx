import { Navigate, Outlet } from "react-router-dom";

import Timeout from "@/views/error-views/Timeout";
import { useNavigatorOnline } from "@/hooks/useNavigatorOnline";

import { authService } from "@/configs/auth";

export default function ProtectedRoute() {
  const isAuthenticated = authService.isAuthorized();
  const isOnline = useNavigatorOnline();

  if (!isAuthenticated && isOnline) return <Outlet />;
  if (!isOnline) return <Timeout />;
  return <Navigate to="/dashboard" />;
}

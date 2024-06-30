import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AppLayout } from "@/components/layout-components/AppLayout";
import { useNavigatorOnline } from "@/hooks/useNavigatorOnline";
import Timeout from "@/views/error-views/Timeout";

import { authService } from "@/configs/auth";

export default function PrivateRoute() {
  const isAuthenticated = authService.isAuthorized();
  const isOnline = useNavigatorOnline();
  const location = useLocation();
  const { pathname } = location;

  let path = "/login";

  if (pathname !== "/") {
    path += `?return_to=${pathname.slice(1, pathname.length)}`;
  }

  console.log("isAuthenticated:", isAuthenticated);

  if (isAuthenticated && isOnline) {
    return (
      <AppLayout>
        <Outlet />
      </AppLayout>
    );
  } else if (!isOnline) {
    return <Timeout />;
  }
  return <Navigate to={path} />;
}

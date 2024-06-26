import { Navigate, Outlet } from "react-router-dom";
import { AppLayout } from "@/components/layout-components/AppLayout";
import { useNavigatorOnline } from "@/hooks/useNavigatorOnline";
import Timeout from "@/views/error-views/Timeout";

export default function PrivateRoute() {
  const isOnline = useNavigatorOnline();

  if (isOnline) {
    return (
      <AppLayout>
        <Outlet />
      </AppLayout>
    );
  } else if (!isOnline) {
    return <Timeout />;
  }
  return <Navigate to={"/"} />;
}

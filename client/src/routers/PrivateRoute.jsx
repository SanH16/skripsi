import { Outlet } from "react-router-dom";
import AppLayout from "@/components/layout-components/AppLayout";

export default function PrivateRoute() {
  return (
    <AppLayout>
        <Outlet />
    </AppLayout>
  )
}

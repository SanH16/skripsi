import { Outlet } from "react-router-dom";

import Timeout from "@/views/error-views/Timeout";
import { useNavigatorOnline } from "@/hooks/useNavigatorOnline";
import { LandingPageLayout } from "@/components/layout-components/LandingPageLayout";

export default function PublicRoute() {
  const isOnline = useNavigatorOnline();

  if (isOnline) {
    return (
      <LandingPageLayout>
        <Outlet />;
      </LandingPageLayout>
    );
  } else {
    return <Timeout />;
  }
}

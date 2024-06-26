import { Outlet } from "react-router-dom";

function Content() {
  return (
    <main id="content-landing-page">
      <div className="bg-error-timeout"></div>
      <Outlet />
    </main>
  );
}

export function LandingPageLayout() {
  return (
    <div id="landing-page-layout">
      <Content />
    </div>
  );
}

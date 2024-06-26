import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

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
      <Navbar />
      <Content />
      <Footer />
    </div>
  );
}

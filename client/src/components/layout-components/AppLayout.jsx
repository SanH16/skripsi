import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <Layout className="bg-white">
      <div className="text-red-800"></div>
      <Topbar />
      <main className="flex">
        <Sidebar />
        <Content />
      </main>
    </Layout>
  );
}

function Content() {
  return (
    <section className="w-full overflow-x-hidden px-5">
      <Outlet />
    </section>
  );
}

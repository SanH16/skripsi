import { Layout } from "antd";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AppLayout() {
  return (
    <Layout className="bg-white">
      <div className="text-red-800"></div>
      <Topbar />
      <main className="flex">
        <Sidebar />
      </main>
    </Layout>
  );
}

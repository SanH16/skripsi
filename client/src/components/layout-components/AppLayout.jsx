import { Layout } from "antd";
import Sidebar from "@/Sidebar";

export default function AppLayout() {
  return (
    <Layout className="bg-white">
      <div className="text-red-800">Something wrong</div>
      <main className="flex">
        <Sidebar />
      </main>
    </Layout>
  );
}

import SetupRoutes from "@/routers";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <>
      <ToastContainer
        enableMultiContainer
        containerId="xl"
        className="mt-14 w-full"
      />
      <ToastContainer
        enableMultiContainer
        containerId="md"
        className="mt-14 w-[450px]"
      />
      <SetupRoutes />
    </>
  );
}

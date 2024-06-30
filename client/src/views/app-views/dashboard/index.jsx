import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { Welcome } from "./components/Welcome";

export default function Dashboard() {
  useDocumentTitle("Dashboard");
  useScrollToTop();
  return (
    <div className="mb-5 py-5">
      <Welcome />
    </div>
  );
}

import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import AddTugas from "./misc/AddTugas";

export default function Penugasan() {
  useDocumentTitle("Halaman Penugasan");
  useScrollToTop();

  return <AddTugas />;
}

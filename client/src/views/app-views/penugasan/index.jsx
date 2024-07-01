import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useScrollToTop } from "@/hooks/useScrollToTop";

export default function Penugasan() {
  useDocumentTitle("Halaman Penugasan");
  useScrollToTop();

  return <div>Penugasan</div>;
}

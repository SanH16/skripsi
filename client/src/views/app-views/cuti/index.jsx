import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useScrollToTop } from "@/hooks/useScrollToTop";

export default function Cuti() {
  useDocumentTitle("Halaman Cuti");
  useScrollToTop();
  return <div>Cuti</div>;
}

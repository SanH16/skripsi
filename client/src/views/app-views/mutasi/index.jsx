import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useScrollToTop } from "@/hooks/useScrollToTop";

export default function Mutasi() {
  useDocumentTitle("Halaman Mutasi");
  useScrollToTop();
  return <div>Mutasi</div>;
}

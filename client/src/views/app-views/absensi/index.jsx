import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useScrollToTop } from "@/hooks/useScrollToTop";

export default function Absensi() {
  useDocumentTitle("Halaman Absensi");
  useScrollToTop();
  return <div>Absensi</div>;
}

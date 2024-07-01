import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useScrollToTop } from "@/hooks/useScrollToTop";

export default function PemutusanHubunganKerja() {
  useDocumentTitle("Halaman PHK");
  useScrollToTop();

  return <div>PemutusanHubunganKerja</div>;
}

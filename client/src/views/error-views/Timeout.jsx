import { MdOutlineWifiOff } from "react-icons/md";
import useDocumentTitle from "@/hooks/useDocumentTitle";

export default function Timeout() {
  useDocumentTitle("Error");
  return (
    <>
      <div className="bg-error-timeout hidden h-screen w-screen bg-center bg-no-repeat sm:flex"></div>
      <div className="flex h-screen flex-col items-center justify-center px-5 text-center sm:hidden">
        <MdOutlineWifiOff className="text-6xl" />
        <h1 className="font-bold">Koneksi Terputus!</h1>
        <p className="text-base font-medium text-grey-300">
          Browser anda tidak memberikan permintaan lengkap di waktu yang tepat.
        </p>
      </div>
    </>
  );
}

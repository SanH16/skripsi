import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const errorStyle = {
  className: "bg-red-500 text-white ps-5 font-medium text-base xl:text-lg",
};
const successStyle = {
  className: "bg-green-500 text-white ps-5 font-medium text-base xl:text-lg",
};

export function showErrorToast(pesan, position, size) {
  const containerId = size === "medium" ? "md" : "xl";
  toast(pesan, {
    toastId: "error-toast",
    containerId: containerId,
    position,
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    closeButton: (
      <span className="my-auto me-3 text-sm text-red-200">Abaikan</span>
    ),
    pauseOnHover: true,
    progress: undefined,
    ...errorStyle,
  });
}

export function showSuccessToast(pesan, position, size) {
  const containerId = size === "medium" ? "md" : "xl";
  toast(pesan, {
    toastId: "success-toast",
    containerId: containerId,
    position,
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    closeButton: (
      <span className="my-auto me-3 text-sm text-green-200">Abaikan</span>
    ),
    pauseOnHover: true,
    progress: undefined,
    ...successStyle,
  });
}

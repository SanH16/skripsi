import { useSyncExternalStore } from "react";

export function useNavigatorOnline() {
  const isOnline = useSyncExternalStore(subscribe, getSnapshot);
  if (isOnline) return true;
  return false;
}

function getSnapshot() {
  return navigator.onLine;
}

function subscribe(callback) {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}

import { useEffect, useState } from "react";

/**
 * Tracks the browser's online/offline status.
 * Initializes from the real connection state and cleans up its listeners.
 */
const useOnlineStatus = () => {
  const [onlineStatus, setOnlineStatus] = useState(
    typeof navigator !== "undefined" ? navigator.onLine : true,
  );

  useEffect(() => {
    const handleOnline = () => setOnlineStatus(true);
    const handleOffline = () => setOnlineStatus(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return onlineStatus;
};

export default useOnlineStatus;

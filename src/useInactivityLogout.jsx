import { useEffect, useCallback } from "react";

const useInactivityLogout = (user, onLogout, timeout = 1 * 60 * 1000) => {
  const resetTimer = useCallback(() => {
    clearTimeout(window.__inactivityTimer);
    window.__inactivityTimer = setTimeout(() => {
      if (user) {
        onLogout();
        alert("You have been logged out due to inactivity.");
      }
    }, timeout);
  }, [user, onLogout, timeout]);

  const handleActivity = useCallback(() => {
    resetTimer();
  }, [resetTimer]);

  useEffect(() => {
    if (user) {
      window.addEventListener("mousemove", handleActivity);
      window.addEventListener("keydown", handleActivity);
      window.addEventListener("click", handleActivity);
      resetTimer();
    }

    return () => {
      clearTimeout(window.__inactivityTimer);
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      window.removeEventListener("click", handleActivity);
    };
  }, [user, handleActivity, resetTimer]);
};

export default useInactivityLogout;

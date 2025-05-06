import { useEffect, useCallback, useRef, useState } from "react";
import { toast } from "react-toastify";

const useInactivityLogout = (user, onLogout, timeout = 1.2 * 60 * 1000, warningTime = 60 * 1000) => {
  const [remainingTime, setRemainingTime] = useState(warningTime);
  const logoutTimerRef = useRef(null);
  const warningTimerRef = useRef(null);
  const warningToastIdRef = useRef(null);

  const resetTimers = useCallback(() => {
    clearTimeout(logoutTimerRef.current);
    clearTimeout(warningTimerRef.current);

    // Dismiss existing toast if user interacts
    if (warningToastIdRef.current !== null) {
      toast.dismiss(warningToastIdRef.current);
      warningToastIdRef.current = null;
    }

    warningTimerRef.current = setTimeout(() => {
      if (user) {
        warningToastIdRef.current = toast.warning(
          `⚠️ You will be logged out in ${Math.floor(warningTime / 1000)} seconds due to inactivity.`,
          {
            toastId: "inactivity-warning",
            autoClose: 5000,
            closeOnClick: false,
          }
        );
        setRemainingTime(warningTime);
      }
    }, timeout - warningTime);

    logoutTimerRef.current = setTimeout(() => {
      if (user) {
        toast.dismiss("inactivity-warning");
        onLogout();
        toast.info("You have been logged out due to inactivity.");
      }
    }, timeout);
  }, [user, onLogout, timeout, warningTime]);

  const handleActivity = useCallback(() => {
    setRemainingTime(warningTime);
    resetTimers();
  }, [resetTimers, warningTime]);

  // Countdown for warning toast
  useEffect(() => {
    if (remainingTime > 0 && warningToastIdRef.current) {
      const interval = setInterval(() => {
        setRemainingTime((prev) => {
          const newTime = prev - 1000;
          return newTime >= 0 ? newTime : 0;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [remainingTime, user]);

  // Update toast with new countdown value
  useEffect(() => {
    if (warningToastIdRef.current && remainingTime > 0) {
      toast.update("inactivity-warning", {
        render: `⚠️ You will be logged out in ${Math.floor(remainingTime / 1000)} seconds due to inactivity.`,
      });
    }
  }, [remainingTime]);

  // Initialize timers and event listeners
  useEffect(() => {
    if (user) {
      window.addEventListener("mousemove", handleActivity);
      window.addEventListener("keydown", handleActivity);
      window.addEventListener("click", handleActivity);
      resetTimers();
    }

    return () => {
      clearTimeout(logoutTimerRef.current);
      clearTimeout(warningTimerRef.current);
      toast.dismiss("inactivity-warning");
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      window.removeEventListener("click", handleActivity);
    };
  }, [user, handleActivity, resetTimers]);
};

export default useInactivityLogout;

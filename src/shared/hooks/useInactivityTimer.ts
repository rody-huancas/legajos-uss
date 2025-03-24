import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@store/auth/auth.store";
import { useDialogStore } from "@store/ui/useDialog.store";

export const useInactivityTimer = (timeoutMinutes = 10) => {
  const navigate       = useNavigate();
  const logoutUser     = useAuthStore((state) => state.logoutUser);
  const { openDialog } = useDialogStore();

  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();

  const handleLogout = async () => {
    logoutUser();
    navigate("/login");

    const confirmed = await openDialog({
      title      : "Sesión expirada",
      message    : `Por seguridad, la sesión se cerrará automáticamente después de ${timeoutMinutes} minutos de inactividad.`,
      type       : "info",
      confirmText: "Entendido",
      cancelText : "",
    });

    if (confirmed) {
      clearTimeout(timeoutId);
    }
  };

  const resetTimer = () => {
    if (timeoutId) clearTimeout(timeoutId);
    const newTimeoutId = setTimeout(handleLogout, timeoutMinutes * 60 * 1000);
    setTimeoutId(newTimeoutId);
  };

  useEffect(() => {
    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    resetTimer();

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return { resetTimer };
};

import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@store/auth/auth.store";

/**
 * Muestra el contenido privado si el usuario está autenticado,
 * de lo contrario, redirige a la página de autenticación.
 */
const RoutePrivate = () => {
  const authStatus = useAuthStore((state) => state.status);
  
  return authStatus === "authorized" ? (
    <Suspense>
      <Outlet />
    </Suspense>
  ) : (
    <Navigate to="/login" />
  );
};

export default RoutePrivate;
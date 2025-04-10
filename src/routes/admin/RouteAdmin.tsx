import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import withLazy from "@shared/components/common/LazyRoute/LazyRoute";
import NotFoundPage from "@modules/not-found/NotFound";

// Layouts y Pages
const AdminLayout        = withLazy(lazy(() => import("@layouts/admin/AdminLayout")));
const Dashboard          = withLazy(lazy(() => import("@modules/admin/Dashboard/pages/Dashboard")));
const UserRole           = withLazy(lazy(() => import("@modules/admin/RolUsuario/pages/UserRole")));
const GeneralInformation = withLazy(lazy(() => import("@modules/admin/InformacionGeneral/pages/GeneralInformation")));
const ControlLegajos     = withLazy(lazy(() => import("@modules/admin/ControlLegajos/pages/ControlLegajos")));

const RouteAdmin = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="/dgeneral" element={<GeneralInformation />} />
        <Route path="/legajo" element={<ControlLegajos />} />
      </Route>
      
      <Route path="/rol-por-usuario">
        <Route index element={<UserRole />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default RouteAdmin;
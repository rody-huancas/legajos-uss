import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

// Layouts
import AuthLayout from "@layouts/auth/AuthLayout";

// Pages
const Login = lazy(() => import("@modules/authentication/login/pages/Login"))

const RouteAuth = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<Login />} />
      </Route>
    </Routes>
  );
};

export default RouteAuth;
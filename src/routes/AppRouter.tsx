import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@shared/components/common/ScrollTop/ScrollTop";

import RouteAuth from "./auth/RouteAuth";
import RouteAdmin from "./admin/RouteAdmin";
import RoutePrivate from "./private/RoutePrivate";

const AppRouter = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Rutas de autenticación */}
        <Route path="login/*" element={<RouteAuth />} />

        {/* Rutas privadas */}
        <Route element={<RoutePrivate />}>
          <Route path="/*" element={<RouteAdmin />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;

import { Navigate, Outlet } from "react-router-dom";
/* Components */
import Header from "@shared/components/common/Header/Header";
import Sidebar from "@shared/components/common/Sidebar/Sidebar";
/* Store */
import { useAuthStore } from "@store/auth/auth.store";

const AdminLayout = () => {
  const profile = useAuthStore((state) => state.profile);

  if (profile === "") return <Navigate to="/rol-por-usuario" />;

  return (
    <div className="min-h-screen grid grid-cols-1 xl:grid-cols-6">
      <Sidebar />
      <div className="xl:col-span-5">
        <Header />
        <div className="h-[90vh] overflow-y-auto p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;

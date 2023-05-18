import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
/// ADMIN
import AdminLayout from "./container/layout/admin/AdminLayout";
import AdminLoginPage from "./container/pages/admin/AdminLoginPage";
import AdminUserPage from "./container/pages/admin/AdminUserPage";
/// LANDLORD
import LandlordLoginPage from "./container/pages/landlord/LandlordLoginPage";

/// CLIENT

//
import { PATHS } from "./utils/paths";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path={PATHS.adminBase} element={<AdminLayout />}>
          <Route path={PATHS.adminUsers} element={<AdminUserPage />}></Route>
        </Route>
        <Route path={PATHS.adminLogin} element={<AdminLoginPage />}></Route>
        <Route
          path={PATHS.landlordLogin}
          element={<LandlordLoginPage />}
        ></Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;

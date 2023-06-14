import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
/// ADMIN
import AdminLayout from "./container/layout/admin/AdminLayout";
import AdminLoginPage from "./container/pages/admin/AdminLoginPage";
import AdminUserPage from "./container/pages/admin/AdminUserPage";
import AdminAddUserPage from "./container/pages/admin/AdminAddUserPage";
import AdminHousePage from "./container/pages/admin/AdminHousePage";
import AdminAddHousePage from "./container/pages/admin/AdminAddHousePage";
import AdminSubsPage from "./container/pages/admin/AdminSubsPage";
import AdminAddSubsPage from "./container/pages/admin/AdminAddSubsPage";
/// LANDLORD
import LandlordLayout from "./container/layout/landlord/LandlordLayout";
import LandlordLoginPage from "./container/pages/landlord/LandlordLoginPage";
import LandlordHousePage from "./container/pages/landlord/LandlordHousePage";

/// CLIENT

//
import { PATHS } from "./utils/paths";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path={PATHS.adminLogin} element={<AdminLoginPage />}></Route>
        <Route path={PATHS.adminBase} element={<AdminLayout />}>
          <Route path={PATHS.adminUsers} element={<AdminUserPage />}></Route>
          <Route path={PATHS.adminAddUsers} element={<AdminAddUserPage />}></Route>
          <Route path={PATHS.adminHouses} element={<AdminHousePage />}></Route>
          <Route path={PATHS.adminAddHouses} element={<AdminAddHousePage />}></Route>
          <Route path={PATHS.adminSubscriptions} element={<AdminSubsPage />}></Route>
          <Route path={PATHS.adminAddSubscriptions} element={<AdminAddSubsPage />}></Route>
        </Route>
        <Route path={PATHS.landlordLogin} element={<LandlordLoginPage />}></Route>
        <Route path={PATHS.landlordBase} element={<LandlordLayout />}>
          <Route path={PATHS.landlordHouses} element={<LandlordHousePage />}></Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;

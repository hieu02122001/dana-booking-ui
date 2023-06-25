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
import LandlordRoomPage from "./container/pages/landlord/LandlordRoomPage";

/// CLIENT

//
import { PATHS } from "./utils/paths";
import LandlordAddHousePage from "./container/pages/landlord/LandlordAddHousePage";
import LandlordAddRoomPage from "./container/pages/landlord/LandlordAddRoomPage";
import TenantLayout from "./container/layout/tenant/TenantLayout";
import TenantHomePage from "./container/pages/tenant/TenantHomePage";
import TenantLoginPage from "./container/pages/tenant/TenantLoginPage";
import TenantRoomPage from "./container/pages/tenant/TenantRoomPage";
import LandlordSubsPage from "./container/pages/landlord/LandlordSubsPage";
import LandlordAddSubsPage from "./container/pages/landlord/LandlordAddSubsPage";
import { SearchProvider } from "./context/search-context";
import TenantHouseDetailPage from "./container/pages/tenant/TenantHouseDetailPage";
import TenantRoomDetailPage from "./container/pages/tenant/TenantRoomDetailPage";
import LandlordBookingPage from "./container/pages/landlord/LandlordBookingPage";

function App() {
  return (
    <AuthProvider>
      <SearchProvider>
        <Routes>
          <Route path={PATHS.adminLogin} element={<AdminLoginPage />}></Route>
          <Route path={PATHS.adminBase} element={<AdminLayout />}>
            <Route path={PATHS.adminUsers} element={<AdminUserPage />}></Route>
            <Route
              path={PATHS.adminAddUsers}
              element={<AdminAddUserPage />}
            ></Route>
            <Route
              path={PATHS.adminHouses}
              element={<AdminHousePage />}
            ></Route>
            <Route
              path={PATHS.adminAddHouses}
              element={<AdminAddHousePage />}
            ></Route>
            <Route
              path={PATHS.adminSubscriptions}
              element={<AdminSubsPage />}
            ></Route>
            <Route
              path={PATHS.adminAddSubscriptions}
              element={<AdminAddSubsPage />}
            ></Route>
          </Route>
          <Route
            path={PATHS.landlordLogin}
            element={<LandlordLoginPage />}
          ></Route>
          <Route path={PATHS.landlordBase} element={<LandlordLayout />}>
            <Route
              path={PATHS.landlordHouses}
              element={<LandlordHousePage />}
            ></Route>
            <Route
              path={PATHS.landlordAddHouses}
              element={<LandlordAddHousePage />}
            ></Route>
            <Route
              path={`${PATHS.landlordRooms}/houses/:houseId`}
              element={<LandlordRoomPage />}
            ></Route>
            <Route
              path={PATHS.landlordAddRooms}
              element={<LandlordAddRoomPage />}
            ></Route>
            <Route
              path={PATHS.landlordSubscriptions}
              element={<LandlordSubsPage />}
            ></Route>
            <Route
              path={PATHS.landlordAddSubscriptions}
              element={<LandlordAddSubsPage />}
            ></Route>
            <Route
              path={PATHS.landlordBookings}
              element={<LandlordBookingPage />}
            ></Route>
          </Route>
          <Route path={PATHS.tenantLogin} element={<TenantLoginPage />}></Route>
          <Route path={PATHS.tenantBase} element={<TenantLayout />}>
            <Route path={PATHS.tenantBase} element={<TenantHomePage />}></Route>
            <Route
              path={`${PATHS.tenantHouses}/:houseId`}
              element={<TenantHouseDetailPage />}
            ></Route>
            <Route
              path={`${PATHS.tenantRooms}`}
              element={<TenantRoomPage />}
            ></Route>
            <Route
              path={`${PATHS.tenantRooms}/:roomId`}
              element={<TenantRoomDetailPage />}
            ></Route>
          </Route>
        </Routes>
      </SearchProvider>
    </AuthProvider>
  );
}

export default App;

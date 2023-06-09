import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
/// ADMIN
import AdminLayout from "./container/layout/admin/AdminLayout";
import AdminLoginPage from "./container/pages/admin/AdminLoginPage";
import AdminUserPage from "./container/pages/admin/AdminUserPage";
import AdminAddUserPage from "./container/pages/admin/AdminAddUserPage";
import AdminHousePage from "./container/pages/admin/AdminHousePage";
import AdminAddHousePage from "./container/pages/admin/AdminAddHousePage";
import AdminUpdateHousePage from "./container/pages/admin/AdminUpdateHousePage";
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
import TenantBookingPage from "./container/pages/tenant/TenantBookingPage";
import BookingLayout from "./container/bookingLayout/BookingLayout";
import LandlordUpdateHousePage from "./container/pages/landlord/LandlordUpdateHousePage";
import LandlordUpdateRoomPage from "./container/pages/landlord/LandlordUpdateRoomPage";
import AdminUpdateUserPage from "./container/pages/admin/AdminUpdateUserPage";
import AdminProfilePage from "./container/pages/admin/AdminProfilePage";
import LandlordProfilePage from "./container/pages/landlord/LandlordProfilePage";
import TenantProfilePage from "./container/pages/tenant/TenantProfilePage";
import TenantRegisterPage from "./container/pages/tenant/TenantRegisterPage";
import LandlordRegisterPage from "./container/pages/landlord/LandlordRegisterPage";
import TenantContactPage from "./container/pages/tenant/TenantContactPage";
import LandlordContactPage from "./container/pages/landlord/LandlordContactPage";

function App() {
  return (
    <AuthProvider>
      <SearchProvider>
        <Routes>
          <Route path={PATHS.adminLogin} element={<AdminLoginPage />}></Route>
          <Route path={PATHS.adminBase} element={<AdminLayout />}>
            <Route path={PATHS.adminUsers} element={<AdminUserPage />}></Route>
            <Route
              path={PATHS.adminProfile}
              element={<AdminProfilePage />}
            ></Route>
            <Route
              path={PATHS.adminAddUsers}
              element={<AdminAddUserPage />}
            ></Route>
            <Route
              path={`${PATHS.adminUsers}/:userId`}
              element={<AdminUpdateUserPage />}
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
              path={`${PATHS.adminHouses}/:houseId`}
              element={<AdminUpdateHousePage />}
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
          <Route
            path={PATHS.landlordRegister}
            element={<LandlordRegisterPage />}
          ></Route>
          <Route path={PATHS.landlordBase} element={<LandlordLayout />}>
            <Route
              path={PATHS.landlordProfile}
              element={<LandlordProfilePage />}
            ></Route>
            <Route
              path={PATHS.landlordHouses}
              element={<LandlordHousePage />}
            ></Route>
            <Route
              path={PATHS.landlordAddHouses}
              element={<LandlordAddHousePage />}
            ></Route>
            <Route
              path={`${PATHS.landlordHouses}/:houseId`}
              element={<LandlordUpdateHousePage />}
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
              path={`${PATHS.landlordRooms}/:roomId`}
              element={<LandlordUpdateRoomPage />}
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
            <Route
              path={`${PATHS.landlordContact}`}
              element={<LandlordContactPage />}
            ></Route>
          </Route>
          <Route path={PATHS.tenantLogin} element={<TenantLoginPage />}></Route>
          <Route path={PATHS.tenantBase} element={<TenantLayout />}>
            <Route path={PATHS.tenantBase} element={<TenantHomePage />}></Route>
            <Route
              path={PATHS.tenantRegister}
              element={<TenantRegisterPage />}
            ></Route>
            <Route
              path={PATHS.tenantProfile}
              element={<TenantProfilePage />}
            ></Route>
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
            <Route path={PATHS.tenantBookings} element={<BookingLayout />}>
              <Route
                path={`${PATHS.tenantBookings}/:status`}
                element={<TenantBookingPage />}
              ></Route>
            </Route>
            <Route
              path={`${PATHS.tenantContact}`}
              element={<TenantContactPage />}
            ></Route>
          </Route>
        </Routes>
      </SearchProvider>
    </AuthProvider>
  );
}

export default App;

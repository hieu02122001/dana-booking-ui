import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import Layout from "./container/layout/Layout";
import HomePage from "./container/pages/HomePage";
// PAGES
/// ADMIN
import AdminLoginPage from "./container/pages/admin/AdminLoginPage";

/// LANDLORD
import LandlordLoginPage from "./container/pages/landlord/LandlordLoginPage";

/// CLIENT

//
import { PATHS } from "./utils/paths";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path={PATHS.base} element={<Layout />}>
          <Route path={PATHS.base} element={<HomePage />}></Route>
        </Route>
        <Route path={PATHS.adminLogin} element={<AdminLoginPage />}></Route>
        <Route path={PATHS.landlordLogin} element={<LandlordLoginPage />}></Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;

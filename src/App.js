import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import Layout from "./container/layout/Layout";
import HomePage from "./container/pages/HomePage";
import LoginPage from "./container/pages/LoginPage";
import { PATHS } from "./utils/paths";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path={PATHS.base} element={<Layout />}>
          <Route path={PATHS.base} element={<HomePage />}></Route>
        </Route>
        <Route path={PATHS.login} element={<LoginPage />}></Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;

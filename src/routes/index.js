import { Suspense, lazy, useEffect, useState } from "react";
import { Navigate, useRoutes } from "react-router-dom";

// layouts
// Infromation Page
// import Home from "../pages/homepage/Home";

// Authentication
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ResetPassword from "../pages/auth/ResetPassword";
import NewPassword from "../pages/auth/NewPassword";
import VerifyEmail from "../pages/auth/verify";
// Main App
import GeneralApp from "../pages/dashboard/GeneralApp";
import Settings from "../pages/dashboard/Settings";
import Page404 from "../pages/Page404";
import LoadingScreen from "../components/LoadingScreen";
import Profile from "../pages/dashboard/Profile";
import Group from "../pages/dashboard/Group";
import GeneraladminApp from "../admin/adminDashboard";

// config
import { DEFAULT_PATH } from "../config";
import { useSelector } from "react-redux";

// const Loadable = (Component) => (props) => {
//   return (
//     <Suspense fallback={<LoadingScreen />}>
//       <Component {...props} />
//     </Suspense>
//   );
// };

const Loadable = (Component) => (props) => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const delay = 5000; // 2 minutes in milliseconds
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  const { admin } = useSelector((state) => state.app.user);
  const isAdmin = admin;

  return (
    <Suspense fallback={<LoadingScreen />}>
      {useRoutes([
        { path: "404", element: <Page404 /> },
        {
          path: "/auth",
          element: <MainLayout />,
          children: [
            {
              path: "login",
              element: <Login />,
            },
            { path: "register", element: <Register /> },
            { path: "reset-password", element: <ResetPassword /> },
            { path: "new-password", element: <NewPassword /> },
            { path: "verify", element: <VerifyEmail /> },
          ],
        },

        {
          path: "/",
          element: <DashboardLayout />,
          children: [
            { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
            { path: "app", element: <GeneralApp /> },
            { path: "group", element: <Group /> },
            { path: "settings", element: <Settings /> },
            { path: "profile", element: <Profile /> },
            { path: "*", element: <Navigate to="/404" replace /> },
          ],
        },
        // { path: "home", element: <Home /> },
        {
          path: "admin",
          element: isAdmin ? <GeneraladminApp /> : <Navigate to="/" replace />,
        },

        { path: "*", element: <Navigate to="/404" replace /> },
      ])}
    </Suspense>
  );
}

const DashboardLayout = Loadable(lazy(() => import("../layouts/dashboard")));
const MainLayout = Loadable(lazy(() => import("../layouts/main")));

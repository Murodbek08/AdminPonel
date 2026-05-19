import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { Suspense, lazy } from "react";
import { PageLoader } from "../components";
import { AuthGuard, RoleGuard } from "../guards";
import { AppLayout } from "@/widgets/layout";

const LoginPage = lazy(() => import("@/pages/login"));
const ForbiddenPage = lazy(() => import("@/pages/forbidden"));
const DashboardPage = lazy(() => import("@/pages/dashboard"));
const UsersPage = lazy(() => import("@/pages/users"));
const PaymentsPage = lazy(() => import("@/pages/payments"));
const ReportsPage = lazy(() => import("@/pages/reports"));
const NotFoundPage = lazy(() => import("@/pages/not-found"));

const fallback = <PageLoader />;

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/dashboard" replace /> },
  {
    path: "/login",
    element: (
      <Suspense fallback={fallback}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: "/403",
    element: (
      <Suspense fallback={fallback}>
        <ForbiddenPage />
      </Suspense>
    ),
  },
  {
    element: <AuthGuard />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: "/dashboard",
            element: (
              <Suspense fallback={fallback}>
                <DashboardPage />
              </Suspense>
            ),
          },
          {
            element: <RoleGuard allowedRoles={["ADMIN"]} />,
            children: [
              {
                path: "/users",
                element: (
                  <Suspense fallback={fallback}>
                    <UsersPage />
                  </Suspense>
                ),
              },
            ],
          },
          {
            element: <RoleGuard allowedRoles={["PAYMENT"]} />,
            children: [
              {
                path: "/payments",
                element: (
                  <Suspense fallback={fallback}>
                    <PaymentsPage />
                  </Suspense>
                ),
              },
            ],
          },
          {
            element: <RoleGuard allowedRoles={["REPORTS"]} />,
            children: [
              {
                path: "/reports",
                element: (
                  <Suspense fallback={fallback}>
                    <ReportsPage />
                  </Suspense>
                ),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}

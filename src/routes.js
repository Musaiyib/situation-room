import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import DataPage from './pages/DataPage';
import DashboardAppPage from './pages/DashboardAppPage';
import ZonalsPage from './pages/ZonalsPage';
import ConsituencyPage from './pages/ConsituencyPage';
import AgentsPage from './pages/AgentsPage';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'zonals', element: <ZonalsPage /> },
        // { path: 'transactions', element: <TransactionPage /> },
        { path: 'consituency', element: <ConsituencyPage /> },
        { path: 'agents', element: <AgentsPage /> },
        { path: 'data', element: <DataPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}

import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet } from '@tanstack/react-router';
import AppLayout from './components/AppLayout';
import WatchLiveYouTubePage from './pages/WatchLiveYouTubePage';
import WatchLiveFacebookPage from './pages/WatchLiveFacebookPage';
import AudioInputPage from './pages/AudioInputPage';
import MemberAreaPage from './pages/MemberAreaPage';
import CloverPlaceholderPage from './pages/CloverPlaceholderPage';

const rootRoute = createRootRoute({
  component: () => (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: WatchLiveYouTubePage,
});

const youtubeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/youtube',
  component: WatchLiveYouTubePage,
});

const facebookRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/facebook',
  component: WatchLiveFacebookPage,
});

const audioRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/audio',
  component: AudioInputPage,
});

const memberRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/member',
  component: MemberAreaPage,
});

const cloverRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/clover',
  component: CloverPlaceholderPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  youtubeRoute,
  facebookRoute,
  audioRoute,
  memberRoute,
  cloverRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}

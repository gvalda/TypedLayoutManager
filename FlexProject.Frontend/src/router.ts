import { DockViewPage } from '@/pages/DockViewPage';
import { Route, Router, RouterContext } from '@tanstack/react-router';
import { DEFAULT_SITE_TITLE } from '@/constants';
import { RootPage } from '@/pages/RootPage';

const routerContext = new RouterContext<{
  title: string;
}>();

const rootRoute = routerContext.createRootRoute({ component: RootPage });

export const dockViewRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: DockViewPage,
  beforeLoad: () => ({ title: 'Dock View' }),
});

export const newChatRoute = new Route({
  getParentRoute: () => dockViewRoute,
  path: '/new-chat',
  beforeLoad: () => ({ title: 'New Chat' }),
});

const routeTree = rootRoute.addChildren([dockViewRoute.addChildren([newChatRoute])]);

export const router = new Router({ routeTree, context: { title: DEFAULT_SITE_TITLE } });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

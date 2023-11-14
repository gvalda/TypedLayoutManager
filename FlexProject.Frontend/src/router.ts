import { DEFAULT_SITE_TITLE } from '@/constants';
import { WorkspacePage } from '@/pages/WorkspacePage';
import { LayoutPage } from '@/pages/LayoutPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { RootPage } from '@/pages/RootPage';
import { workspaceSchema } from '@/workspaceConfiguration';
import { Route, Router, RouterContext } from '@tanstack/react-router';
import { defaultTo, first, keys, pipe } from 'lodash/fp';

const routerContext = new RouterContext<{
  title: string;
}>();

const rootRoute = routerContext.createRootRoute({ component: RootPage });

const layoutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LayoutPage,
});

export const workspaceRoute = new Route({
  getParentRoute: () => layoutRoute,
  path: 'workspace',
  component: WorkspacePage,
  validateSearch: workspaceSchema,
  loaderContext: ({ search }) => ({ title: pipe(keys, first, defaultTo('Workspace'))(search) }),
});

const allMatches = new Route({
  getParentRoute: () => layoutRoute,
  path: '*',
  component: NotFoundPage,
});

const routeTree = rootRoute.addChildren([layoutRoute.addChildren([workspaceRoute, allMatches])]);

export const router = new Router({ routeTree, context: { title: DEFAULT_SITE_TITLE } });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

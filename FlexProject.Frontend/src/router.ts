import { DEFAULT_SITE_TITLE } from '@/constants';
import { WorkspacePage } from '@/pages/WorkspacePage';
import { LayoutPage } from '@/pages/LayoutPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { RootPage } from '@/pages/RootPage';
import { Route, Router, redirect, rootRouteWithContext } from '@tanstack/react-router';
import z from 'zod';
import { registeredPanels } from '@/workspaceConfiguration';
import { isOfTypeWorkspacePanel, isOfTypeWorkspacePanelWithProps } from '@/utils/workspaceUtils';
import { typedObjectEntries } from '@/utils/commonUtils';

const rootRoute = rootRouteWithContext<{ title: string }>()({ component: RootPage });

const layoutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LayoutPage,
});

export const workspaceRoute = new Route({
  getParentRoute: () => layoutRoute,
  path: 'workspace/$routeParamName',
  component: WorkspacePage,
  validateSearch: search => z.record(z.string().optional()).parse(search),
  beforeLoad: ({ search, params: { routeParamName } }) => {
    const panelName = typedObjectEntries(registeredPanels).find(
      ([, panel]) => panel.routeParamName === routeParamName,
    )?.[0];
    if (!panelName || !isOfTypeWorkspacePanel(panelName)) {
      throw redirect({ to: notFoundRoute.to });
    }
    if (isOfTypeWorkspacePanelWithProps(panelName)) {
      const panel = registeredPanels[panelName];
      const parserResult = panel.propSchemaParser.safeParse(search);
      if (!parserResult.success) throw redirect({ to: notFoundRoute.to });

      return {
        title: panel.getTitle(parserResult.data),
        panelName,
        panelProps: parserResult.data,
      };
    }

    return { title: 'Workspace', panelName };
  },
});

const notFoundRoute = new Route({
  getParentRoute: () => layoutRoute,
  path: '*',
  component: NotFoundPage,
});

const routeTree = rootRoute.addChildren([layoutRoute.addChildren([workspaceRoute, notFoundRoute])]);

export const router = new Router({ routeTree, context: { title: DEFAULT_SITE_TITLE } });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

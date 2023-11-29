// Make sure dockview css gets imported first
import 'dockview/dist/styles/dockview.css';
import styles from '@styles/pages/Workspace.module.scss';

import { WorkspaceProps, useWorkspace } from '@/hooks/useWorkspace';
import cx from 'clsx';
import { DockviewReact } from 'dockview';
import React from 'react';
import { useNavigate, useRouteContext } from '@tanstack/react-router';
import { workspaceRoute } from '@/router';
import { toAction } from '@/utils/commonUtils';
import { LoadingComponent } from '@/components/LoadingComponent';
import { useDidUpdate } from '@mantine/hooks';
import { mapValues } from 'lodash';
import { registeredPanels } from '@/workspaceConfiguration';
import { getRouteParam } from '@/utils/workspaceUtils';

export function WorkspacePage() {
  const params = useRouteContext({ from: workspaceRoute.id });
  const navigate = useNavigate({ from: workspaceRoute.id });

  const onReady = () => displayPanel(params);
  useDidUpdate(() => displayPanel(params), [params.panelName, params.panelProps]);

  const onDidActivePanelChange: WorkspaceProps['onDidActivePanelChange'] = (panelName, panel) =>
    toAction(navigate({ params: { routeParamName: getRouteParam(panelName) }, search: panel.params }));

  const { setApi, displayPanel } = useWorkspace({ onReady, onDidActivePanelChange });

  return (
    <DockviewReact
      className={cx('dockview-theme-vs', styles.wrapper)}
      components={mapValues(registeredPanels, 'component')}
      onReady={event => setApi(event.api)}
      watermarkComponent={LoadingComponent}
      disableFloatingGroups
    />
  );
}

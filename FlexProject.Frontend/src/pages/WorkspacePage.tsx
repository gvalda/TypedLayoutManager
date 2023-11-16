// Make sure dockview css gets imported first
import 'dockview/dist/styles/dockview.css';
import styles from '@styles/pages/Workspace.module.scss';

import { useWorkspace } from '@/hooks/useWorkspace';
import cx from 'clsx';
import { DockviewReact } from 'dockview';
import React from 'react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { workspaceRoute } from '@/router';
import { toAction } from '@/utils';
import { LoadingComponent } from '@/components/LoadingComponent';
import { useDidUpdate } from '@mantine/hooks';
import { chain } from 'lodash';
import { registeredPanels } from '@/workspaceConfiguration';

export function WorkspacePage() {
  const searchProps = useSearch({ from: workspaceRoute.id });
  const navigate = useNavigate({ from: workspaceRoute.id });

  useDidUpdate(() => {
    console.log('searchProps.privateChat', searchProps.privateChat);
  }, [searchProps.privateChat]);

  const onReady = () => displayPanel(searchProps.privateChat + '');
  const onDidActivePanelChange = (id: string) => {
    console.log('onDidActivePanelChange', id);
    return toAction(navigate({ search: { privateChat: id } }));
  };

  const { setApi, displayPanel } = useWorkspace({ onReady, onDidActivePanelChange });

  return (
    <DockviewReact
      className={cx('dockview-theme-vs', styles.wrapper)}
      components={chain(registeredPanels)
        .keyBy(p => p.component.name)
        .mapValues('component')
        .value()}
      onReady={event => setApi(event.api)}
      watermarkComponent={LoadingComponent}
      disableFloatingGroups
    />
  );
}

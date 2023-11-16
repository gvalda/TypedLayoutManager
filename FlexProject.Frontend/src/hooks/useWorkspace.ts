import { WorkspacePanel } from '@/types/workspaceTypes';
import { DockviewApi } from 'dockview';
import React from 'react';

interface WorkspaceProps {
  onReady: () => void;
  onDidActivePanelChange: (id: string) => void;
}

interface WorkspaceApi {
  setApi: React.Dispatch<React.SetStateAction<DockviewApi | undefined>>;
  displayPanel: (workspacePanel: WorkspacePanel) => void;
}

export const useWorkspace = (props: WorkspaceProps): WorkspaceApi => {
  const { onReady, onDidActivePanelChange } = props;

  const [api, setApi] = React.useState<DockviewApi>();

  // useSub<WorkspaceEventMappings>(
  //   'privateChat',
  //   props => {
  //     api?.panels.find(panel => panel.api.setActive());
  //     return api?.addPanel({
  //       id: `privateChat-${props.userName}`,
  //       component: 'privateChat',
  //       title: `Private chat with ${props.userName}`,
  //       params: props,
  //     });
  //   },
  //   [api],
  // );

  React.useEffect(() => void (api && onReady()), [api]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(
    () => void api?.onDidActivePanelChange(panel => panel && onDidActivePanelChange(panel.id)),
    [api], // eslint-disable-line react-hooks/exhaustive-deps
  );

  const displayPanel: WorkspaceApi['displayPanel'] = workspacePanel => {
    if (!api) return;

    const [id, title] =
      'queryParamName' in workspacePanel
        ? [workspacePanel.id, workspacePanel.title]
        : [workspacePanel.id(workspacePanel.queryParams.value), workspacePanel.title(workspacePanel.queryParams.value)];

    const activePanel = api.panels.find(panel => panel.id === id);
    if (activePanel) return activePanel.api.setActive();

    api.addPanel({
      id,
      component: workspacePanel.component.name,
      params:
        'queryParamName' in workspacePanel
          ? undefined
          : { [workspacePanel.queryParams.name]: workspacePanel.queryParams.value },
      title,
    });

    // if id is string, use it

    // to display a panel, we need to:
    // 1. check if it exists
    // 2. if exists, set active
    // 3. else, add
    // 4. set active

    // Values I need:
    // 1. component name
    // 2. props
    // 3. id
    // 4. title

    // if exists, set active

    if (api?.panels.find(panel => panel.id === id)) {
      return api?.panels.find(panel => panel.id === id)?.api.setActive();
    }

    // else, add

    api?.addPanel({
      id,
      component,
      params: props,
      title: props.title,
    });

    return api?.panels.find(panel => panel.id === id)?.api.setActive();
  };

  return { setApi, displayPanel };
};
